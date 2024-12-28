import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [userDetails, setUserDetails] = useState({
    name: {
      firstname: "",
      lastname: "",
    },
    phone: "",
    email: "",
    username: "",
    password: "",
    address: {
      number: "",
      city: "",
      street: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  // Fetch user info on component mount
  useEffect(() => {
    const token = localStorage.getItem("authLogin");
    const storedUser = localStorage.getItem("userDetails");
    if (token && storedUser) {
      const userId = JSON.parse(storedUser).id;
      fetchUserDetails(userId);
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUserDetails(data); // Set fetched user details in state
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); // Handle nested fields

    setUserDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      if (keys.length > 1) {
        updatedDetails[keys[0]][keys[1]] = value; // Nested fields
      } else {
        updatedDetails[name] = value;
      }
      return updatedDetails;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://fakestoreapi.com/users/${userDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        },
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userDetails", JSON.stringify(data));
        toast.success("User details updated successfully!");
        // alert("User details updated successfully!");
      } else {
        console.error("Failed to update user details:", data);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
      const storedUser = localStorage.getItem("userDetails");
      setDeleting(true)
    if (storedUser) {
      const userId = JSON.parse(storedUser).id;
      try {
        await deleteUser(userId);
        toast.success("User account deleted successfully!");
        // Clear local storage and redirect to login or home page
        localStorage.removeItem("authLogin");
        localStorage.removeItem("userDetails");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting user account:", error);
        toast.error("Failed to delete user account. Please try again.");
      } finally {
          setDeleting(false);
      }
    } else {
      toast.error("User details not found. Please log in again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center lg:p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[800px] rounded-lg bg-white lg:p-6 p-2 shadow-lg"
      >
        <div className="flex mb-4 items-center justify-between text-center">
          <h2 className=" text-center lg:text-2xl  font-bold text-black">
            Settings
          </h2>

          <button
            disabled={deleting}
            className=" cursor-pointer text-lg text-red-500 hover:text-red-600"
            onClick={handleDelete}
          >
            {deleting ? (
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  size="1x"
                  className="text-primary-color-600"
                />
                <span className="hidden lg:block">Deleting Account</span>
              </div>

            ) : (
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faTrash} />
                  <span className="hidden lg:block">Delete Account</span> 
              </div>
            )}
          </button>
        </div>

        {/* First Name and Last Name */}
        <div className="mb-4 lg:space-y-0 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4">
          <div>
            <label className="mb-2 block font-medium text-black">
              First Name
            </label>
            {loading ? (
              <Skeleton height={40} />
            ) : (
              <input
                type="text"
                name="name.firstname"
                value={userDetails.name.firstname}
                onChange={handleInputChange}
                className="w-full rounded border px-4 py-2"
                placeholder="First Name"
              />
            )}
          </div>
          <div>
            <label className="mb-2 block font-medium text-black">
              Last Name
            </label>
            {loading ? (
              <Skeleton height={40} />
            ) : (
                <input
                  type="text"
                  name="name.lastname"
                  value={userDetails.name.lastname}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 px-4 py-2 capitalize outline-none focus:ring-2 focus:ring-[#116A7B]"
                  placeholder="Last Name"
                  required
                />
            ) }
          </div>
        </div>

        {/* Username and Password */}
        <div className="mb-4 lg:space-y-0 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4">
          <div>
            <label className="mb-2 block font-medium text-black">
              Username
            </label>
            {loading ? (<Skeleton height={40} />) :
              (
                <input
                  type="text"
                  name="username"
                  value={userDetails.username}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 px-4 py-2 capitalize outline-none focus:ring-2 focus:ring-[#116A7B]"
                  placeholder="Username"
                  required
                />
                
              )

            }
          </div>
          <div>
            <label className="mb-2 block font-medium text-black">
              Password
            </label>
            {loading ? (
              <Skeleton height={40} />
            ) : (
                <input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-[#116A7B]"
                  placeholder="Password"
                  required
                />
            ) }
          </div>
        </div>

        {/* Phone No */}
        <div className="mb-4">
          <label className="mb-2 block font-medium text-black">Phone No</label>
          {loading ? (
              <Skeleton height={40} />
            ) : (
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-[#116A7B]"
                placeholder="Phone Number"
                required
              />
            ) }
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-2 block font-medium text-black">Email</label>
          {loading ? (
              <Skeleton height={40} />
            ) : (
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full normal-case rounded border border-gray-300 bg-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-[#116A7B]"
                placeholder="Email Address"
                disabled
                required
              />
            ) }
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="mb-2 block font-medium text-black">Address</label>
          {loading ? (
              <Skeleton height={40} />
            ) : (
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="address.number"
                value={userDetails.address.number}
                onChange={handleInputChange}
                className="rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-[#116A7B]"
                placeholder="No."
                required
              />
              <input
                type="text"
                name="address.city"
                value={userDetails.address.city}
                onChange={handleInputChange}
                className="rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-[#116A7B]"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="address.street"
                value={userDetails.address.street}
                onChange={handleInputChange}
                className="rounded border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-[#116A7B]"
                placeholder="Street"
                required
              />
            </div>
            ) }
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-[#116A7B] lg:w-auto w-full p-6 py-2 font-medium text-white transition-all duration-300 hover:bg-[#0D4F5E]"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
