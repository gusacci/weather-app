function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temperatureTodayValue = Math.round(response.data.main.temp);
  let feelsLikeValue = Math.round(response.data.main.feels_like);
  let humidityValue = response.data.main.humidity;
  let windSpeedValue = Math.round(response.data.wind.speed);
  let visibilityValue = response.data.visibility / 1000;

  let temperatureToday = document.querySelector("#weather-today");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let visibility = document.querySelector("#visibility");
  let iconElement = document.querySelector("#icon");
  let weatherDescription = document.querySelector("#description");

  temperatureToday.innerHTML = `${temperatureTodayValue}°C`;
  feelsLike.innerHTML = `Feels like: ${feelsLikeValue}°`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  windSpeed.innerHTML = `Wind: ${windSpeedValue} km/h`;
  visibility.innerHTML = `Visibility: ${visibilityValue} km`;
  weatherDescription.innerHTML = response.data.weather[0].main;

  document.querySelector("#country").innerHTML = response.data.sys.country;
  iconElement.setAttribute("src", showIcon(weatherDescription.textContent));
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function showIcon(iconDescription) {
  let timePeriod = new Date().getHours();
  if (iconDescription === "Clear") {
    if (timePeriod > 5 && timePeriod < 20) {
      return `style/icons/wi-day-sunny.svg`;
    } else {
      return `style/icons/wi-night-clear.svg`;
    }
  } else if (iconDescription === "Rain") {
    return `style/icons/wi-day-rain.svg`;
  } else if (iconDescription === "Snow") {
    return `style/icons/wi-day-snow.svg`;
  } else if (iconDescription === "Thunderstorm") {
    return `style/icons/wi-day-thunderstorm.svg`;
  } else if (iconDescription === "Mist") {
    return `style/icons/wi-cloudy-windy.svg`;
  } else if (iconDescription === "Clouds") {
    if (timePeriod > 5 && timePeriod < 20) {
      return `style/icons/wi-day-cloudy.svg`;
    } else {
      return `style/icons/wi-night-alt-cloudy.svg`;
    }
  } else {
    return `style/icons/wi-cloudy.svg`;
  }
}

function searchCity(city) {
  let apiKey = "95d97ccda682cdc0d4123003baefd848";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value; //searchInput.value;
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "95d97ccda682cdc0d4123003baefd848";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  console.log(position.coords.longitude);
}

let dayToday = document.querySelector("#day-today");

let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];

let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}

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
  "December",
];

let month = months[now.getMonth()];
dayToday.innerHTML = `${weekday}, ${date} ${month}`;

let timeToday = document.querySelector("#time-today");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes};`;
}

timeToday.innerHTML = `${hours} : ${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

searchCity("Paris");
