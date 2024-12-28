import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCost, setTotalCost] = useState(0); // State to store the total cost

  // Get userId and cartData from localStorage
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    const storedCartData = localStorage.getItem("userCart");

    if (storedUserDetails && storedCartData) {
      const userDetails = JSON.parse(storedUserDetails);
      const userCart = JSON.parse(storedCartData);

      // Set the userId and cartData from localStorage
      setCartData(userCart.filter((cart) => cart.userId === userDetails.id));
    } else {
      setError("User details or cart data not found in localStorage.");
    }
  }, []);

  // Calculate total cost whenever cartData changes
  useEffect(() => {
    if (cartData.length > 0) {
      const total = cartData.reduce((sum, cart) => {
        const cartTotal = cart.products.reduce((productSum, product) => {
          // Ensure price and quantity are valid numbers before calculation
          const price = product.price ? parseFloat(product.price) : 0;
          const quantity = product.quantity ? parseInt(product.quantity, 10) : 0;

          // Calculate total for each product: price * quantity
          return productSum + price * quantity;
        }, 0);
        return sum + cartTotal;
      }, 0);
      setTotalCost(total); // Set the total cost
    }
  }, [cartData]);

  return (
    <div className="lg:p-6 p-2 pt-6">
      <h1 className="lg:mb-6 text-center lg:text-3xl font-bold ">
        User Cart
      </h1>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center text-[#116A7B]">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Cart Data */}
      <div className="mx-auto lg:max-w-4xl max-w-2xl rounded-lg bg-gray-100 lg:p-6 shadow-md">
        {cartData.map((cart) => (
          <div key={cart.id} className="mb-4 border-b pb-4">
            <h2 className="mb-2 lg:text-xl font-semibold text-[#116A7B]">
              Cart ID: {cart.id}
            </h2>
            <p className="mb-2 text-sm text-gray-600">
              Date: {new Date(cart.date).toLocaleDateString()}
            </p>
            <h3 className="mb-3 font-medium text-[#116A7B]">Products:</h3>
            <ul className="space-y-2">
              {cart.products.map((product) => {
                // Ensure price and quantity are valid numbers before rendering
                const price = product.price ? parseFloat(product.price) : 0;
                const quantity = product.quantity ? parseInt(product.quantity, 10) : 0;
                const productTotal = (price * quantity).toFixed(2); // Calculate total for the product

                return (
                  <li
                    key={product.productId}
                    className="flex justify-between rounded bg-[#F0FFFF] p-3 shadow-sm"
                  >
                    <span className="font-medium text-[#116A7B]">
                      Product ID: {product.productId}
                    </span>
                    <span className="font-semibold text-[#116A7B]">
                      Qty: {quantity}
                    </span>
                    <span className="font-semibold text-[#116A7B]">
                      Price: ${price.toFixed(2)} {/* Display price */}
                    </span>
                    <span className="font-semibold text-[#116A7B]">
                      Total: ${productTotal} {/* Display total for the product */}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold text-[#116A7B]">Total Cost:</h3>
        <p className="text-lg text-gray-700">${totalCost.toFixed(2)}</p>
      </div>

      {/* No Data Message */}
      {cartData.length === 0 && !loading && (
        <p className="mt-6 text-center text-gray-500">
          No cart data available for this user.
        </p>
      )}
    </div>
  );
};

export default Cart;
