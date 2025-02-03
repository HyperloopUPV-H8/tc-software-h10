const divOther= document.getElementById("divOther");
const data = localStorage.getItem("weatherData");
const apiKey = '9225cdd52a88b0297f3642a95d2ca876';
const weatherData = JSON.parse(data);
window.onload = function() {
    if (!weatherData || !weatherData.main) {
        divTemp.innerHTML = "<p>Invalid weather data.</p>";
        return;
    }
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid: weatherData.id,appid: '9225cdd52a88b0297f3642a95d2ca876',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();
    divOther.innerHTML = `
    <p class="other" >Humidity Level: ${weatherData.main.humidity}</p>
    <p class="other" >Sea Level: ${weatherData.main.feels_like}</p>
    <p class="other" >Ground Level: ${weatherData.main.sea_level}</p>
    <p class="other" >Wind Speed: ${weatherData.wind.speed} m/s</p>
    <script>window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid: '2509951',appid: '9225cdd52a88b0297f3642a95d2ca876',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();</script>
`;
  };
