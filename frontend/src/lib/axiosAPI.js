import axios from "axios";

export const baseURL = "http://localhost:4000";
// export const baseURL = "http://localhost:5000";

export const getRecommendProducts = async () => {
  return await axios.get(`${baseURL}/api/products/recommend`);
};

export const getNewArrivals = async () => {
  return await axios.get(`${baseURL}/api/products/newarrivals`);
};

export const userGetAllOrders = async (userInfo, currPageQuery) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`, // Assuming 'Authorization' header is needed
    },
  };
  return await axios.get(
    'http://localhost:4000/api/orders/myorders?pageNumber=${currPageQuery}',
    config
  );
};

export const adminCreateProduct = async (userInfo, formData) => {

  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userInfo.token}`, 
    },
    body: formData
  };

  try {
    const response = await fetch('http://localhost:4000/product/products/', config);
    const data = await response.json(); // Assuming a JSON response
    return data; 
  } catch (error) {
    console.log("some")
    console.error("Error creating product:", error);
    // You might want to do more robust error handling here 
    throw error; // Re-throw to allow handling at a higher level
  } 
};

export const adminGetOrder = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(`${baseURL}/api/orders/${id}`, config);
};

export const adminUpdateOrder = async (userInfo, isDelivered, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  const body = {
    isDelivered: isDelivered,
  };
  return await axios.put(`${baseURL}/api/orders/${id}/deliver`, body, config);
};

export const adminGetProduct = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(`http://localhost:4000/api/products/${id}`, config);
};

export const adminUpdateProduct = async (userInfo, id, formData) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.put(`${baseURL}/api/products/${id}`, formData, config);
};

export const adminGetUser = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(`${baseURL}/api/users/${id}`, config);
};

export const adminUpdateUser = async (userInfo, id, formData) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.put(`${baseURL}/api/users/${id}`, formData, config);
};

export const adminGetOrders = async (userInfo, pageNumber) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `${baseURL}/api/orders?pageNumber=${pageNumber}`,
    config
  );
};

export const adminGetProducts = async (userInfo, pageNumber) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `http://localhost:4000/api/products?pageNumber=${pageNumber}`,
    config
  );
};


export const adminGetCategory = async (userInfo) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `http://localhost:4000/api/categories/`,
    config
  );
};

export const adminDeleteCategory = async (userInfo, categoryID) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, 
      },
    };

    const { data } = await axios.delete(
      `http://localhost:4000/api/categories/${categoryID}`, // Adjust your API endpoint URL
      config
    );

    return data; // Assuming your API returns a success message or relevant data
  } catch (error) {
    throw error; // Pass the error up for handling in your component
  }
};


export const adminCreateCategory = async (userInfo, formData) => {
  console.log(formData)
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userInfo.token}`, // Assuming 'Authorization' header is needed
    },
    body: formData
  };

  try {
    const response = await fetch('http://localhost:4000/api/categories/', config);

    const data = await response.json(); // Assuming a JSON response
    return data; 
  } catch (error) {
    console.log("some")
    console.error("Error creating product:", error);
    // You might want to do more robust error handling here 
    throw error; // Re-throw to allow handling at a higher level
  } 
};
export const adminDeleteProduct = async (userInfo, id) => {
  console.log(userInfo);
  const config = {
   
    headers: {
      Authorization: `Bearer ${userInfo.token}`, // Assuming 'Authorization' header is needed
    },
  };
  return await axios.delete(`http://localhost:4000/api/products/${id}`, config);
};

export const adminGetAllUsers = async (userInfo, pageNumber) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.get(
    `${baseURL}/api/users?pageNumber=${pageNumber}`,
    config
  );
};

export const adminDeleteUser = async (userInfo, id) => {
  const config = {
    headers: {
      Bearer: `${userInfo.token}`,
    },
  };
  return await axios.delete(`${baseURL}/api/users/${id}`, config);
};

export const addProductComment = async (userInfo, id, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`, // Assuming 'Authorization' header is needed
    },
  };
  return await axios.post(
    `${baseURL}/api/products/${id}/reviews`,
    formData,
    config
  );
};
