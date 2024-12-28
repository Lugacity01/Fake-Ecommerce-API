import React, { useEffect, useState } from "react";
import { Fake_Store_url, product } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import CategoryFilter from "../Auth/components/CategoryFilter";
import { useGetData } from "../Auth/components/UseGetData";


const Product = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  
  const { isFetching, error: err, data, refetch } = useGetData(`${Fake_Store_url}/products/`);
  console.log("isFetching Product", isFetching);
  
  useEffect(() => {
     if (isFetching && !data) {
       setIsLoading(true);

     } else {
       setIsLoading(false);
    }
    if (data) {
      setPosts(data);
    }
  }, [isFetching, data])


  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      setError(false);
      try {
        const fetchProduct = await product(sortOrder, selectedCategory);
        console.log("fetchProduct", fetchProduct);
        setPosts(fetchProduct);
      } catch (error) {
        console.error("Failed to delete post:", error);
        setError(true);
      } finally {
         console.log("fetchProduct", fetchProduct);
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [sortOrder, selectedCategory]);

  //  <NavLink key={post.id} to={`/single-product?id=${post.id}`}></NavLink>;

  // const toggleSortOrder = () =>
  //   setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      if (prevOrder === "asc") {
        return "desc";
      } else {
        return "asc";
      }
    });
  };

  const handleCategoryChange = (category) => setSelectedCategory(category);

  return (
    <div className="lg:p-6 p-2">
      <div className="mb-4 flex flex-col lg:justify-end items-center gap-4 md:flex-row md:justify-center">
        {/* Category Filter */}
        <div className="lg:flex hidden items-center">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="lg:flex hidden items-center">
          <button
            onClick={toggleSortOrder}
            className="rounded bg-[#116A7B] px-4 py-2 text-white"
          >
            Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {error ? (
          "Network Issue: Failed to fetch data."
        ) : isLoading ? (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="3x"
              className="animate-spin"
            />
            {/* Loading product.... */}
          </>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="max-w-sm  rounded-lg border border-gray-200 bg-[#F5F8FB] shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <NavLink key={post.id} to={`/single-product/${post.id}`}>
                {/* Image Section */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full rounded-t-lg object-cover"
                />

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="truncate text-lg font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm capitalize text-gray-500">
                     {post.category}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-700">
                    {post.description}
                  </p>

                  {/* Price and Rating */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#116A7B]">
                      ${post.price}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.5 7h7.5l-6 5 2.5 7-6-4-6 4 2.5-7-6-5h7.5z" />
                      </svg>
                      {post.rating.rate} ({post.rating.count})
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
