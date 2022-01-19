// 1st Event handler
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dom Content Loaded");

  const api = {
    key: "dbe67cf3c78d1447de866b9e98991a97",
    url: "http://api.weatherstack.com/current?access_key=",
    units: "f",
  };
  const searchBar = document.querySelector(".search-bar");
  searchBar.addEventListener("keypress", getLocation);
  // 2nd event listener
  function getLocation(e) {
    if (e.key === "Enter") {
      fetchWeather(searchBar.value);
    }
  }

  function fetchWeather(query) {
    fetch(`${api.url}${api.key}&query=${query}&units=${api.units}`)
      .then((resp) => resp.json())
      .then(displayWeather);
  }

  function displayWeather(weather) {
    const { temperature, weather_descriptions, weather_icons } =
      weather.current;
    const { name, region } = weather.location;
    const location = document.querySelector(".location");
    location.textContent = `${name}, ${region}`;
    const displayTemp = document.querySelector(".temp");
    displayTemp.textContent = `${temperature} \xB0F`;
    const displayIcon = document.querySelector(".icon");
    displayIcon.src = weather_icons;
    const description = document.querySelector(".description");
    description.textContent = weather_descriptions;
    const button = document.querySelector(".btn");

    button.addEventListener("click", changeUnit);
    function changeUnit() {
      const celsius = (temperature - 32) * (5 / 9);
      const celTemp = (displayTemp.textContent = `${Math.floor(celsius)}`);
      const cSymbol = `\u2103`;
      const fSymbol = `\xB0F`;
      if (button.textContent === "Celsius") {
        displayTemp.textContent = `${celTemp} ${cSymbol}`;
        button.textContent = `Fahrenheit`;
      } else {
        displayTemp.textContent = `${temperature}${fSymbol}`;
        button.textContent = `Celsius`;
      }
    }
  }
});
