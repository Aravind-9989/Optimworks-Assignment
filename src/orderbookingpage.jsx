
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderPage({ order, placeOrder }) {
  const [tablenumber, setTableNumber] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [formdata, setFormdata] = useState({
    date: "",
    time: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();

    const formattedDate = currentDate.toISOString().split("T")[0];

    const formattedTime = currentDate
      .toTimeString()
      .split(":")
      .slice(0, 2)
      .join(":");

    setFormdata({
      date: formattedDate,
      time: formattedTime,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleOrderSubmit = () => {
    const orderDetails = {
      tablenumber,
      contactnumber,
      date: formdata.date,
      time: formdata.time,
      orderitems: order,
    };

    placeOrder(orderDetails);
    alert("Order successfully placed!");
    navigate("/history");

    setTableNumber("");
    setContactNumber("");
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
    formContainer: {
      maxWidth: "500px",
      margin: "20px auto",
      padding: "20px",
      border: "2px solid #e0e0e0",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    button: {
      backgroundColor: "red",
      color: "white",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  return (
    <div>
      <center>
        <h2>Your Order Details</h2>
      </center>
      {order.length === 0 ? (
        <p>No items in the order</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableData}>Id</th>
              <th style={styles.tableData}>Dish Name</th>
              <th style={styles.tableData}>Quantity</th>
              <th style={styles.tableData}>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableData}>{item.id}</td>
                <td style={styles.tableData}>{item.name}</td>
                <td style={styles.tableData}>{item.quantity}</td>
                <td style={styles.tableData}>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={styles.formContainer}>
        <center>
          <h2>Place Your Order</h2>
        </center>

        <form>
          <div style={styles.formGroup}>
            <label style={styles.label}>Table number:</label>
            <input
              type="text"
              placeholder="Table Number"
              value={tablenumber}
              onChange={(e) => setTableNumber(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact number:</label>
            <input
              type="text"
              placeholder="Contact Number"
              value={contactnumber}
              onChange={(e) => setContactNumber(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formdata.date}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formdata.time}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
        </form>

        <center>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handleOrderSubmit}
          >
            Place Order
          </button>
        </center>
      </div>
    </div>
  );
}

export default OrderPage;
