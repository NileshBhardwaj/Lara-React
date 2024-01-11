import React, { useState,useEffect } from "react";
import axios from 'axios';

function Payment()
{
    const url = "/payment-data";
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");

    const fetchInfo = () => {
        return axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    };
    console.log(data)
    useEffect(() => {

        fetchInfo();
    }, []);
    return(
        <>
        <div>
        <h1>Payments Details</h1>
    </div>

    <div className="p-6 text-gray-900 dark:text-gray-100">
        <div id="responseContainer">
            
            {/* {message && (
                <div className="alert alert-success">
                    <strong>Success!</strong> {message}
                </div>
            )} */}
            <table id="responseContainer">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        {/* <th>Product ID</th> */}
                        <th>Payer Name</th>
                        <th>Email</th>
                        <th>Paypal ID</th>
                        <th>Transaction ID</th>
                        <th>Date</th>

                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            {/* <td>{index + 1}.</td> */}
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>

                            <td>{item.account_id}</td>
                            <td>{item.payment_id}</td>
                            <td>{item.date}</td>

                            <td>{"Completed"}</td>
                            <td>${item.price}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
    );
}
export default Payment;