// Function to dynamically create a DOM element
// Accepts:
// - tagName: the HTML tag name (e.g., 'div', 'h1', 'button')
// - options: an object with optional properties like 'id', 'class', 'textContent', 'dataset', 'attributes'
function createElementDOM(tagName, options = {}) {
    const element = document.createElement(tagName);

    if (options.id) {
        element.id = options.id;
    }
    if (options.class) {
        // If 'class' is a string, set it.
        // If it's an array of strings, add all classes.
        if (Array.isArray(options.class)) {
            options.class.forEach(cls => element.classList.add(cls));
        } else {
            element.classList.add(options.class);
        }
    }
    if (options.textContent) {
        element.textContent = options.textContent;
    }
    
    // Add custom attributes if provided
    if (options.attributes) {
        for (const key in options.attributes) {
            element.setAttribute(key, options.attributes[key]);
        }
    }

    if (options.dataset) {
        for (const key in options.dataset) {
            element.dataset[key] = options.dataset[key];
        }
    }

    return element;
}

// 1. Create the main application container
const appContainer = createElementDOM("div", { id: "app-container" }); // Renamed ID for clarity

// 2. Create the app title
const appTitle = createElementDOM("h1", { textContent: "Counter" });

// 3. Create the element that will display the counter value
const counterDisplayElement = createElementDOM("div", { id: "counter-display", textContent: "0" }); // Renamed ID for clarity

// 4. Create the buttons using the createElementDOM function
// Add a 'data-action' attribute to identify the button's action
const minusButton = createElementDOM("button", { textContent: "−", class: "btn", dataset: { action: "minus" } });
const plusButton = createElementDOM("button", { textContent: "+", class: "btn", dataset: { action: "plus" } });
const resetButton = createElementDOM("button", { textContent: "Reset", class: "btn", dataset: { action: "reset" } });

// Create a group for the '+' and '−' buttons
const buttonGroupElement = createElementDOM("div", { class: "button-group" });
buttonGroupElement.appendChild(minusButton);
buttonGroupElement.appendChild(plusButton);

// Create a wrapper for all action buttons (plus, minus, reset) to apply single event delegation
const buttonsWrapper = createElementDOM("div", { class: "buttons-wrapper" });
buttonsWrapper.appendChild(buttonGroupElement); // Add the group of +/- buttons
buttonsWrapper.appendChild(resetButton);       // Add the reset button

// 5. Counter logic
let count = 0;

// IMPLEMENTATION OF EVENT DELEGATION
// Instead of listening for clicks on each individual button, we listen for clicks on their common parent: 'buttonsWrapper'.
buttonsWrapper.addEventListener("click", (event) => {
    const clickedElement = event.target;

    // Check if the clicked element is a button and has a 'data-action' attribute
    if (clickedElement.matches('.btn') && clickedElement.dataset.action) {
        const action = clickedElement.dataset.action; 

        if (action === "plus") {
            count++;
        } else if (action === "minus") {
            count--;
        } else if (action === "reset") { // Handle reset action within the same listener
            count = 0;
        }
        // Update the counter display with the new value
        counterDisplayElement.textContent = count;
    }
});

// 6. Mount all dynamically created elements to the HTML page
// Add the title, counter display, and the buttons wrapper inside the main container.
appContainer.appendChild(appTitle);
appContainer.appendChild(counterDisplayElement);
appContainer.appendChild(buttonsWrapper); // Append the wrapper containing all buttons

// Finally, add the main container to the HTML document body
document.body.appendChild(appContainer);
