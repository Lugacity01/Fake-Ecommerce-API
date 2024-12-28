import axios from "axios";



export const Fake_Store_url = `https://fakestoreapi.com`;
// https://fakestoreapi.com/auth/login



// https://fakestoreapi.com/users/3
export const getSingleUser = async (id) => {
  try {
    const response = await axios.get(`${Fake_Store_url}/users/${id}`);
    // const data = await response.json();
    console.log("Product", response.data);
    return response.data;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};


export const loginFakeStore = async (username, password) => {
  try {
    const response = await fetch(`${Fake_Store_url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};




export const product = async (asc) => {
  try {
    const response = await axios.get(`${Fake_Store_url}/products?sort=${asc}`);
    // const data = await response.json();
    console.log("Product", response.data);
    return response.data;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};


export const singleProduct = async (id) => {
    // https://fakestoreapi.com/products/1
    try {
        const response = await axios.get(`${Fake_Store_url}/products/${id}`);
        // const data = await response.json();
        console.log("singleProduct", response.data);
        return response.data;
        
        
    }
    catch (err) {
        console.log("Error", err);
        throw err;
    }
}



export const getCategories = async () => {
  try {
    const response = await axios.get(`${Fake_Store_url}/products/categories`);
    console.log("Fetched Categories:", response.data);
    return response.data;
  } catch (err) {
    console.log("Error fetching categories:", err);
    throw err;
  }
};




// ADD NEW PRODUCT
export  const addNewProduct = async (productData) => {
    try {
        const response = await axios.get(`${Fake_Store_url}/products`, productData);
         console.log("Product added successfully:", response.data);
         return response.data;
    } catch (err) {
        console.log("Error Adding New Product", err);
        throw err;
    }
}






export const updateProduct = async (id, updateproduct) => {
  try {
    const response = await axios.put(
      `${Fake_Store_url}/products/${id}`,
      updateproduct,
    );
    console.log("Product updated successfully:", response.data);
    return response.data;
  } catch (err) {
    console.log("Error updating product:", err);
    throw err;
  }
};


export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${Fake_Store_url}/products/${id}`,
    );
    console.log("Product deleted successfully:", response.data);
    return response.data;
  } catch (err) {
    console.log("Error delete product:", err);
    throw err;
  }
};




// CART

export const getAllCarts = async () => {
    // https://fakestoreapi.com/carts
  try {
    const response = await axios.get(`${Fake_Store_url}/carts`)
    console.log("Get all cart:", response.data);
    return response.data;
  } catch (err) {
    console.log("Error Displaying cart", err);
    throw err;
  }
};


export const deleteUser = async (userId) => {
  // https://fakestoreapi.com/users/${}
  try {
    const response = await axios.delete(`${Fake_Store_url}/users/${userId}`, {
      method: "DELETE",
    });
    console.log("delete user account:", response.data);
    return response.data;
  } catch (err) {
    console.log("Error to delete the account", err);
    throw err;
  }
};











// loginFakeStore("mor_2314", "83r5^_")
//   .then((data) => console.log("Token:", data.token))
//   .catch((err) => console.error("Login error:", err.message));