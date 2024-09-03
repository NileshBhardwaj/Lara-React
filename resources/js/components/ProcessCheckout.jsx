import React, { useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, token} = await stripe.createToken(cardElement);

    if (error) {
      console.log('[error]', error);
    } else {
      axios.post('/stripe', {token: token.id})
        .then(response => {
          if(response){
            window.location = "/home"
          }
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Confirm
      </button>
    </form>
  );
};

export default CreditCardForm;