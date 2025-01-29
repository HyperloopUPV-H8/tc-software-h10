// Inputs
const catAgeInput = document.querySelector(".age-calculator__cat-age");
const humanAgeInput = document.querySelector(".age-calculator__human-age");

function isNotNumeric(value) {
  return isNaN(value) || typeof value === "boolean";
}

catAgeInput.addEventListener("input", (e) => {
  const catAge = parseInt(catAgeInput.value);

  if (isNotNumeric(catAge)) {
    humanAgeInput.value = "Value is not numeric";
    return;
  }

  if (catAge === 1) {
    humanAgeInput.value = 15;
  } else {
    humanAgeInput.value = (catAge - 2) * 4 + 24;
  }
});
