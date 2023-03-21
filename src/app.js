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

function displayForecast(response) {
  let forecastCard = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecastDays.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${forecastDay}</h5>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAepJREFUaN7tmd2thCAQhSnBEijBEmjgJpZgCZZgCZZgCXZwLcFX3yiBDlhIhhvC5dcdFzeB5LzsTtjz4cwwZomUknyzSANoAA2gATQANICSdZ4nA/Wk0ioGUGY7pVVJKElLXGl6NIAySMGojGh9MsCRMG80Pw5AmRozzRvppzVoGNCk068mwFYI4JPArpMSgB0BwGj5doAVutnsdDNdYwwVAH5o8rTNqzoyGsKIAqAvKETjRkNGQxC5BR8EuMm8vJCO0cKPAXBs83DyXcF9YmvKBoDHfIf5/o2DESUAM7L5HU6eez4fraFwzEwvYQo9BLDfcPrM2dek02jd1vZnOfuyEMCKaH52OwqMGaF04vBdDsQaApgQT546Jy9g/1gtcHgSqUxYQgD0xrwvgR9gn5D6WBtdEC6s6e55KQbQWd3hijqECVakxoq33okzXj03pFpiNQCOT4zfSYCf35MprUpHaBMrhltzlKwOoAx1SkJJgnqPeR3DrRhmXYZY6q8CLJaxP3NOzOzEjOSDKwigT9sxtnvM01RMTYDdMUc9AG5M/wgAnQaOsdljfnBiFlJh/QPwFK4u0C5RuMKNqQngFu7wtMJNAYhUUebE1ATYYoULAFvNwk0BmFuVZty8lFRe7S+mBtAAGkADeFsvKpKWeAy6FowAAAAASUVORK5CYII="
                    alt="Cloudy"
                    width="36"
                  />
                  <span class="forecast-temp-max">7°</span>
                  <span class="forecast-temp-min">3°</span>
                </div>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastCard.innerHTML = forecastHTML;
}

function showTemp(response) {
  console.log(response);
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
displayForecast();
