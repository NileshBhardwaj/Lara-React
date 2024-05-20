import React, { useState } from "react";

const Checkout = () => {
    const [collapseOne, setCollapseOne] = useState(true);
    const [collapseTwo, setCollapseTwo] = useState(false);

    return (
        <div className="container d-flex justify-content-center mt-5 mb-5">
            <div className="row g-3">
                <div className="col-md-61">
                    <span style={{fontSize:"21px" , marginLeft:"130px"}}><strong>Payment Method</strong></span>
                    <div className="card">
                        <div className="accordion" id="accordionExample">
                            {collapseTwo && (
                                <div className="card-body">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Paypal email"
                                    />
                                </div>
                            )}
                        </div>
                        {collapseOne && (
                            <div className="card-body payment-card-body">
                                <span className="font-weight-normal card-text">
                                   <strong> Card Number</strong>
                                </span>
                                <div className="input">
                                    <i className="fa fa-credit-card"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="0000 0000 0000 0000"
                                    />
                                </div>
                                <div className="row mt-3 mb-3">
                                    <div className="col-md-6">
                                        <span className="font-weight-normal card-text">
                                           <strong> Expiry Date</strong>
                                        </span>
                                        <div className="input">
                                            <i className="fa fa-calendar"></i>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="font-weight-normal card-text">
                                          <strong>  CVC/CVV</strong>
                                        </span>
                                        <div className="input">
                                            <i className="fa fa-lock"></i>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="CVC/CVV"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button>Pay Now</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
