$(document).ready(function () {

    var APIKey = '83c01c42f7d290ab30e82ec134075cdc';
    var city = '';

    $('.searchBtn').on('click', function (event) {
        event.preventDefault();

        city = $('#inputCity').val();
        if (city === '') {
            return alert('please enter a city');
        }

        console.log(city);
        fetchWeather(city);
        // saveToLocal(city);
    });

    function fetchWeather(city) {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
        fetch(queryURL).then(function (response) {
            console.log('response', response)
            if (response.ok) {
                response.json().then(function (weather) {
                    console.log(weather)

                    $(".currentCity").empty()
                    var currentDate = dayjs().format('dddd, MMMM D, YYYY')
                    console.log(currentDate)
                    var weatherData = $('<div col-12>').append(
                        $('<h3>').text(`${weather.name} (${currentDate})`),
                        $('<img class="icon">').attr('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`),
                        $('<h5>').text(`Temp: ${weather.main.temp} °F`),
                        $('<h5>').text(`Wind: ${weather.wind.speed} MPH`),
                        $('<h5>').text(`Humidity: ${weather.main.humidity} %`));

                    $(".currentCity").append(weatherData);
                });
            } else {
                alert('please enter a valid city name')
            }
        });
        fiveDayForecast(city);
    }

    function fiveDayForecast(city) {
        var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
        fetch(queryURL).then(function (response) {
            console.log('response', response)
            if (response.ok) {
                response.json().then(function (forecast) {
                    console.log(forecast)

                    $(".5-dayForecast").empty()
                    var list = forecast.list;
                    for (i = 0; i < list.length; i++) {
                        var time = list[i].dt_txt.split(' ')[1];
                        var date = list[i].dt_txt.split(' ')[0];
                        console.log('date', date, 'time', time)
                        if (time === '12:00:00') {
                            var weatherData = $('<div class="card">').append(
                                // $('<div class="card-body">'),
                                $('<h5 class="card-title">').text(`${date}`),
                                $('<img class="icon">').attr('src', `http://openweathermap.org/img/w/${list[i].weather[0].icon}.png`),
                                $('<p class="card-text">').text(`Temp: ${list[i].main.temp} °F`),
                                $('<p class="card-text">').text(`Wind: ${list[i].wind.speed} MPH`),
                                $('<p class="card-text">').text(`Humidity: ${list[i].main.humidity} %`));

                            $(".5-dayForecast").append(weatherData);
                        }
                    }
                });
            } else {
                alert('please enter a valid city name')
            }
        });
    }



});
