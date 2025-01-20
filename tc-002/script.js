console.log("Hello from JS!");

// Grab the button from the DOM
const myButton = document.getElementById("myButton");

// Add a click listener
myButton.addEventListener("click", function () {
        alert("Button clicked!");
        console.log("The user has clicked the button");
});
