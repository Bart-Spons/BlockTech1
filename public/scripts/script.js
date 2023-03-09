const showDataBtn = document.getElementById('show-data-btn');
const positieDropdown = document.getElementById('positie-filters');
const peopleList = document.getElementById('people-list');

showDataBtn.addEventListener('click', () => {
  laadSpelers();
});

positieDropdown.addEventListener('change', (event) => {
  laadSpelers(event.target.value);
});

function laadSpelers(positie) {
  let url = 'http://localhost:1900/people';

  if (positie) {
    url += '?positie=' + positie;
  }

fetch(url).then(response => {
  return response.json();
}).then(data => {
  // Wanneer data klaar staat
  let html = '';
  for (let person of data) {
    html += `<li>${person.naam} is ${person.positie}</li>`;
  }
  peopleList.innerHTML = html;
  peopleList.style.display = 'block';
});
}