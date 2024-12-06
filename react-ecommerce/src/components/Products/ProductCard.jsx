import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("Adding product to cart:", product); // Debugging
    dispatch(addToCart(product));
    alert("product is added to cart")
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired, // Ensure `id` is present
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
