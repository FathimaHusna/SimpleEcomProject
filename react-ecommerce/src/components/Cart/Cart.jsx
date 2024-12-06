import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../redux/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart); // Adjusted based on your state structure
  const dispatch = useDispatch();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Add some products!</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
