const meowFactText = document.getElementById("meowFactText");
const meowButton = document.getElementById("meowButton");

meowButton.addEventListener("click", getMeowFact);

async function getMeowFact() {
  // Change buttons text to loading state
  meowButton.textContent = "Loading fact...";

  try {
    const response = await fetch("https://meowfacts.herokuapp.com");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()).data;
    meowFactText.textContent = data[0];
  } catch (error) {
    meowFactText.textContent = "Failed to load fact.";
    console.error(error);
  }

  // Return initial button text from loading state
  meowButton.textContent = "Get Fact";
}

getMeowFact();
