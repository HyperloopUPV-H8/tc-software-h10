const divTemp= document.getElementById("divTemp");
const data = localStorage.getItem("weatherData");
const weatherData = JSON.parse(data);
window.onload = function() {
    if (!weatherData || !weatherData.main) {
        divTemp.innerHTML = "<p>Invalid weather data.</p>";
        return;
    }
    divTemp.innerHTML = `
    <p class="temperature" >Temperature: ${weatherData.main.temp}°C</p>
    <p class="temperature" >Feels like: ${weatherData.main.feels_like}°C</p>
    <p class="temperature" >Max Temperature: ${weatherData.main.temp_min}°C</p>
    <p class="temperature" >Min Temperature: ${weatherData.main.temp_max}°C</p>
    <p class="temperature" >Pressure: ${weatherData.main.pressure}</p>
`;
  };
