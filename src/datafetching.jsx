
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Datafetching({ addToOrder }) {
  const [data, setData] = useState([]);

  const styles = {
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "center",
      marginTop: "40px",
    },
    card: {
      width: "250px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
    },
    cardImage: {
      width: "100%",
      height: "150px",
      borderRadius: "10px",
    },
    cardBody: {
      padding: "16px",
    },
    button: {
      backgroundColor: "red",
      color: "white",
      padding: "10px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    outOfStock: {
      backgroundColor: "gray",
      color: "white",
      padding: "10px 16px",
      borderRadius: "4px",
      marginTop: "10px",
      cursor: "not-allowed",
    },
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968"
      );
      setData(response.data.record);
    } catch (error) {
      console.log(error, "data is not fetching");
    }
  };

  const handleAddToOrder = (item) => {
    if (item.available_quantity > 0) {
      addToOrder(item); 

      setData((prevData) =>
        prevData.map((i) =>
          i.id === item.id ? { ...i, available_quantity: i.available_quantity - 1 } : i
        )
      );
    } else {
      alert("out of stock!!!!!!!!!!!!!!!!!..........................");
    }
  };

  return (
    <div style={{border:"2px solid black"}}>
     <center><h1>Order Your Faviourate Dishes</h1></center> 
      <div style={styles.cardContainer}>
        {data.map((item, index) => (
          <div key={index} style={styles.card}>
            <img
              src={item.image_url}
              alt={item.name}
              style={styles.cardImage}
            />
            <div style={styles.cardBody}>
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Sub Category: {item.sub_category}</p>
              <p>Available Quantity: {item.available_quantity}</p>
              <p>Price: ₹ {item.price}</p>
              {item.available_quantity > 0 ? (
                <button
                  onClick={() => handleAddToOrder(item)}
                  style={styles.button}
                >
                  Add to Order
                </button>
              ) : (
                <button style={styles.outOfStock} disabled>
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link to="/order">
      <br />
       <center><button style={styles.button}>Proceed to Order</button></center> 
      </Link>
    </div>
  );
}

export default Datafetching;
