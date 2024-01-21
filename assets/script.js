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
                    var weatherData = $('<div col-12>').append($(`<h2>
                    ${weather.name} (${currentDate})
                    $('<img class="icon">').attr('src', http://openweathermap.org/img/w/${weather.weather[0].icon}.png)
                    </h2>`))
                    // .append($('<img class="icon">').attr('src', 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png'));
                    // var icon = $('<img class="icon">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');  


                    $(".currentCity").append(weatherData);
                })
            }

        })
    }

});
