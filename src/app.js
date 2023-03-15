function formateDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  let hour = today.getHours();
  let hours = hour.toString().padStart(2, "0");

  let minute = today.getMinutes();
  let minutes = minute.toString().padStart(2, "0");

  let now = `${day} ${hours}:${minutes}`;

  return now;
}

let date = formateDate(new Date());

document.querySelector("#current-date").innerHTML = date;

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector(
    "#hum"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
}
function searchCity(cityName) {
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}
&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-area").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function handleNavigator(position) {
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function handleCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleNavigator);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", handleCurrent);
