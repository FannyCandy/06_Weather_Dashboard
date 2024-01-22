$(document).ready(function () {

    var APIKey = '83c01c42f7d290ab30e82ec134075cdc';
    var city = '';
    var savedData = localStorage.getItem('recent-searched');
    // console.log('local stored', savedData);

    $('.searchBtn').on('click', function (event) {
        event.preventDefault();

        city = $('#inputCity').val();
        if (city === '') {
            return alert('please enter a city');
        } else {
            console.log('search input', city);
        }

        fetchWeather(city);
        saveToLocal(city);
        addRecentSearched(city);
    });

    function saveToLocal(city) {
        if (!savedData) {
            savedData = city;
            localStorage.setItem('recent-searched', savedData);
        } else if (savedData.indexOf(city) === -1) {
            savedData = savedData + ',' + city;
            localStorage.setItem('recent-searched', savedData);
        } else {
            console.log('local stored', savedData)
        }
    }

    function addRecentSearched() {
        var savedList = [];
        if (savedData) {
            savedList = savedData.trim().split(',');
            console.log('saved city', savedList);

            $(".recentSearch").empty();
            for (i = 0; i < savedList.length; i++) {
                var cityBtn = $('<button type="submit" class="btn btn-secondary cityBtn">')
                    .text(savedList[i]);
                $(".recentSearch").append(cityBtn);
                $('.cityBtn').on('click', function () {
                    var SavedCity = $(this).text();
                    fetchWeather(SavedCity);
                })
            }
        } else {
            console.log('no saved data')
        }
    }

    function displayRecentSearched() {
        var savedList = [];
        if (!savedData) {
            $(".currentCity").append($('<h3>').text('Welcome to weather dashboard!'))
        } else {
            savedList = savedData.trim().split(',');
            var displayCity = savedList[savedList.length - 1]
            fetchWeather(displayCity);
        }
    }

    function fetchWeather(city) {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
        fetch(queryURL).then(function (response) {
            // console.log('response', response)
            if (response.ok) {
                response.json().then(function (weather) {
                    console.log('weather', city, weather)

                    $(".currentCity").empty()
                    var currentDate = dayjs().format('dddd, MMMM D, YYYY')
                    console.log('date', currentDate)
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
            // console.log('response', response)
            if (response.ok) {
                response.json().then(function (forecast) {
                    console.log('forcecast', city, forecast)

                    $(".5-dayForecast").empty()
                    $(".5-dayForecast").prepend($('<h3>').text('5-Day Forecast:'));
                    var list = forecast.list;

                    for (i = 0; i < list.length; i++) {
                        var time = list[i].dt_txt.split(' ')[1];
                        var date = list[i].dt_txt.split(' ')[0];
                        // console.log('date', date, 'time', time);

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

    addRecentSearched();
    displayRecentSearched();
});
