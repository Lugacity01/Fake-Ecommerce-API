import React, { useState } from 'react'
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Logout = ({ Logout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true); // Start loading

    // Simulate a delay for logout (e.g., API call or other operations)
    setTimeout(() => {
      localStorage.removeItem("authLogin"); // Remove auth token
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userCart");
      setIsLoading(false); // Stop loading
      navigate("/login"); // Redirect to login page
    }, 2000); // Adjust the delay as needed
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>{Logout}</button>

      <Modal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onConfirm={handleLogout}
        onClose={closeModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default Logout