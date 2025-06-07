// 1. Creazione del contenitore principale
const container = document.createElement("div");
container.id = "container";

// 2. Titolo dell'app
const title = document.createElement("h1");
title.textContent = "Contatore";

// 3. Visualizzazione del valore del counter
const counterDisplay = document.createElement("div");
counterDisplay.id = "counter";
counterDisplay.textContent = "0";


// 4. Creazione dei pulsanti
const minusButton = document.createElement("button");
minusButton.textContent = "−";
minusButton.className = "btn";

const plusButton = document.createElement("button");
plusButton.textContent = "+";
plusButton.className = "btn";

const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.className = "btn";

// Nuovo contenitore per i pulsanti + e −
const buttonGroup = document.createElement("div");
buttonGroup.appendChild(minusButton);
buttonGroup.appendChild(plusButton);


// 5. Aggiunta della logica
let count = 0;

plusButton.addEventListener("click", () => {
  count++;
  counterDisplay.textContent = count;
});

minusButton.addEventListener("click", () => {
  count--;
  counterDisplay.textContent = count;
});

resetButton.addEventListener("click", () => {
  count = 0;
  counterDisplay.textContent = count;
});



// 6. Montaggio degli elementi nella pagina
container.appendChild(title);
container.appendChild(counterDisplay);
container.appendChild(buttonGroup);
container.appendChild(resetButton);
document.body.appendChild(container);

