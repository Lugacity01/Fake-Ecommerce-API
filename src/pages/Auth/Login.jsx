import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { loginFakeStore } from "../../services/api"; // Import your API function
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is already authenticated
    const token = localStorage.getItem("authLogin");
    if (token) {
      navigate("/"); // Redirect to the dashboard if authenticated
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
  
    try {
      const response = await loginFakeStore(username, password);
      const token = response?.token;
  
      if (token) {
        // Save token in localStorage
        localStorage.setItem("authLogin", token);
  
        // Fetch user data from API
        const usersResponse = await fetch("https://fakestoreapi.com/users");
        const usersData = await usersResponse.json();
  
        // Find the user based on the username entered
        const user = usersData.find((user) => user.username === username);
  
        if (user) {
          // Save only the logged-in user's details in localStorage
          localStorage.setItem("userDetails", JSON.stringify(user));
  
          // Fetch cart data for the logged-in user
          const cartResponse = await fetch(`https://fakestoreapi.com/carts/user/${user.id}`);
          const cartData = await cartResponse.json();
  
          // Save cart data in localStorage
          localStorage.setItem("userCart", JSON.stringify(cartData));
  
          toast.success("Login successful!");
          navigate("/"); // Redirect to the dashboard
        } else {
          toast.error("User not found!");
        }
      } else {
        toast.error("Invalid username or password!");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 text-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg px-4 py-2 font-medium text-white ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#116A7B] hover:bg-[#A7D7C5]"
            } focus:outline-none focus:ring-2 focus:ring-[#A7D7C5]`}
            disabled={loading}
          >
            {loading ?  <>
            
              <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="1x"
              className="text-primary-color-600"
              />
                Logging in...
            
            </>
              : "Login"}
        
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
