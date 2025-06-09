// Funzione per creare un elemento DOM in modo dinamico
// Accetta:
// - tagName: il nome del tag HTML (es. 'div', 'h1', 'button')
// - options: un oggetto con proprietà opzionali come 'id', 'class', 'textContent', 'dataset'
function creaElementoDOM(tagName, options = {}) {
    const element = document.createElement(tagName);

    if (options.id) {
        element.id = options.id;
    }
    if (options.class) {
        // Se 'class' è una stringa, la imposta.
        // Se è un array di stringhe, aggiunge tutte le classi.
        if (Array.isArray(options.class)) {
            options.class.forEach(cls => element.classList.add(cls));
        } else {
            element.classList.add(options.class);
        }
    }
    if (options.textContent) {
        element.textContent = options.textContent;
    }
    

    if (options.dataset) {
        for (const key in options.dataset) {
            element.dataset[key] = options.dataset[key];
        }
    }

    return element;
}

// 1. Creazione del contenitore principale dell'applicazione
const container = creaElementoDOM("div", { id: "container" });

// 2. Creazione del titolo dell'app
const title = creaElementoDOM("h1", { textContent: "Contatore" });

// 3. Creazione dell'elemento che visualizzerà il valore del contatore
const counterDisplay = creaElementoDOM("div", { id: "counter", textContent: "0" });

// 4. Creazione dei pulsanti utilizzando la funzione creaElementoDOM
// Aggiungiamo un attributo 'data-action' per identificare l'azione del pulsante
const minusButton = creaElementoDOM("button", { textContent: "−", class: "btn", dataset: { action: "minus" } });
const plusButton = creaElementoDOM("button", { textContent: "+", class: "btn", dataset: { action: "plus" } });
const resetButton = creaElementoDOM("button", { textContent: "Reset", class: "btn", dataset: { action: "reset" } });

// Creazione del contenitore per i pulsanti '+' e '−'
const buttonGroup = creaElementoDOM("div", { class: "button-group" }); // Aggiunta una classe per stile opzionale
buttonGroup.appendChild(minusButton);
buttonGroup.appendChild(plusButton);


// 5. Logica del contatore
let count = 0;

// IMPLEMENTAZIONE DELLA EVENT DELEGATION
// Invece di ascoltare i clic su ogni singolo pulsante ('minusButton', 'plusButton'), ascoltiamo i clic sul loro contenitore comune: 'buttonGroup'.

buttonGroup.addEventListener("click", (event) => {
    const clickedElement = event.target;

    // Controlliamo se l'elemento cliccato è un pulsante e ha un attributo 'data-action'
    if (clickedElement.matches('.btn') && clickedElement.dataset.action) {
        const action = clickedElement.dataset.action; 

        if (action === "plus") {
            count++;
        } else if (action === "minus") {
            count--;
        }
        // Aggiorna il display del contatore con il nuovo valore
        counterDisplay.textContent = count;
    }
});

// Il pulsante Reset ha una logica a sé stante e non fa parte del buttonGroup per +/- quindi il suo event listener può rimanere separato, a meno che non si voglia
// implementare Event Delegation su un contenitore genitore di tutti i pulsanti.
resetButton.addEventListener("click", () => {
    count = 0;
    counterDisplay.textContent = count;
});


// 6. Montaggio di tutti gli elementi creati dinamicamente nella pagina HTML
// Aggiungiamo il titolo, il display del contatore, il gruppo di pulsanti e il pulsante reset all'interno del contenitore principale.
container.appendChild(title);
container.appendChild(counterDisplay);
container.appendChild(buttonGroup);
container.appendChild(resetButton);

// Infine, aggiungiamo il contenitore principale al corpo del documento HTML
document.body.appendChild(container);
