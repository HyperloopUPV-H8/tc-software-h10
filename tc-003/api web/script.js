const weatherText = document.getElementById("weatherText");
const weatherBtn = document.getElementById("weatherBtn");
const input = document.getElementById("input");
const apiKey = '9225cdd52a88b0297f3642a95d2ca876';

weatherBtn.addEventListener("click", getWeather);

async function getWeather() {
        weatherText.textContent = "Loading data...";
        const city = input.value;
        console.log(city);
        if (!city) {
                weatherText.textContent = 'Please enter a city name';
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
                weatherText.textContent = `Temperature in ${city}: ${data.main.temp}`;
        } catch (error) {
                weatherText.textContent = "Failed to load data.";
                console.error(error);
        }
}
