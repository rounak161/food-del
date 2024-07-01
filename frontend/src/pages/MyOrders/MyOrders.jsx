import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url + "api/order/userorders",
                {},
                { headers: {token} }
            );
            if (response.data && response.data.success) {
                setData(response.data.data);
                console.log(response.data.data)
            } else {
                setError(response.data.message || "Error fetching orders");
            }
        } catch (error) {
            setError("Network error occurred while fetching orders.");
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, index) => (
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>
                        {order.items.map((item, itemIndex) => 
                            itemIndex === order.items.length - 1
                                ? `${item.name} x ${item.quantity}`
                                : `${item.name} x ${item.quantity},`
                        )}
                    </p>
                    <p>${order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                </div>
            ))}
        </div>
    </div>
    
    );
}

export default MyOrders;



// import React, { useContext, useEffect, useState } from 'react';
// import './MyOrders.css';
// import { StoreContext } from '../../context/storeContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {
//     const { url, token } = useContext(StoreContext);
//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.post(
//                 url + "api/order/userorders",
//                 {},
//                 { headers:{token} } // Use correct header format
//             );
//             if (response.data && response.data.success) {
//                 setData(response.data.data);
//                 console.log(response.data.data);
//             } else {
//                 setError(response.data.message || "Error fetching orders");
//             }
//         } catch (error) {
//             setError("Network error occurred while fetching orders.");
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token]);

//     return (
//         <div className="my-orders">
//             <h2>My Orders</h2>
//             <div className="container">
//                 {data.map((order, index) => (
//                     <div key={index} className="my-orders-order">
//                         <img src={assets.parcel_icon} alt="" />
//                         <p>
//                             {order.items.map((item, itemIndex) => 
//                                 itemIndex === order.items.length - 1
//                                     ? `${item.name} x ${item.quantity}`
//                                     : `${item.name} x ${item.quantity},`
//                             )}
//                         </p>
//                         <p>${order.amount}.00</p>
//                         <p>Items: {order.items.length}</p>
//                         <p><span>&#x25cf;</span><b>{order.status}</b></p>
//                         <button>Track Order</button>
//                     </div>
//                 ))}
//             </div>
//             {error && <p className="error">{error}</p>}
//         </div>
//     );
// }

// export default MyOrders;

