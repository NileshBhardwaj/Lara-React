import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function Cart() {
    const url = "/fetch_cart";
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        return axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    };
 
    const remove_Cart = (productId) => {
        axios.post('/remove_Cart', {
            productId: productId,
            
        })
        .then(function (response) {
            // console.log(response);
            fetchInfo();
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    useEffect(() => {
        fetchInfo();
    }, []);

    const increase_quantity = (productId) => {
        axios.post('/increase_quantity',{
            productId:productId,
        })
        .then(function(response){
            console.log(response);
            fetchInfo();
        })
        .catch(function(error){
            console.log(error);
        });
    };

    const decrease_quantity = (productId,quantity) => {
        axios.post('/decrease_quantity',{
            productId:productId,
            quantity:quantity,
        })
        .then(function(response){
            console.log(response);
            fetchInfo();
        })
        .catch(function(error){
            console.log(error);
        })
    };
    const totalPrice = data.reduce((total, item) => total + item.price * item.quantity, 0);

    const checkout = () =>
    {
        axios.post('/paypal/payment',{
            totalPrice:totalPrice,
            
        })
        .then(function(response){
            console.log(response);
            const data = response.data;
            console.log(data);
            if (response.data.message == "success") {
                window.location = response.data.location
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }
    // console.log(totalPrice);
    return (
        <>
        <div>
            {data.length === 0 ? (
               <div class="container-fluid  mt-100">
               <div class="row">
               
                  <div class="col-md-12">
                  
                          <div class="card">
                      <div class="card-header">
                      <h5><strong id="strong">Your Cart is Empty</strong></h5>
                      </div>
                      <div class="card-body cart">
                              <div class="col-sm-12 empty-cart-cls text-center">
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk6Ubpa9OEc59FINKmZv9B-QXCmkVKEBf8wSFNDneLmQ&s" width="130" height="130" class="img-fluid mb-4 mr-3"/>
                                  <h3><strong>Your Cart is Empty</strong></h3>
                                  
                                  <a href="#" class="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</a>
                                  
                              
                              </div>
                      </div>
              </div>
                      
                  
                  </div>
               
               </div>
              
              </div>
            ) : (
                <div>
            <section
                className="vh"
                style={{ backgroundColor: "#979aff30" }}
            >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <p>
                                <span className="h2">Shopping Cart </span>
                               
                            </p>
                            {data.map((dataObj, index) => (
                                <div className="card mb-4">
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-2">
                                                <img
                                                    src={`/images/${dataObj.image}`}            className="img-fluid"
                                                    alt="Generic placeholder image"
                                                />
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">
                                                        <strong> Name</strong>
                                                       
                                                    </p>
                                                    <p className="lead fw-normal mb-0">
                                                        <strong>{dataObj.name}</strong>
                                                    </p>
                                                    <span className="h4"style={{display:"none"}}>{dataObj.product_id}</span>
                                                </div>
                                            </div>

                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">
                                                        <strong>Quantity</strong>
                                                    </p>
                                                    <p className="lead fw-normal mb-0">
                                                       <strong> {dataObj.quantity}</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">
                                                        <strong>Price</strong>
                                                    </p>
                                                    <p className="lead fw-normal mb-0">
                                                       <strong> {dataObj.quantity}</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted mb-4 pb-2">
                                                        <strong>Total</strong>
                                                    </p>
                                                    <p className="lead fw-normal mb-0">
                                                       <strong> ${dataObj.quantity*dataObj.price}</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <div>
                                                <button id="add" onClick={() => increase_quantity(dataObj.product_id)}><FontAwesomeIcon icon={faPlus} /></button>
                                                <button id="decrease" onClick={() => decrease_quantity(dataObj.product_id,dataObj.quantity)}><FontAwesomeIcon icon={faMinus} /></button>
                                                </div>
                                            </div>
                                            <div  id ="remove-div"className="col-md-2 d-flex justify-content-center" style={{marginleft:"1062px"}}>
                                                <div>
                                                <button id="remove" onClick={() => remove_Cart(dataObj.product_id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="card mb-5">
                                <div className="card-body p-4">
                                    <div className="float-end">
                                        <p className="mb-0 me-5 d-flex align-items-center">
                                            <span className="small text-muted me-2">
                                               <strong> Order total:</strong>
                                            </span>{" "}
                                            <span className="lead fw-normal">
                                           <strong> ${totalPrice.toFixed(2)}</strong>
                                            </span>
                                        </p>
                                        <button onClick={() => checkout()}
                                    type="button"
                                    className="btn btn-primary btn-lg">

                                   <strong>Pay Now</strong>
                                </button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                               
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
            )}
        </div>
        
        </>
    );
}

export default Cart;
