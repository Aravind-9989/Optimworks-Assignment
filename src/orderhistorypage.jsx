
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]); 
  const [currentOrder, setCurrentOrder] = useState(null); 
  const [showAllOrders, setShowAllOrders] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrderHistory(savedOrderHistory);

    if (savedOrderHistory.length > 0) {
      setCurrentOrder(savedOrderHistory[savedOrderHistory.length - 1]); 
    }
  }, []);

  const handledishes = () => {
    navigate("/");  
  };

  const handleShowAllOrders = () => {
    setShowAllOrders(true); 
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
      
      {currentOrder ? (
        <div>
         <center style={{color:"red"}}><h3>Current Order</h3></center> 
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
              <tr>
                <td style={styles.tableData}>{currentOrder.tablenumber}</td>
                <td style={styles.tableData}>{currentOrder.contactnumber}</td>
                <td style={styles.tableData}>{currentOrder.date}</td>
                <td style={styles.tableData}>{currentOrder.time}</td>
                <td style={styles.tableData}>
                  {currentOrder.orderitems.map((item, idx) => (
                    <div key={idx}>
                      {item.name} ({item.quantity})
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No current order available</p>
      )}

      <center>
        <button style={{ padding: "10px", color: "white", backgroundColor: "red", marginTop: "20px" }} onClick={handleShowAllOrders}>
          Show Previous Orders
        </button>
      </center>

      {showAllOrders && orderHistory.length > 1 && (
        <div>
          <h3>Past Orders</h3>
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
              {orderHistory.slice(0, -1).map((order, index) => ( 
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
        </div>
      )}

      <center>
        <button style={{ padding: "10px", color: "white", backgroundColor: "red", marginTop: "20px" }} onClick={handledishes}>
          Navigate to Order Dishes
        </button>
      </center>
    </div>
  );
}

export default OrderHistory;
