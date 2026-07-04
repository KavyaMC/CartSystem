function updateTotal(amount) {
	const cartTotal = document.getElementById("cart-total");
	const cartUpdate = document.getElementById("update");

	const currentTotal = parseInt(cartTotal.textContent);
	const newTotal = currentTotal + amount;

	cartTotal.textContent = newTotal;
	cartUpdate.textContent = `Shopping cart total updated. Current total is ₹${newTotal}.`;
}

function createCartItem(name, price) {
	const cartItem = document.createElement("li");
	cartItem.textContent = `${name} - ₹${price} `;

	const removeButton = document.createElement("button");
	removeButton.textContent = "Remove";
	removeButton.classList.add("remove-btn");
	removeButton.setAttribute("data-price", price);

	cartItem.append(removeButton);

	return cartItem;
}

function handleAddClick(event) {
	const productButton = event.target;
	const productName = productButton.getAttribute("data-name");
	const productPrice = parseInt(productButton.getAttribute("data-price"));

	const cartItem = createCartItem(productName, productPrice);
	const cartList = document.getElementById("cart-list");

	cartList.append(cartItem);
	updateTotal(productPrice);
}

function setupProductListeners() {
	const productButtons = document.querySelectorAll(".product-btn");

	for (const button of productButtons) {
		button.addEventListener("click", handleAddClick);
	}
}

function handleCartClick(event) {
	const removeButton = event.target;

	if (!removeButton.classList.contains("remove-btn")) {
		return;
	}

	const productPrice = parseInt(removeButton.getAttribute("data-price"));

	updateTotal(-productPrice);
	removeButton.parentNode.remove();
}

function handlePromoInput(event) {
	const promoCode = event.target.value.trim();
	const promoMessage = document.getElementById("promo-message");

	if (promoCode.length === 5) {
		promoMessage.textContent = "Checking code...";
	} else {
		promoMessage.textContent = "";
	}
}

function handleCheckout(event) {
	event.preventDefault();

	const cartList = document.getElementById("cart-list");
	const cartTotal = document.getElementById("cart-total");
	const checkoutStatus = document.getElementById("checkout-status");
	const promoInput = document.getElementById("promo-code");
	const promoMessage = document.getElementById("promo-message");

	const finalAmount = parseInt(cartTotal.textContent);

	if (cartList.childElementCount === 0) {
		checkoutStatus.textContent = "Cart is empty. Add items first.";
		return;
	}

	checkoutStatus.textContent =
		`Success! Your purchase totaling ₹${finalAmount} is being processed.`;

	cartList.innerHTML = "";

	updateTotal(-finalAmount);

	promoInput.value = "";
	promoMessage.textContent = "";
}

function bootSystem() {
	setupProductListeners();

	const cartList = document.getElementById("cart-list");
	const promoInput = document.getElementById("promo-code");
	const checkoutForm = document.getElementById("checkout-form");

	cartList.addEventListener("click", handleCartClick);
	promoInput.addEventListener("input", handlePromoInput);
	checkoutForm.addEventListener("submit", handleCheckout);
}

document.addEventListener("DOMContentLoaded", bootSystem);