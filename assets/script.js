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
    }



    

});
