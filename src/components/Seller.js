import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Seller = (props) => {
  return (
    <div className="selling">
      <div>
        <h2>{props.data.creator.account.username}</h2>
        {/* would need another info in back route "users" getting all offers from 1 seller */}
        <p className="extra-bold is-blue">{props.nb} annonces en ligne</p>
      </div>

      <div className="border-top">
        <button>
          <FontAwesomeIcon
            className="icon-cart-plus"
            icon={["fas", "cart-plus"]}
          />{" "}
          Acheter
        </button>
      </div>
    </div>
  );
};

export default Seller;
