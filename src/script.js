// Displaying the current date and time
function formatDate(date) {
  let weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let week = weeks[now.getDay()];
  let hour = now.getHours();
  // Add 0 in front of an integer
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  // Add 0 in front of an integer
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${week} ${hour}:${minutes}`;
}

function forcastWeather(response) {
  document.querySelector("#search-query").innerHTML = response.data.name;
  document.querySelector("#celsius-link").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "1596a4fb887b619cbb2b5ab4524f4fc0";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forcastWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
function searchlocation(position) {
  let apiKey = "1596a4fb887b619cbb2b5ab4524f4fc0";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forcastWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchlocation);
}
// Injecting the current date and time inside the HTML

let todaysDate = document.querySelector(".date");
let now = new Date();
todaysDate.innerHTML = formatDate(now);

// Display the city name on the page after the user submits the form

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

// show current location of a user when he clicks in the "current" button
let currentLocationButton = document.querySelector("#current-location-search");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
