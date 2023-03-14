//date
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

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = date;

//searchEngine
function getTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("h4").innerHTML = response.data.weather[0].main;

  document.querySelector(
    "#hum"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
}

function searchArea(event) {
  event.preventDefault();

  let city = document.querySelector("#search-area");
  document.querySelector("h1").innerHTML = city.value;

  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchArea);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemp);
}

function showCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("button");
currentButton.addEventListener("click", showCurrentTemp);
