import React from "react";
import Moment from "react-moment";

const OfferVisual = (props) => {
  return (
    <div className="square">
      <div className="square-img">
        <img
          alt={props.data.title}
          className="big-picture"
          src={props.data.pictures[0]}
        />
      </div>
      <div className="d-flex column space-between pad25">
        <div>
          <h2>{props.data.title}</h2>
          {props.data.price && <h3>{props.data.price} €</h3>}
        </div>
        <p>
          <Moment format="DD/MM/YY à HH:mm">{props.data.created}</Moment>
        </p>
      </div>
    </div>
  );
};

export default OfferVisual;
