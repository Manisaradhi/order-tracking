import React, {useState} from "react";
import axios from "axios";

const OrderDetails = () => {
    const [data] = useState({
        "OutForDelivery": "Yes",
  "Delivered": "No",
  "address": "12AB+3CD, Birch Lane, Vancouver, BC V6B 1A1",
  "dispatched": "Yes",
  "email": "dylan.smith@email.com",
  "expectedDelivery": "2023-12-04",
  "mno": "604-555-6789",
  "name": "Dylan Smith",
  "orderdate": "2023-11-30",
  "orderid": "UVW-567890-234",
  "pass": "smith2024",
  "payment": "MasterCard",
  "product": "Smart Lock",
  "total": "99.99"
      })
      const handleSubmit = e => {
        e.preventDefault();    
        axios.post('https://myapp-e668e-default-rtdb.firebaseio.com/ordersData.json', data)
       .then(() => alert("data submitted successfuly"))    
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="submit" /> 
            </form>
       </div>
    )
}

export default OrderDetails;