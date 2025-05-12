const Data = {
  names: [
    { name: 'Alice', chance: 3 },
    { name: 'Bob', chance: 1 },
    { name: 'Charlie', chance: 2 },
    { name: 'Dora', chance: 10 },
  ],
  numberOfSpin: 0,
};

document.addEventListener('DOMContentLoaded', () => {
  getData(Data);
  displayPrizes();
  renderOptionsBoard(); // <--- render the static board
  document.querySelector('.rotateBtn').addEventListener('click', spinWheel);
});

// --- Save and load ---
function saveData(Data) {
  localStorage.setItem('spinNumber', Data.numberOfSpin);
}

function getData(Data) {
  const number = localStorage.getItem('spinNumber') || 0;
  Data.numberOfSpin = parseInt(number, 10);
}

// --- Display all available prizes ---
function displayPrizes() {
  const prizeContainer = document.querySelector('.displayPrizes');
  prizeContainer.innerHTML = '';

  Data.names.forEach(({ name }) => {
    const div = document.createElement('div');
    div.textContent = name;
    div.style.fontSize = '2rem';
    div.style.margin = '0.5rem 0';
    prizeContainer.appendChild(div);
  });
}

// --- Create a weighted list based on chance ---
function createWeightedList(names) {
  const weighted = [];
  names.forEach(({ name, chance }) => {
    const weight = Math.max(chance || 1, 1);
    for (let i = 0; i < weight; i++) {
      weighted.push(name);
    }
  });
  return weighted;
}

// --- Main spinning logic ---
function spinWheel() {
  const displayDiv = document.querySelector('.displayPrizes');
  const winnerDiv = document.querySelector('.displayWinner');
  const weightedList = createWeightedList(Data.names);

  let spinInterval = setInterval(() => {
    const name = weightedList[Math.floor(Math.random() * weightedList.length)];
    displayDiv.innerHTML = `<div style="opacity: 0.6; font-size: 3rem;">${name}</div>`;
  }, 100); // flash every 100ms

  setTimeout(() => {
    clearInterval(spinInterval);
    const winner = weightedList[Math.floor(Math.random() * weightedList.length)];
    winnerDiv.innerHTML = `You won: ${winner}`;
    displayDiv.innerHTML = `<div style="font-size: 4rem;">🎉 ${winner} 🎉</div>`;

    Data.numberOfSpin += 1;
    saveData(Data);
  }, 6000); // stop after 6 seconds
}

// --- Set up event and load initial state ---
document.addEventListener('DOMContentLoaded', () => {
  getData(Data);
  displayPrizes();

  const button = document.querySelector('.rotateBtn');
  button.addEventListener('click', spinWheel);
});

function renderOptionsBoard() {
  const board = document.querySelector('.optionsBoard');
  board.innerHTML = '<h2 style="font-size: 2.5rem;">🎯 Options</h2>';

  Data.names.forEach(({ name }) => {
    const row = document.createElement('div');
    row.style.fontSize = '1.8rem';
    row.style.margin = '0.5rem 0';
    row.textContent = name;
    board.appendChild(row);
  });
}
