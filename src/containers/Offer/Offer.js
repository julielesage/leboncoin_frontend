import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OfferVisual from "../../components/OfferVisual.js";
import Seller from "../../components/Seller.js";
import "./style.css";

const Offer = () => {
  const { id } = useParams();

  /* data will now be an object : one offer */

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sellerOffers, setSellerOffers] = useState(6);

  /* we need an axios.get again, just in case someone is coming from directurl and not from Offers*/

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        //here old api url cause no real database
        "https://leboncoin-api.herokuapp.com/api/offer/" + id
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading === true ? (
        <p>En cours de chargement...</p>
      ) : (
        <div className="wrapper">
          <div className="d-flex space-between">
            <div>
              <OfferVisual data={data} />
              <h2>{data.title}</h2>
              <br></br>
              <p>
                <strong>Description : </strong>
              </p>
              <br></br>
              <p>{data.description}</p>
            </div>
            <aside>
              <Seller data={data} nb={sellerOffers} />
            </aside>
          </div>
        </div>
      )}
    </>
  );
};

export default Offer;
