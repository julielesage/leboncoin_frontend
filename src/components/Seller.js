import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Seller = ({ data, nb }) => {
  const history = useHistory();

  return (
    <div className="selling">
      <div>
        <h2>{data.creator.account.username}</h2>
        {/* would need another info in back route "users" getting all offers from 1 seller */}
        <p className="extra-bold is-blue">{nb} annonces en ligne</p>
      </div>

      <div className="border-top">
        <button
          onClick={(event) => {
            event.preventDefault();
            history.push("/payment", {
              productId: data._id,
              img: data.pictures[0].url,
              title: data.title,
              price: data.price,
            });
          }}
        >
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
