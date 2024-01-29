import React, { useEffect, useState, useRef } from "react";
import "./orderTracking.css";
import axios from "axios";
import tru from "./trucklogo.png";

const OrderTracking = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://myapp-e668e-default-rtdb.firebaseio.com/ordersData.json")
            .then(response => {
                const x = Object.values(response.data)
                setData(x);
            })
    }, []);

    const [inputValue, setInputValue] = useState('');
    const [foundData, setFoundData] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const [isBlockVisible, setBlockVisibility] = useState(false);
    const handleButtonClick = () => {
        setBlockVisibility(!isBlockVisible);
        let foundData = null;
        for (let i = 0; i < data.length; i++) {
            if (data[i].orderid === inputValue && data[i].email===input1) {
                foundData = data[i];
                break;
            } 
        }
        setFoundData(foundData);
        if(foundData){
            setTimeout(() => {
                if (foundData.Delivered === "Yes") {
                    setProgress(100);
                } else if (foundData.OutForDelivery === "Yes") {
                    setProgress(75);
                } else if (foundData.dispatched === "Yes") {
                    setProgress(50);
                } else if (foundData.orderid !== null) {
                    setProgress(25);
                }
            }, 0);
        }
        
    };

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [isBlock1Visible, setBlock1Visibility] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const handleInput1Change = (e) => {
        setInput1(e.target.value);
    };

    const handleInput2Change = (e) => {
        setInput2(e.target.value);
    };

    const handleLogin = () => {
        let invalidCredentials = false;
        for (let i = 0; i < data.length; i++){
            if(data[i].email===input1){
                if(data[i].pass===input2){
                    invalidCredentials = true;
                    alert("Login Successful!")
                    setBlock1Visibility(!isBlock1Visible);
                    showLoginNotification();
                    break;
                }
            }
        }
        setInvalidCredentials(!invalidCredentials);
    }

    const handleClose = () => {
        setBlockVisibility(false);
    }

    const formRef = useRef(null);

    const handleLogout = () => {
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        setBlock1Visibility(false);
        if (isConfirmed) {
            showLogoutNotification();
        }
        formRef.current.reset();
    };
    
    const showLogoutNotification = () => {
        const notification = document.createElement("div");
        notification.className = "logout-notification";
        notification.textContent = "You've been logged out!";
    
        document.body.appendChild(notification);
    
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 5000);
    };

    const showLoginNotification = () => {
        const notification = document.createElement("div");
        notification.className = "login-notification";
        notification.textContent = "You're now loggin in!";
        document.body.appendChild(notification);
    
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 5000);
    }
     
    return (
        <div>
            <center><h1 className="thead1">Product Delivery</h1></center><br/>
            <hr />
            <img className="truckM" src={tru} alt="truck"/>
            <img className="back" src="https://assets.about.me/background/users/c/o/u/courierservice1681381032_1681381326_418.jpg" alt="Delivery"/>
            <img className="truck" src="https://img.freepik.com/free-vector/loading-workman-carrying-boxes_74855-14096.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699660800&semt=ais" alt="Truck"/>
            <img className="blk" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCs-dTR22SZH1V_JejqGVAoZOf1lBxZkyPWQ&usqp=CAU" alt="img"/>
            <center>
                <h1 className="thead">Order<span>Tracking</span></h1>
                <hr /><br /><br/>
                <div className="valid">
                    <h2>Login</h2><br/>
                    <form ref={formRef}>
                        <input className="myInput" type="email" name="email" placeholder="XXXXXX@gmail.com" onChange={handleInput1Change} required /><br /><br />
                        <input className="myInput" type="password" name="pw" placeholder="password" onChange={handleInput2Change} required /><br /><br />
                        <input className="myButton" type="button" value="login" onClick={handleLogin} />
                    </form>
                </div>
                {isBlock1Visible && (
                <div className="trackD">
                    <p className="as">To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                    <input className="myInput" type="text" name="id" placeholder="Order ID" onChange={handleInputChange} /><br /><br />
                    <input className="myB" type="button" value="Track" onClick={handleButtonClick} />
                    <img onClick={handleLogout} className="closeB" src="https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-vector-logout-icon-png-image_997172.jpg" alt="Logout"/>
                </div>
                )}
                {invalidCredentials && (
                    <div className="inv">
                        <h3>Invalid credentials. Please enter valid email and password.</h3>
                    </div>
                )}
                {isBlockVisible && (
                    <div>
                        {foundData && (
                            <div className="cont">
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Order ID: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.orderid}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Name: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.name}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Product: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.product}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Order Date: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.orderdate}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Address: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.address}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Payment: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.payment}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Expected Delivery: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.expectedDelivery}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Out For Delivery: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.OutForDelivery}</span></p>
                                <p className="pos" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Delivered: <span style={{ fontWeight: 'lighter', fontSize: '1em' }}>{foundData.Delivered}</span></p>
                                <div>
                                    <div className="progress-bar">
                                        <div className="fill" style={{ height: `${progress}%` }}></div>
                                    </div>
                                </div>
                                <div className="progress-bar1">
                                    <ul>
                                        <li className="pos11"></li>
                                        <li className="pos12"></li>
                                        <li className="pos13"></li>
                                        <li className="pos14"></li>
                                        <li className="pos15"></li>
                                    </ul>
                                    <h5 className="pos1">Order Placed</h5>
                                    <h5 className="pos2">Order Confirmed</h5>
                                    <h5 className="pos3">Dispatched</h5>
                                    <h5 className="pos4">Out For Delivery</h5>
                                    <h5 className="pos5">Delivered</h5>
                                </div>
                                <img onClick={handleClose} className="closeB" src="https://cdn-icons-png.flaticon.com/512/149/149690.png" alt="close"/>
                            </div>
                        )}
                        {!foundData && (
                            <h3 className="invD">Invalid credentials. Please enter valid ORDER ID.</h3>
                        )}
                    </div>
                )}
            </center>
        </div>
    )
}

export default OrderTracking;