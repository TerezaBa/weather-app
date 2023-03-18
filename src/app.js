function formateDate(timeStamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[timeStamp.getDay()];

  let hour = timeStamp.getHours();
  let hours = hour.toString().padStart(2, "0");

  let minute = timeStamp.getMinutes();
  let minutes = minute.toString().padStart(2, "0");

  return `${day} ${hours}:${minutes}`;
}

function showTemp(response) {
  document.querySelector("#current-date").innerHTML = formateDate(new Date());

  document.querySelector("#city").innerHTML = response.data.name;

  celsTemp = response.data.main.temp;

  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#hum").innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", `${response.data.weather[0].main}`);

  fahrLink.classList.remove("active");
  celsLink.classList.add("active");
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

function displayFahrTemp(event) {
  event.preventDefault();

  document.querySelector("#temp-value").innerHTML = Math.round(
    (celsTemp * 9) / 5 + 32
  );
  fahrLink.classList.add("active");
  celsLink.classList.remove("active");
}

function displayCelsTemp(event) {
  event.preventDefault();

  document.querySelector("#temp-value").innerHTML = Math.round(celsTemp);
  fahrLink.classList.remove("active");
  celsLink.classList.add("active");
}

let celsTemp = null;

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahrTemp);

let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", displayCelsTemp);

searchCity("Prague");
