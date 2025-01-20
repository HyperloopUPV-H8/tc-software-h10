// Grab the same button defined in the HTML (myButton)
const myButton = document.getElementById("myButton");

// Add an event listener that toggles dark mode
myButton.addEventListener("click", () => {
        // Toggle the "dark-mode" class on the body
        document.body.classList.toggle("dark-mode");
});
