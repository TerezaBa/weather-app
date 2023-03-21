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

function formateDay(timeStamp) {
  let date = new Date(timeStamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">${formateDay(forecastDay.time * 1000)}</h5>
                <img
                src=${forecastDay.condition.icon_url}
                alt=${forecastDay.condition.icon}
                width="42"
                />
                <span class="forecast-temp-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}°</span>
                    </div>
                    </div>
                    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  let forecastCard = document.querySelector("#forecast");
  forecastCard.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  document.querySelector("#current-date").innerHTML = formateDate(new Date());

  document.querySelector("#city").innerHTML = response.data.city;

  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  document.querySelector(
    "#hum"
  ).innerHTML = `${response.data.temperature.humidity}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;

  document
    .querySelector("#weather-icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);

  document
    .querySelector("#weather-icon")
    .setAttribute("alt", `${response.data.condition.icon}`);

  getForecast(response.data.coordinates);
}

function searchCity(cityName) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-area").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let apiKey = "b36tedd42903o5c6c68a4a10b4b1953f";
let unit = "metric";

searchCity("Prague");
