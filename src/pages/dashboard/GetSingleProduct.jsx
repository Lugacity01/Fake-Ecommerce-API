import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, singleProduct } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Modal from "../Auth/components/Modal";
import { Fake_Store_url } from "../../services/api";
import axios from "axios";
import { useGetData } from "../Auth/components/GetData";

const GetSingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const { id } = useParams(); // Get the id from the URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    isFetching,
    error: err,
    data,
    refetch,
  } = useGetData(`${Fake_Store_url}/products/${id}`);

  useEffect(() => {
    if (isFetching && !data) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (data) {
      setProduct(data);
    }
  }, [isFetching, data]);
  
  // useEffect(() => {
  //   async function fetchSingleProduct() {
  //     setIsLoading(true);
  //     try {
  //       const fetchedProduct = await singleProduct(id);
  //       setProduct(fetchedProduct);
  //     } catch (error) {
  //       console.error("Error fetching single product:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchSingleProduct()
  // }, [id]);

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid product ID. Cannot delete.");
      return;
    }

    setIsLoading(true); // Start the loading spinner
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      navigate(-1); // Navigate back after deletion if needed
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  };

  const addToCart = async () => {
    if (!product || quantity < 1) {
      toast.error("Invalid product or quantity.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${Fake_Store_url}/carts`, {
        userId: 1,
        products: [{ id: product.id, quantity }],
      });
      toast.success("Product added to cart successfully!");
      console.log("Add to cart response:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="lg:p-6 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-300"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="3x"
            className="animate-spin text-gray-500"
          />
        </div>
      ) : product ? (
        <div className="mx-auto lg:my-6 max-w-4xl rounded-lg bg-[#F5F8FB] lg:p-6 p-4 shadow-md">
          {/* Product Image */}
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex-shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg shadow-lg object-cover lg:w-[400px] lg:h-[400px]"
                // style={{
                //   width: "400px",
                //   height: "500px",
                //   objectFit: "cover",
                // }}
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-6">
                <NavLink to={`/product/edit/${id}`}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="ml-2 cursor-pointer text-[#116A7B] hover:text-[#A7D7C5]"
                  />
                </NavLink>

                <FontAwesomeIcon
                  icon={faTrash}
                  className="ml-2 cursor-pointer text-red-500 hover:text-red-600"
                  onClick={openModal}
                />
              </div>

              <h1 className="lg:text-2xl  font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="lg:text-lg text-gray-600">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p className="lg:text-lg text-justify text-gray-600">{product.description}</p>
              <p className="lg:text-xl font-semibold text-[#116A7B]">
                ${product.price}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="quantity"
                  className="font-semibold text-gray-700"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center focus:border-[#116A7B] focus:outline-none"
                  min="1"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-4 lg:space-y-0 space-y-3 lg:flex gap-4">
                <button
                  onClick={addToCart}
                  className="rounded-md bg-[#116A7B] lg:w-auto w-full px-6 py-2 font-semibold text-white shadow-md transition hover:bg-[#437882]"
                >
                  Add to Cart
                </button>
                <button className="rounded-md lg:w-auto w-full bg-gray-200 px-6 py-2 font-semibold text-gray-700 shadow-md transition hover:bg-gray-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Product not found.</p>
      )}

      <Modal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onConfirm={() => handleDelete(product?.id)}
        onClose={closeModal}
        title="Confirm Delete"
        message="Are you sure you want to delete the product?"
      />
    </div>
  );
};

export default GetSingleProduct;
