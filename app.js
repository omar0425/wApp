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
    console.log(weather);
  }
});
