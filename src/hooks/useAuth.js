import { useState, useEffect } from "react";

const useAuth = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authLogin");
    if (token) {
      const storedUser = localStorage.getItem("userDetails");
      if (storedUser) {
        setUserDetails(JSON.parse(storedUser)); // Parse and set user details
      }
    }
  }, []);

  return { userDetails };
};

export default useAuth;
