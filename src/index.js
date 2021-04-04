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
  document.querySelector("#degree").innerHTML = Math.round(celsiusTemperature);

  let description = document.querySelector("#weather-condition");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
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

let currentLocationButton = document.querySelector("#user-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertTemp(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  conversion.classList.add("active");
  let degree = document.querySelector("#degree");
  let temperature = degree.innerHTML;
  degree.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function revertTemp(event) {
  event.preventDefault();
  celsius.classList.add("active");
  conversion.classList.remove("active");
  let degree = document.querySelector("#degree");
  degree.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let conversion = document.querySelector("#fahrenheit");
conversion.addEventListener("click", convertTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", revertTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Paris");