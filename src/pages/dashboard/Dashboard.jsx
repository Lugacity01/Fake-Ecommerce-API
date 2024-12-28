import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faMale, faGem, faTv } from "@fortawesome/free-solid-svg-icons";
import { useGetData } from "../Auth/components/UseGetData";
import { Fake_Store_url } from "../../services/api";

const Dashboard = () => {
  const { userDetails } = useAuth();
  const { isFetching, error: err, data, refetch } = useGetData(`${Fake_Store_url}/products/`);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>{
    if (isFetching && !data) {
      setIsLoading(true);

    } else {
      setIsLoading(false);
   }
   if (data) {
     setPosts(data);
   }
  }, [isFetching, data]);

  // useEffect(() => {
  //   async function fetchProduct() {
  //     setIsLoading(true);
  //     setError(false);
  //     try {
  //       const fetchProduct = await product(sortOrder, selectedCategory);
  //       console.log("fetchProduct", fetchProduct);
  //       setPosts(fetchProduct);
  //     } catch (error) {
  //       console.error("Failed to delete post:", error);
  //       setError(true);
  //     } finally {
  //       //  console.log("fetchProduct", fetchProduct);
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchProduct();
  // }, [sortOrder, selectedCategory]);

  // Mock data for product counts
  const [productCounts, setProductCounts] = useState({
    totalProducts: 1200,
    totalMens: 450,
    totalJewelry: 150,
    totalElectronics: 600,
  });

  return (
    <div className="dashboard p-8">
      {/* User Details Section */}
      {/* {userDetails ? (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold capitalize text-[#116A7B]">
            Welcome, {userDetails.name.firstname} {userDetails.name.lastname}!
          </h2>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold text-[#116A7B]">Username:</span>{" "}
            {userDetails.username}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold text-[#116A7B]">Email:</span>{" "}
            {userDetails.email}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )} */}

      {/* Product Count Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FontAwesomeIcon
            icon={faBox}
            className="text-4xl text-[#116A7B] mb-4"
          />
          <h3 className="text-xl font-semibold text-[#116A7B]">Total Products</h3>
          <p className="mt-2 text-2xl font-bold">{posts.length}</p>
        </div>

        {/* Total Men's Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FontAwesomeIcon
            icon={faMale}
            className="text-4xl text-[#116A7B] mb-4"
          />
          <h3 className="text-xl font-semibold text-[#116A7B]">Total Men's Products</h3>
          <p className="mt-2 text-2xl font-bold">{productCounts.totalMens}</p>
        </div>

        {/* Total Jewelry Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FontAwesomeIcon
            icon={faGem}
            className="text-4xl text-[#116A7B] mb-4"
          />
          <h3 className="text-xl font-semibold text-[#116A7B]">Total Jewelry Products</h3>
          <p className="mt-2 text-2xl font-bold">{productCounts.totalJewelry}</p>
        </div>

        {/* Total Electronics Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FontAwesomeIcon
            icon={faTv}
            className="text-4xl text-[#116A7B] mb-4"
          />
          <h3 className="text-xl font-semibold text-[#116A7B]">Total Electronics Products</h3>
          <p className="mt-2 text-2xl font-bold">{productCounts.totalElectronics}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
