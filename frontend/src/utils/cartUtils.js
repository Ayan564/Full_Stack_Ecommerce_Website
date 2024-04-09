// Function to add decimal places to a number and ensure it has two decimal places
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Function to update the cart state based on the current cart items
export const updateCart = (state) => {
  // Calculate the total price of all items in the cart
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price based on whether the total price is over $100
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price, assuming a 15% tax rate
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate the total price including items, shipping, and tax
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the updated cart state to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  // Return the updated cart state
  return state;
};
