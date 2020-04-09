import React from "react";
// to change date format : npm install --save moment react-moment
import Moment from "react-moment";
import { Link } from "react-router-dom";

// works too with following : npm install moment
// const moment = require("moment");
// require("moment/locale/fr");
// moment.locale();

const Offer = ({
  pictures,
  _id,
  title,
  description,
  price,
  creator,
  created,
}) => {
  return (
    <Link to={"/Offer/" + _id}>
      <li className="d-flex" key={_id}>
        <div className="grey-img">
          <img className="product-img" alt={description} src={pictures[0]} />
        </div>
        <div className="d-flex column space-between">
          <div>
            <h2>{title}</h2>
            {price && <h3>{price} €</h3>}
          </div>
          <p>
            <Moment format="DD/MM/YYYY à HH:mm">{created}</Moment>
          </p>
        </div>
      </li>
    </Link>
  );
};

export default Offer;
