const fahrenheit = document.getElementById("fahrenheit");
const celsius = document.getElementById("celsius");

loadListeners();

function fahr2cel() {
  const fahrVal = parseFloat(fahrenheit.value);

  const celVal = (fahrVal - 32) * (5 / 9);

  celsius.value = round(celVal);
}

function cel2fahr() {
  const celVal = parseFloat(celsius.value);

  const fahrVal = celVal * (9 / 5) + 32;

  fahrenheit.value = round(fahrVal);
}

function round(x) {
  return Math.round(x * 100) / 100;
}

function loadListeners() {
  fahrenheit.addEventListener("input", fahr2cel);
  celsius.addEventListener("input", cel2fahr);
}
