
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Datafetching from "./datafetching";
import OrderPage from "./orderbookingpage";
import History from "./orderhistorypage";

function App() {
    const [order, setOrder] = useState([]);

    const addToOrder = (item) => {
        if (item.available_quantity > 0) {
            const existingItem = order.find((i) => i.id === item.id);
            if (existingItem) {
                setOrder(
                    order.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                );
            } else {
                setOrder([...order, { ...item, quantity: 1 }]);
            }
        } else {
            alert("Item is not available!");
        }
    };

    const placeOrder = (orderDetails) => {
        const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
        localStorage.setItem(
            "orderHistory",
            JSON.stringify([...orderHistory, orderDetails])
        );
        setOrder([]); 
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Datafetching addToOrder={addToOrder} />} />
                <Route
                    path="/order"
                    element={<OrderPage order={order} placeOrder={placeOrder} />}
                />

                <Route path="/history" element={<History order={order} placeOrder={placeOrder}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
