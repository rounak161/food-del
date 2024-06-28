// import { createContext, useEffect, useState } from "react"
// // import { food_list } from "../assets/assets";
// import axios from 'axios';
// export const StoreContext = createContext(null);
// const StoreContextProvider = (props) => {


//   const [cartItems, setCartItems] = useState({});
//   const url = 'http://localhost:4000';
//   const[token,setToken]=useState('');
//   const [food_list,setFoodList]=useState([]);
  
//   const addToCart = (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//     }
//   }

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
//   }
  
//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   }

//   const fetchFoodList=async()=>{
//      const response=await axios.get(url+'api/food/list')
//      setFoodList(response.data.data)
//   }

//   useEffect(()=>{

//    async function loadData(){
//     await fetchFoodList();
//     if(localStorage.getItem("token")){
//       setToken(localStorage.getItem("token"))
//    }
//    loadData();
//    }
//   },[])

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   }
//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   )


// }
// export default StoreContextProvider;


// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const url = 'http://localhost:4000/';
//   const [token, setToken] = useState('');
//   const [food_list, setFoodList] = useState([]); // Ensure this is `food_list`

//   const addToCart = async(itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if(token){
//       await axios.post(url+'api/cart/add',{itemId},{headers:{token}})
//     }
//   };

//   const removeFromCart =async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if(token){
//       await axios.post(url+'api/cart/remove',{itemId},{headers:{token}})
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get(url + 'api/food/list');
//       setFoodList(response.data.data); // Ensure this path is correct
//     } catch (error) {
//       console.error('Failed to fetch food list', error);
//     }
//   };
 
 
//   const loadCartData=async(token)=>{
//     const response=await axios.get(url+"api/cart/get",{},{headers:{token}})
//      setCartItems(response.data.loadCartData);
//   }

   
  
//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       const storedToken = localStorage.getItem('token');
//       if (storedToken) {
//         setToken(storedToken);
//          await loadCartData(localStorage.getItem('token'))
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list, // Provide `food_list` here
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;


// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const url = 'http://localhost:4000/';
//   const [token, setToken] = useState('');
//   const [food_list, setFoodList] = useState([]);

//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
//     if (token) {
//       await axios.post(url + 'api/cart/add', { itemId }, { headers: { token } });
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => {
//       const updatedItems = { ...prev, [itemId]: (prev[itemId] || 1) - 1 };
//       if (updatedItems[itemId] <= 0) {
//         delete updatedItems[itemId];
//       }
//       return updatedItems;
//     });
//     if (token) {
//       await axios.post(url + 'api/cart/remove', { itemId }, { headers: { token } });
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get(url + 'api/food/list');
//       setFoodList(response.data.data);
//     } catch (error) {
//       console.error('Failed to fetch food list', error);
//     }
//   };

//   const loadCartData = async (token) => {
//     try {
//       const response = await axios.get(url + 'api/cart/get', { headers: { token } });
//       setCartItems(response.data.CartData || {}); // Add a fallback for empty cart data
//     } catch (error) {
//       console.error('Failed to load cart data', error);
//     }
//   };
  
//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       const storedToken = localStorage.getItem('token');
//       if (storedToken) {
//         setToken(storedToken);
//         await loadCartData(storedToken);
//       }
//     }
//     loadData();
//   }, []);
  
//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;



// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const StoreContext = createContext(null);
 

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const url = 'http://localhost:4000/';
//   const [token, setToken] = useState('');
//   const [food_list, setFoodList] = useState([]);

//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
//     if (token) {
//       await axios.post(url + 'api/cart/add', { itemId }, { headers: { token } });
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => {
//       const updatedItems = { ...prev, [itemId]: (prev[itemId] || 1) - 1 };
//       if (updatedItems[itemId] <= 0) {
//         delete updatedItems[itemId];
//       }
//       return updatedItems;
//     });
//     if (token) {
//       await axios.post(url + 'api/cart/remove', { itemId }, { headers: { token } });
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get(url + 'api/food/list');
//       setFoodList(response.data.data);
//     } catch (error) {
//       console.error('Failed to fetch food list', error);
//     }
//   };

//   const loadCartData = async (token) => {
//           const response = await axios.post(url + 'api/cart/get',{}, {headers:{token}});
//           setCartItems(response.data.CartData);
//   };
  
  
//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       const storedToken = localStorage.getItem('token');
//       if (storedToken) {
//         setToken(storedToken);
//          await loadCartData(storedToken);
//       }
//     }
//     loadData();
//   }, []);
  
  
//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

 

 
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = 'http://localhost:4000/';
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev = {}) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      await axios.post(url + 'api/cart/add', { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev = {}) => {
      const updatedItems = { ...prev, [itemId]: (prev[itemId] || 1) - 1 };
      if (updatedItems[itemId] <= 0) {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });
    if (token) {
      await axios.post(url + 'api/cart/remove', { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + 'api/food/list');
      setFoodList(response.data.data);
      //console.log(response.data.data)
    } catch (error) {
      console.error('Failed to fetch food list', error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + 'api/cart/get', {}, { headers: { token } });
      const { cartData } = response.data; // Destructure cartData from response
      console.log(response)
      setCartItems(cartData); // Update cartItems state with cartData
    } catch (error) {
      console.error('Failed to load cart data', error);
    }
  };
  

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
//export default have to do  for providing storecontextprovider
export default StoreContextProvider;



 