import React, { useState } from "react";
import { Link } from "react-router-dom";
function Orderpage({ order }) {
  const [tablenumber, settablenumber] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

  const orderplacing = () => {
    const menudetails = {
      tablenumber,
      contactnumber,
      date,
      time,
      orderitems: order,
    };
    saveorder(menudetails);
    clearorder();
    alert("order sucessfully assigned");
  };

  return (
    <div>
      <h1>order view</h1>
      {order.length === 0 ? (
        <p>No items are in there in the cart</p>
      ) : (
        <table>
          <thead>
        
            
          </thead>
        </table>


      )}
    </div>
  );
}
