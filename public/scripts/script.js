// Kleur veranderen elke 5 seconden
const colors = ["red", "orange", "green", "blue", "purple"];
let index = 0;
const elem = document.getElementById("changeMe");

setInterval(() => {
  elem.style.color = colors[index];
  index++;
  if (index >= colors.length) {
    index = 0;
  }
}, 5000);