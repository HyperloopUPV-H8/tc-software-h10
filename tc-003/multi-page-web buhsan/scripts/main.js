const weatherBtn = document.getElementById("weatherBtn");

const weatherImage = document.getElementById("weatherIcon");
const weatherTitle = document.getElementById("weatherTitle");
const weatherDescription = document.getElementById("weatherDescription");
const weatherName = document.getElementById("weatherName");

const input = document.getElementById("input");
const apiKey = '9225cdd52a88b0297f3642a95d2ca876';

weatherBtn.addEventListener("click", getWeather);

async function getWeather() {
        weatherTitle.textContent = "Loading data...";
        const city = input.value;
        if (!city) {
                weatherTitle.textContent = 'Please enter a city name';
        }
        try {
                const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
                );
                if (!response.ok) {
                        throw new Error(
                                `HTTP error! status: ${response.status}`,
                        );
                }

                const data = await response.json();
                localStorage.setItem("weatherData", JSON.stringify(data));
                weatherTitle.textContent = `Weather in ${city}`;
                let dataIcon = data.weather[0].icon;
                weatherName.textContent = data.weather[0].main;
                weatherImage.src = `http://openweathermap.org/img/wn/${dataIcon}.png`;
                weatherDescription.textContent = `Condition: ${data.weather[0].description}`;

        } catch (error) {
                weatherText.textContent = "Failed to load data.";
                console.error(error);
        }
}
