import { RiDeleteBin3Line } from "react-icons/ri";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    Size: {item.size}, Color: {item.color}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="border px-2"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500"
                >
                  <RiDeleteBin3Line />
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-semibold text-lg mt-4">
            Total: ${getTotal().toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
