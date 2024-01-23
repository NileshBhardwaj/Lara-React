import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from 'axios';


const stripePromise = loadStripe('pk_test_51OZ8bOA8ttpkva0VcMDiMRgZ19UbgNtFydyW40M7llfTnSJwjgH53MPn19E1CaQdtW8ivMkd9P1VXNidX3SjM822008nTPk8I6');

		const urlParams = new URLSearchParams(window.location.search);
		    const id = urlParams.get('price');
		    console.log(id);
  
    
const CreditCardForm = () => {

    
    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
      });
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, token} = await stripe.createToken(cardElement);

    if (error) {
      console.log('[error]', error);
    } else {
      axios.post('/stripe', {token: token.id, cardDetails: state, price:id})
        .then(response => {
          if(response){
            window.location = "/thankyou"
          }
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  };
  const customCardElementOptions = {
    style: {
      base: {
        fontSize: '17px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  const appearance = {
    theme: 'stripe'
  };
  

  return (
    <>
      <div className="main-container">
        <div className="child-container">
          <div>
            
            <div className="mt-3">
                <h1>Card Payment</h1>
                <h6>Please Fill your details</h6>
                
              <form onSubmit={handleSubmit}>
              <CardElement options={customCardElementOptions} />
             
                <div className="d-grid"> 
                  <button type="submit" className="btn btn-primary" style={{marginTop: "1em"}}>
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardForm />
    </Elements>
  );
};

export default Checkout;