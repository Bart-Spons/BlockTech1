// Vijf kleuren die gebruikt gaan worden
const colors = ["red", "orange", "green", "blue", "purple"];
let index = 0;
const elem = document.getElementById("changeMe");

// Kleur veranderen elke vijf seconden
setInterval(() => {
  elem.style.color = colors[index];
  index++;
  if (index >= colors.length) {
    index = 0;
  }
}, 5000);