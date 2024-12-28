import React, { useState, useEffect } from "react";
import { addNewProduct, singleProduct, updateProduct } from "../../services/api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const AddNewProduct = () => {
  
  const [product, setProduct] = useState(
     {
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    },
  );
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await singleProduct(id); // Fetch the product details
          setProduct(response); // Set the fetched product in the state
        } catch (error) {
          console.error("Error fetching single product:", error);
          toast.error("Failed to load product details.");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        // Update product logic
        const response = await updateProduct(id, product);
        console.log("Updated Product Response:", response);
        toast.success("Product updated successfully!");
          navigate('/');
      } else {
        // Add new product logic
        await addNewProduct(product);
        toast.success("Product added successfully!");

        // Reset the form after adding a product
        setProduct({
          title: "",
          price: "",
          description: "",
          image: "",
          category: "",
        });
      }
    } catch (err) {
      console.error("Error processing product:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:p-6 ">

      {id ? (
         <button
         onClick={() => navigate(-1)}
         className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-300"
       >
         <FontAwesomeIcon icon={faArrowLeft} />
       </button>
      ) : ''}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-lg bg-gray-100 lg:p-6 p-2 shadow-md"
      >
        <h2 className="lg:mb-6 text-center lg:text-2xl font-semibold text-gray-700">
          {id ? "Update Product" : "Add New Product"}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-600">Title:</label>
          <input
            type="text"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            className="w-full rounded-md border-gray-300 p-2 outline-none focus:border-[#116A7B] focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-600">Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full rounded-md border-gray-300 p-2 outline-none focus:border-[#116A7B] focus:ring focus:ring-[#A7D7C5]"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-600">Description:</label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full rounded-md border-gray-300 p-2 outline-none focus:border-[#116A7B] focus:ring focus:ring-blue-200"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-600">Image URL:</label>
          <input
            type="url"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            className="w-full rounded-md border-gray-300 p-2 outline-none focus:border-[#116A7B] focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-600">Category:</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full rounded-md border-gray-300 p-2 outline-none focus:border-[#116A7B] focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className={`lg:flex lg:items-center lg:w-auto w-full text-center gap-2 rounded-md bg-[#116A7B] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#A7D7C5] hover:text-[#116A7B] ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  size="1x"
                  className="text-white"
                />
                Processing...
              </>
            ) : id ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
