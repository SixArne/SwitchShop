import {default as React, useContext, createContext, useState} from 'react';

import { apiConfig } from '../config';
import {useAuth} from "./auth.service";

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;
  const { verifyUserFromLocalStorage } = useAuth();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [wishlists, setWishlists] = useState([]);

  // Product API Calls
  const findAllProducts = async (query = null) => {
    let url = `${BASE_URL}/product`;

    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    const data = await response.json();

    if (data.docs) {
      setProducts(data.docs);
    } else {
      setProducts(data);
    }
  }

  const findProduct = async(id) => {
    let url = `${BASE_URL}/product/${id}`;
    const response = await fetch(url);
    const data = await response.json()
    setProduct(data);
  }

  const createProduct = async (data) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/product/create`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'post',
          headers: myHeaders,
          redirect: 'follow',
          body: data,
        }

        delete options.headers['Content-Type'];



        const response = await fetch(url, options);
        const receivedData = await response.json();
        console.log(receivedData);
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeProduct = async (id) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user && id) {
        const url = `${BASE_URL}/product/delete/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(url, options);
        setProducts(products.filter((product) => product._id !== id));
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeProductFromAllOrdersAndCarts = async (id) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user && id) {
        const url = `${BASE_URL}/product/clean/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'PATCH',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(url, options);
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateProduct = async (id, body) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user && id && body) {
        const url = `${BASE_URL}/product/update/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'PATCH',
          headers: myHeaders,
          redirect: 'follow',
          body: JSON.stringify(body),
        };

        const response = await fetch(url, options);
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Cart API Calls
  const addToCart = async (product) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user && product) {
        const url = `${BASE_URL}/cart/addProduct`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const body = {
          id: user.id,
          productId: product,
        }

        const options = {
          method: 'PATCH',
          headers: myHeaders,
          body: JSON.stringify(body),
          redirect: 'follow'
        };

        const response = await fetch(url, options);
        return response.json();
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }

  }

  const getCart = async () => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/cart`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(url, options);
        return response.json();
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Order API Calls
  const createOrder = async(list) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/order/create`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const body = {
          list,
        }

        const options = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow',
          body: body,
        };

        const response = await fetch(url, options);
        return response.json();
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const findAllCustomerOrders = async () => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/order/`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const findOrderById = async (id) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/order/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch(url, options);
        const data = await response.json();
        return data;
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const completeOrder = async (id) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/order/update/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'PATCH',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch(url, options);
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeOrder = async (id) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/order/delete/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch(url, options);
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Wishlist API Calls
  const findAllCustomerWishlists = async () => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/wishlist/`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setWishlists(data);
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateCustomerWishlist = async (list) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/wishlist/update`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const body = {
          list,
        }

        const options = {
          method: 'PATCH',
          headers: myHeaders,
          redirect: 'follow',
          body,
        };

        const response = await fetch(url, options);
        return response.json();
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Users API Calls
  const findAllCustomers = async () => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/user`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const deleteUser = async (id) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/user/delete/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const options = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch(url, options);
        const data = await response.json();

        setUsers(users.filter((user) => user._id !== id));
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateUserRole = async (id, role) => {
    try {
      const user = verifyUserFromLocalStorage();

      if (user) {
        const url = `${BASE_URL}/user/update/${id}`;

        const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }

        const body = {
          role,
        }

        console.log(body);

        const options = {
          method: 'PATCH',
          headers: myHeaders,
          redirect: 'follow',
          body: JSON.stringify(body),
        };

        const response = await fetch(url, options);
        const data = await response.json();

        await findAllCustomers();
      } else {
        throw new Error("No valid information given");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const queryParams = (options) => {
    return Object.keys(options)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key])).join('&');
  }

  return (
    <ApiContext.Provider value={{
      findProduct,
      findAllProducts,
      createProduct,
      removeProduct,
      removeProductFromAllOrdersAndCarts,
      updateProduct,
      findAllCustomerOrders,
      findAllCustomerWishlists,
      findAllCustomers,
      updateUserRole,
      deleteUser,
      findOrderById,
      users,
      wishlists,
      orders,
      products,
      product,
      addToCart,
      completeOrder,
      removeOrder,
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}