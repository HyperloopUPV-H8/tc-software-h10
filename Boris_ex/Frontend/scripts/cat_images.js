const button = document.getElementById("catButton");
const image = document.getElementById("catImage");

button.addEventListener("click", getCat);

async function getCat() {
    try {
        image.src = "https://i.pinimg.com/736x/01/59/c8/0159c8c12c455c42872641f8c7c82879.jpg";
        const response = await fetch("https://api.thecatapi.com/v1/images/search");	
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        image.src = data[0].url;
    } catch (error) {
        image.src = "https://http.cat/404";
        console.error(error);
    }
}