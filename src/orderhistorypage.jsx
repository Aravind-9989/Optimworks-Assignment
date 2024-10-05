import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const savedOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrderHistory(savedOrderHistory);
  }, []);
  const handledishes = () => {
    navigate("/");  
  };
  const styles = {
    table: {
      width: "80%",
      margin: "20px auto",
      borderCollapse: "collapse",
    },
    tableHead: {
      backgroundColor: "#f2f2f2",
    },
    tableData: {
      border: "1px solid #ccc",
      padding: "8px",
      textAlign: "center",
    },
  };

  return (
    <div>
      <center><h2>Order History</h2></center>
      {orderHistory.length === 0 ? (
        <p>No order history available</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableData}>Table Number</th>
              <th style={styles.tableData}>Contact Number</th>
              <th style={styles.tableData}>Date</th>
              <th style={styles.tableData}>Time</th>
              <th style={styles.tableData}>Ordered Items</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index}>
                <td style={styles.tableData}>{order.tablenumber}</td>
                <td style={styles.tableData}>{order.contactnumber}</td>
                <td style={styles.tableData}>{order.date}</td>
                <td style={styles.tableData}>{order.time}</td>
                <td style={styles.tableData}>
                  {order.orderitems.map((item, idx) => (
                    <div key={idx}>
                      {item.name} ({item.quantity})
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
   <center><button style={{padding:"10px",color:"white" ,backgroundColor:"red"}} onClick={handledishes}>Naviage to Order Dishes </button></center> 
    </div>
  );
}

export default OrderHistory;
