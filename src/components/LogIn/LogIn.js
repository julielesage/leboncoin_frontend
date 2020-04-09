import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogIn = ({ onLogin, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* SOUMETTRE ************************/

  const submit = async () => {
    try {
      // sending login to API
      const response = await axios.post(
        "https://leboncoin-de-julie.herokuapp.com/user/log_in",
        // = {password : password, username : username } :

        {
          email,
          password,
        }
      );

      if (response.data.token && response.data.account.username) {
        const token = response.data.token;
        const username = response.data.account.username;
        onLogin(token, username);

        // back to offers
        setShowModal(false);
      } else {
        alert("token or username is missing");
      }
    } catch (e) {
      alert("Identifiants Incorrects");
    }
  };

  return (
    <div className="d-flex centered wrapper">
      <form
        className="connect-form bg-white d-flex column"
        onSubmit={async (event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="end exit">
          {/* switch modal hidden/not hidden */}
          <FontAwesomeIcon
            icon={["far", "times-circle"]}
            size="2x"
            className="red cursor"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          />
        </div>
        {/* CONTENU DU FORMULAIRE */}
        <h1 className="d-flex centered">Connexion</h1>
        <div className="separator"></div>
        <strong className="lh30">Adresse email</strong>
        <input
          type="email"
          value={email}
          className="form-input"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br></br>
        <strong className="lh30">Mot de passe</strong>
        <input
          type="password"
          className="form-input"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" className="btn-connect white fs-20 bold">
          Se connecter
        </button>
        <div className="line"></div>
        <strong className="centered-text pad25">
          Vous n'avez pas de compte ?
        </strong>
        <Link to="/sign_up" className="create-account d-flex centered aligned">
          Créer un compte
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
