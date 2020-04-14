import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./style.css";
// import { Redirect } from "react-router-dom";

const Publish = ({ token, onLogin, setShowModal, showModal }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState({});

  const submit = async () => {
    const formData = new FormData();
    // formData allows to include files
    formData.append("title", title);
    formData.append("file", file);
    formData.append("description", details);
    formData.append("price", price);

    const response = await Axios.post(
      "https://leboncoin-de-julie.herokuapp.com/offer/upload",
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/ form-data",
        },
      }
    );

    history.push("/offer/" + response.data[0]._id);
  };
  if (!token) setShowModal(true);

  if (showModal === false) {
    return (
      <div className="centered">
        <form
          className="publish-form column"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          {/* CONTENU DU FORMULAIRE */}
          <h1 className="centered">Déposer une annonce</h1>
          <div className="separator"></div>
          <div className="frame column">
            <strong className="lh30">Titre de l'annonce *</strong>
            <input
              type="text"
              value={title}
              placeholder="Titre"
              className="input-publish-title"
              onChange={(event) => {
                event.preventDefault();
                setTitle(event.target.value);
              }}
            />
            <br />
            <strong className="lh30">Texte de l'annonce *</strong>
            <textarea
              type="text"
              className="input-publish-details"
              value={details}
              placeholder="Description"
              onChange={(event) => {
                event.preventDefault();
                setDetails(event.target.value);
              }}
            />
            <br />
            <strong className="lh30">Prix *</strong>
            <div className="d-flex aligned">
              {/* type number pour le prix c 'est mieux ...' */}
              <input
                type="number"
                className="input-publish-price"
                value={price}
                onChange={(event) => {
                  event.preventDefault();
                  setPrice(event.target.value);
                }}
              />
              <span>€</span>
            </div>
            <strong className="lh30">Photo *</strong>
            <input
              type="file"
              // no original value for files
              onChange={(event) => {
                event.preventDefault();
                setFile(event.target.files[0]);
              }}
            />

            <button type="submit" className="btn-connect white fs-20 bold">
              Valider
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      // or return <Redirect to="/log_in" />;
      <div></div>
      // <div className="modal">
      //   <div className="centered aligned">
      //     <LogIn onLogin={onLogin} setShowModal={setShowModal} />
      //   </div>
      // </div>
    );
  }
};

export default Publish;
