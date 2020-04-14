import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

const CheckoutForm = ({ stripe, title, productId, price, username }) => {
  const [complete, setComplete] = useState(false);

  const submit = async () => {
    //send CB to Stripe
    const stripeResponse = await stripe.createToken({
      name: username,
    });
    if (stripeResponse.error) alert(stripe.error.message);
    else {
      //send token to backend
      const response = await axios.post(
        "https://leboncoin-de-julie.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          amount: price * 100,
          productId: productId,
          title: title,
        }
      );

      if (response.status === 200) setComplete(true);
      else {
        alert("an error occured");
        console.error(response);
      }
    }
  };

  return !complete ? (
    <div className="checkout centered column">
      <p className="bold">Vos coordonnées bancaires: </p>

      <CardElement />

      <div className="centered">
        <button
          className="publish-btn"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  ) : (
    <div className="centered space-between">
      <img
        alt="yeah"
        className="yeah"
        src="https://media1.giphy.com/media/JpG2A9P3dPHXaTYrwu/giphy.gif?cid=790b76118a2a8cf4057319b373bb60085c7e287217f5446f&rid=giphy.gif"
      />
      <div className="centered congrats aligned">
        <h3>
          Félicitations, votre achat a bien été effectué ! <br />
          Nous vous remercions.{" "}
        </h3>
      </div>
    </div>
  );
};

export default injectStripe(CheckoutForm);
