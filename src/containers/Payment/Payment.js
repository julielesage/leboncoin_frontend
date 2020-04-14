import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import Cookies from "js-cookie";

import CheckoutForm from "../../components/CheckoutForm.js";
import "./style.css";

const Payment = ({ setShowModal, showModal, setProductId }) => {
  const location = useLocation();
  let { img, title, price, productId } = location.state;
  const token = Cookies.get("token");
  const username = Cookies.get("username");

  if (!token) {
    setShowModal(true);
    setProductId(productId);
  }

  return showModal === false ? (
    <div className="centered">
      <StripeProvider apiKey="pk_test_lKzpPkN8Dkjdq6UNvNwLTtnP00lU1DUg6h">
        <div className="payment column">
          <h3 className="centered">Acheter en ligne</h3>
          <div className="space-between column">
            <div className="column centered">
              <img src={img} className="pay-img" alt={title} />
              <Link to={"/offer/" + productId} className="centered">
                <h2>{title}</h2>
              </Link>

              <h3 className="centered">{price} €</h3>
            </div>
            <Elements>
              <CheckoutForm
                username={username}
                productId={productId}
                title={title}
                price={price}
              />
            </Elements>
          </div>
        </div>
      </StripeProvider>
    </div>
  ) : (
    //if LogIn is a container and not a modal :
    // import {Redirect} from "react-router-dom";
    // <Redirect to="/log_in" />
    <div></div>
  );
};

export default Payment;
