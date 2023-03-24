//Bevestiging dat er een speler is toegevoegd
const addPlayerButton = document.getElementById('addPlayerButton');
  addPlayerButton.addEventListener('click', function() {
    const naamInput = document.getElementById('naam');
    const woonplaatsInput = document.getElementById('woonplaats');
    const positieInput = document.getElementById('positie');
    const naam = naamInput.value;
    const woonplaats = woonplaatsInput.value;
    const positie = positieInput.value;
    //Het bericht
    alert(`Je hebt ${naam} uit ${woonplaats} toegevoegd en zijn/haar positie is ${positie}!`);
  });