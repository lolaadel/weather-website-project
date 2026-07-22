// today variables
var todayName = document.getElementById("today-date-day-name");
var todayNumber = document.getElementById("today-date-day-num");
var todayMonth = document.getElementById("today-date-month");
var todayLocation = document.getElementById("today-location");
var todayTemp = document.getElementById("today-temp");
var todayConditionImg = document.getElementById("today-condition-img");
var todayConditionText = document.getElementById("today-condition-text");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var windDirection = document.getElementById("wind-direction");

var weatherData;

// next Data
var nextDay = document.getElementsByClassName("next-day-name");
var nextMaxTemp = document.getElementsByClassName("next-max-temp");
var nextMinTemp = document.getElementsByClassName("next-min-temp");
var nextConditionImg = document.getElementsByClassName("next-condition-img");
var nextConditionText = document.getElementsByClassName("next-condition-text");
// search input
var searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
    startApp(this.value)
})



// weather
async function getWeather(city) {
    var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=93ce9a9b651646d4a3e72551260202&q=${city}&days=7` , {
        method:"post"
    })
    var weatherData = await weatherResponse.json()
    console.log(weatherData);
    console.log(weatherResponse);
    return weatherData;

}
async function startApp(city = "Cairo") {

    var weatherData = await getWeather(city);

    console.log(weatherData);
    if (!weatherData.error) {
        disPlayTodayDate(weatherData)
        disPlayNextDate(weatherData)
    }else{
        window.alert("message:No matching location found.")
        console.log("message:No matching location found.");   
    }


}

startApp()
function disPlayTodayDate(date) {
    var todayDate = new Date();
    console.log(todayDate);

    todayLocation.innerHTML = date.location.name;
    todayTemp.innerHTML = date.current.temp_c;
    todayConditionImg.setAttribute("src", "http:" + date.current.condition.icon)
    humidity.innerHTML = date.current.humidity + "%"
    wind.innerHTML = date.current.wind_kph + "kp/h"
    windDirection.innerHTML = date.current.wind_degree
    todayConditionText.innerHTML = date.current.condition.text
    todayNumber.innerHTML = todayDate.getDate()
    todayName.innerHTML = todayDate.toLocaleDateString("en-us", {
        weekday: "long"
    })
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", {
        month: "long"
    })

}
function disPlayNextDate(date) {
    var forecast = date.forecast.forecastday;

    console.log(forecast);
    for (var i = 0; i < 2; i++) {
        var nextDate = new Date(forecast[i + 1].date);
        nextMaxTemp[i].innerHTML = forecast[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecast[i + 1].day.mintemp_c
        nextConditionImg[i].setAttribute("src", "http:" + forecast[i + 1].day.condition.icon)
        nextConditionText[i].innerHTML = forecast[i + 1].day.condition.text
        // var nextDayName = nextDate.getDate() + i
        // console.log(nextDayName);

        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", {
            weekday: "long"
        })


    }

}


