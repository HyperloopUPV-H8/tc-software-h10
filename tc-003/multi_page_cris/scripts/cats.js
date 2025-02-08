// Obtener elementos del DOM
const catImage = document.getElementById("catImage");
const catBtn = document.getElementById("catBtn");

// Añadir evento al botón para obtener una nueva imagen
catBtn.addEventListener("click", async () => {
    catImage.alt = "Loading..."; // Texto alternativo mientras carga la imagen
    catImage.src = ""; // Limpia la imagen anterior

    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        catImage.src = data[0].url; // Asigna la URL de la imagen al atributo src
        catImage.alt = "Cute cat"; // Texto alternativo para la nueva imagen
    } catch (error) {
        catImage.alt = "Failed to load cat image.";
        console.error("Error fetching cat image:", error);
    }
});
