import { createContext, useState } from "react";

//Create a new context

export const CartContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	//Add item to the cart

	const addToCart = (item) => {
		setCart((prevCart) => [...prevCart, item]);
	};

	// Remove item from the cart

	const removeItemFromCart = (itemId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
	};

	// Clear the cart
	const clearCart = () => {
		setCart([]);
	};

	// Calculate the total quantity of items in the cart
	const getTotalItems = () => {
		return cart.reduce((total, item) => total + item.quantity, 0);
	};

	// Calculate the total price of items in the cart
	const getTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	// Create the context value object
	const contextValue = {
		cart,
		addToCart,
		removeItemFromCart,
		clearCart,
		getTotalItems,
		getTotalPrice,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
