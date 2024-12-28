import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { getCategories } from "../../../services/api";
// import { getCategories } from "../../services/api";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="mb-4">
      <h2 className="mb-2 text-lg font-bold">Filter by Category:</h2>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded border border-gray-300 px-4 py-2 text-gray-700"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
            
          </option>
        ))}
      </select>
    </div>
  );
};

// Prop validation
CategoryFilter.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
