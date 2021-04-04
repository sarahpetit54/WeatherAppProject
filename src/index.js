function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#degree").innerHTML = Math.round(celsiusTemperature);
  let description = document.querySelector("#weather-condition");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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

/*function searchLocation(position) {
  let apiKey = "2bc05ebef1d18dc15fe697066bb20bd0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#user-location");
currentLocationButton.addEventListener("click", getCurrentLocation);*/

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