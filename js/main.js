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

var searchTimer;

// next Data
var nextDay = document.getElementsByClassName("next-day-name");
var nextMaxTemp = document.getElementsByClassName("next-max-temp");
var nextMinTemp = document.getElementsByClassName("next-min-temp");
var nextConditionImg = document.getElementsByClassName("next-condition-img");
var nextConditionText = document.getElementsByClassName("next-condition-text");
// search input
var searchInput = document.getElementById("search");
var loading = document.getElementById("loading");
var errorMessage = document.getElementById("error-message");
var searchButton = document.getElementById("submit");

searchInput.addEventListener("input", function () {
    clearTimeout(searchTimer);
    var city = this.value.trim();
    searchTimer = setTimeout(() => {
        if (!city) {
            return;
        }
        startApp(city);
    }, 500);
});
searchButton.addEventListener("click", function () {
    var city = searchInput.value.trim();

    if (city) {
        clearTimeout(searchTimer);
        startApp(city);
    }
});
// weather
async function getWeather(city) {
    try {
        var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=93ce9a9b651646d4a3e72551260202&q=${encodeURIComponent(city)}&days=3`);
        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data");
        }
        var weatherData = await weatherResponse.json();
        return weatherData;
    } catch (error) {
        console.error("Weather API Error:", error);
        return null;
    }
}

async function startApp(city = "Cairo") {
    errorMessage.classList.add("d-none");
    loading.classList.remove("d-none");
    try {
        var weatherData = await getWeather(city);

        if (weatherData && !weatherData.error) {
            disPlayTodayDate(weatherData);
            disPlayNextDate(weatherData);
        } else {
            errorMessage.classList.remove("d-none");
        }
    } finally {
        loading.classList.add("d-none");
    }
}

startApp()
function disPlayTodayDate(date) {
    var todayDate = new Date();

    todayLocation.textContent = date.location.name;
    todayTemp.textContent = date.current.temp_c;
    todayConditionImg.setAttribute("src", "https:" + date.current.condition.icon)
    humidity.textContent = date.current.humidity + "%"
    wind.textContent = date.current.wind_kph + " km/h"
    windDirection.textContent = date.current.wind_degree
    todayConditionText.textContent = date.current.condition.text
    todayNumber.textContent = todayDate.getDate()
    todayName.textContent = todayDate.toLocaleDateString("en-us", {
        weekday: "long"
    })
    todayMonth.textContent = todayDate.toLocaleDateString("en-us", {
        month: "long"
    })
}
function disPlayNextDate(date) {
    var forecast = date.forecast.forecastday;

    for (var i = 0; i < 2; i++) {
        var nextDate = new Date(forecast[i + 1].date);

        nextMaxTemp[i].textContent = forecast[i + 1].day.maxtemp_c;
        nextMinTemp[i].textContent = forecast[i + 1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src", "https:" + forecast[i + 1].day.condition.icon);
        nextConditionText[i].textContent = forecast[i + 1].day.condition.text;
        nextDay[i].textContent = nextDate.toLocaleDateString("en-us", { weekday: "long" });
    }
}