import { useState } from "react";
import { products } from "./products";  // Assuming the products array is available
import ProductCard from "./ProductCard";
import { logout } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart); // Access the cart state

  // State for search, category, and price filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
    alert("You are logged out.");
    navigate("/login");
  };

  // Function to handle view cart
  const handleViewCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  // Function to filter products based on category, price, and search
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    // Price filter
    const matchesPriceRange =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under $50" && product.price < 50) ||
      (selectedPriceRange === "$50 - $100" && product.price >= 50 && product.price <= 100) ||
      (selectedPriceRange === "$100 - $500" && product.price > 100 && product.price <= 500) ||
      (selectedPriceRange === "Above $500" && product.price > 500);

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <button
          className="bg-red-500 px-4 py-2 rounded text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
          className="bg-blue-500 px-4 py-2 rounded text-white"
          onClick={handleViewCart}
        >
          View Cart ({cart.length} items) {/* Show number of items in the cart */}
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="p-4 flex justify-between items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        {/* Filter by Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          {/* Add more categories here if needed */}
        </select>

        {/* Filter by Price */}
        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="All">All Prices</option>
          <option value="Under $50">Under $50</option>
          <option value="$50 - $100">$50 - $100</option>
          <option value="$100 - $500">$100 - $500</option>
          <option value="Above $500">Above $500</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
