// date+time
function showDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let months = [
    "Jan.",
    "Feb.",
    "March",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentTime = `${currentHour}:${currentMinutes}`;
  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentTime}`;
}

let weatherDate = document.querySelector("#date");
let now = new Date();
weatherDate.innerHTML = showDate(now);

// C° to F°
function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = -4;
}
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

function convertFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 25;
}

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", convertFahrenheit);

// main location

function showWeather(response) {
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "80c84163db9433d86bea5c88b0e43920";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=`;

  axios.get(apiUrl).then(showWeather);
}

//search city
function showWeatherConditions(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temperature}`;
  let form = document.querySelector("#search-engine");
  form.addEventListener("submit", handleSubmit);

  document.querySelector("#conditions").innerHTML = response.data.main.temp;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", showCity);

searchCity("Montréal");

//Current location
function searchLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "80c84163db9433d86bea5c88b0e43920";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geolocationButton = document.querySelector("#geolocation");
geolocationButton.addEventListener("click", getCurrentLocation);
