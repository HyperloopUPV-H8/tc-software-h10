const jokeText = document.getElementById("jokeText");
const jokeBtn = document.getElementById("jokeBtn");

jokeBtn.addEventListener("click", async () => {
    jokeText.textContent = "Loading...";

    try {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        jokeText.textContent = data.value;
    } catch (error) {
        jokeText.textContent = "Failed to load joke.";
        console.error(error);
    }
});
