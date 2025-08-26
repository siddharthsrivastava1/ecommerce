import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoader } from "../context/LoaderContext";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const { showLoader, hideLoader } = useLoader();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsCollection, setProductsCollection] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      showLoader();
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        hideLoader();
      } catch (error) {
        hideLoader();
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getCategoryData = async (data) => {
    showLoader();
    try {
      const response = await axios.post(backendUrl + "/api/product/filter", {
        category: data.category,
        subcategory: data.subcategory,
        page: data.page || 1,
        limit: data.limit || 3,
      });
      hideLoader();
      if (response.data.success) {
        setProducts(response.data.data.reverse());
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      hideLoader();
      toast.error(error.message);
    }
  };
  const getSortData = async (data) => {
    showLoader();
    try {
      const response = await axios.post(backendUrl + "/api/product/sort", {
        category: data.category,
        subcategory: data.subcategory,
        sort: "price",
        order: data,
      });
      hideLoader();
      if (response.data.success) {
        setProducts(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      hideLoader();
      toast.error(error.message);
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
    if (token) {
      showLoader();
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        hideLoader();
      } catch (error) {
        hideLoader();
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async (page, limit) => {
    showLoader();
    try {
      const response = await axios.get(
        backendUrl + `/api/product/list?page=${page}&limit=${limit || 5}`
      );
      hideLoader();
      if (response.data.success) {
        setProducts(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      hideLoader();
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    showLoader();
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      hideLoader();
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      hideLoader();
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData(1);
  }, []);

  useEffect(() => {
    // showLoader();
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      // hideLoader();
    }
    if (token) {
      // hideLoader();
      getUserCart(token);
    }
  }, [token]);

  const value = {
    getCategoryData,
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    getProductsData,
    totalPages,
    setPage,
    page,
    productsCollection,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
