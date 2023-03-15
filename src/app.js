function formateDate(timeStamp) {
  let date = new Date(timeStamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hour = date.getHours();
  let hours = hour.toString().padStart(2, "0");

  let minute = date.getMinutes();
  let minutes = minute.toString().padStart(2, "0");

  return `${day} ${hours}:${minutes}`;
}

function showTemp(response) {
  document.querySelector("#current-date").innerHTML = formateDate(
    response.data.dt * 1000
  );

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#hum").innerHTML = `${response.data.main.humidity}`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )}`;
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
