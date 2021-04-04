let now = new Date();
function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  let dates = now.getDate();
  let formattedDate = `${month}, ${dates}`;
  return formattedDate;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatTime(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

let timeElement = document.querySelector("#time");
let currentTime2 = new Date();
timeElement.innerHTML = formatTime(currentTime2);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  let description = document.querySelector("#weather-condition");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  }

function searchCity(city) {
  let apiKey = "2bc05ebef1d18dc15fe697066bb20bd0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "2bc05ebef1d18dc15fe697066bb20bd0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#user-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Paris");

function convertTemp(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  let temperature = degree.innerHTML;
  degree.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function revertTemp(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  let temperature = degree.innerHTML;
  degree.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let conversion = document.querySelector("#fahrenheit");
conversion.addEventListener("click", convertTemp);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", revertTemp);
