// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    Starters: ["Garlic Bread", "Bruschetta"],
    MainCourses: ["Margherita Pizza", "Spaghetti Carbonara"],
    Desserts: ["Tiramisu", "Cheesecake"]
};

// The price list for each menu item (example)
const priceList = {
    "Garlic Bread": 25.00,
    "Bruschetta": 30.00,
    "Margherita Pizza": 100.00,
    "Spaghetti Carbonara": 112.00,
    "Tiramisu": 70.00,
    "Cheesecake": 65.0
};

// Function to display menu items by category
function displayMenuItems(menu) {
    const menuContainer = document.getElementById("menu");

    for (let category in menu) {
        const categoryElement = document.createElement("h3");
        categoryElement.textContent = category;
        menuContainer.appendChild(categoryElement);

        const itemList = document.createElement("ul");

        menu[category].forEach(item => {
            const itemElement = document.createElement("li");
            itemElement.textContent = item;
            itemElement.addEventListener("click", () => addToOrder(item));
            itemList.appendChild(itemElement);
        });

        menuContainer.appendChild(itemList);
    }
}

// Callback function for adding an item to the order
function addToOrder(itemName) {
    const orderItemsList = document.getElementById("order-items");
    const orderTotalElement = document.getElementById("order-total");

    const orderItemElement = document.createElement("li");
    orderItemElement.textContent = itemName;
    orderItemsList.appendChild(orderItemElement);

    let currentTotal = parseFloat(orderTotalElement.textContent.replace('R', '')) || 0;
    currentTotal += priceList[itemName];
    orderTotalElement.textContent = `R${currentTotal.toFixed(2)}`;
}

// Callback function for clearing the order
function clearOrder() {
    document.getElementById("order-items").innerHTML = '';
    document.getElementById("order-total").textContent = 'R0.00';
}

// Function to show a popup
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "flex"; 
    } else {
        console.error(`Popup with ID ${popupId} not found!`);
    }
}

// Function to close a popup
function closePopup(popupId) {
    console.log(`Attempting to close popup: ${popupId}`); // Debugging log
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
        console.log(`Popup ${popupId} successfully closed.`); 
    } else {
        console.error(`Popup with ID ${popupId} not found!`);
    }
}

// Function to show the checkout popup
function showCheckoutPopup() {
    const orderItemsList = document.getElementById("order-items");
    const popupMessage = document.getElementById("popup-message");
    const confirmOrderButton = document.getElementById("confirm-order");

    if (orderItemsList.children.length === 0) {
        popupMessage.textContent = "Your cart is empty 😭! Please add some delicious items before checking out.";
        confirmOrderButton.style.display = "none"; 
    } else {
        popupMessage.textContent = "Are you sure this is your final delicious order?🍝 ";
        confirmOrderButton.style.display = "inline-block"; 
    }

    showPopup("popup");
}

// Function to confirm the order and show the confirmation popup
function confirmOrder() {
    closePopup("popup"); // Close the first popup

    const confirmationMessage = document.getElementById("confirmation-message");
    const orderNumber = `#${Math.floor(Math.random() * 1000000)}`;
    confirmationMessage.textContent = `🍕 Your order is on its way! 🍝 Thank you for choosing CodeCuisine. We'll prepare your meal with love! Your unique order number is ${orderNumber}.`;

    showPopup("confirmation-popup"); // Show confirmation popup

    clearOrder(); // Clear the cart after order confirmation
}

// Function to initialize event listeners
function initMenuSystem(menu) {
    displayMenuItems(menu);

    document.getElementById("clear-order").addEventListener("click", clearOrder);
    document.getElementById("checkout").addEventListener("click", showCheckoutPopup);
    document.getElementById("confirm-order").addEventListener("click", confirmOrder);

    // Ensure event listeners for both close buttons
    const closeButton1 = document.getElementById("close-popup-1"); // Correct ID for first popup
    const closeButton2 = document.getElementById("close-popup-2"); // Correct ID for second popup

    if (closeButton1) {
        closeButton1.addEventListener("click", () => closePopup("popup"));
        console.log("Close button for popup attached.");
    } else {
        console.error("Close button for popup not found.");
    }

    if (closeButton2) {
        closeButton2.addEventListener("click", () => closePopup("confirmation-popup"));
        console.log("Close button for confirmation-popup attached.");
    } else {
        console.error("Close button for confirmation-popup not found.");
    }
}

// Ensure everything loads before executing
document.addEventListener("DOMContentLoaded", () => {
    initMenuSystem(menu);
});
