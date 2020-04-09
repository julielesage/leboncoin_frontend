import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

const SignUp = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordbis, setPasswordbis] = useState("");
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  // METHODE ARTHUR
  // const fieldIsEmpty =
  //   userName === '' || email === '' || password === '' || passwordbis === '';
  // dans le onSubmit : if (fieldIsEmpty) {setErrorMessage("fill all the fields");

  const submit = async () => {
    // regex on username allow to avoid special characters, to count letters, allow from a to z and from 0 to 9, including - and _, for a total between 3 and 15 characters :
    const result = username.match(/^[a-z0-9_-]{3,15}$/);
    if (result === null) {
      setErrorMessage(
        "Pseudo non valide, n'utiliser que des lettres et des chiffres, entre 3 et 15 caractères"
      );
    } else if (password !== passwordbis) {
      setErrorMessage("Mot de passe non confirmé");
    } else if (!acceptConditions) {
      setErrorMessage("Veuillez accepter les conditions CGU/CGV");
    } else if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordbis === ""
    )
      setErrorMessage("Merci de remplir tous les champs avec *");
    else {
      try {
        //call post API
        const response = await Axios.post(
          "https://leboncoin-de-julie.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            password: password,
          }
        );
        console.log("data ==>", response.data);
        //register token and username in App.js states and in Cookies
        onLogin(response.data.token, response.data.account.username);

        //back to "offers"
        // history.push("/");
      } catch (error) {
        alert("an error occured");
        console.log("error.message = ", error.message);
      }
    }
  };

  return (
    <div className="d-flex centered">
      <section className="form d-flex space-between">
        <div className="left-info">
          <p className="mb40">
            <strong>Pourquoi créer un compte ?</strong>
          </p>
          <br></br>
          <br></br>
          <ul className="d-flex column">
            <li className="d-flex mb40">
              <div className="icon-cube">
                <FontAwesomeIcon className="sub-icon" icon={["far", "clock"]} />
              </div>
              <div>
                <p className="bold mb15">Gagnez du temps</p>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </li>
            <li className="d-flex mb40">
              <div className="icon-cube">
                <FontAwesomeIcon className="sub-icon" icon={["far", "eye"]} />
              </div>
              <div>
                <p className="bold mb15">Soyez les premiers informés</p>
                <p>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l’annonce qui vous intéresse.
                </p>
              </div>
            </li>
            <li className="d-flex">
              <div className="icon-cube d-flex center">
                <FontAwesomeIcon className="sub-icon" icon={["far", "bell"]} />
              </div>

              <div>
                <p className="bold mb15">Soyez visibles</p>
                <p>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus).
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="right-subscribe d-flex column">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              submit();
            }}
          >
            <h1 className="d-flex centered">Créez votre compte</h1>
            <div className="signup-separator"></div>
            <p>
              <strong className="lh30 fs-12">Pseudo *</strong>
            </p>
            <input
              type="text"
              value={username}
              className="signup-input fs-20"
              onChange={(event) => {
                event.preventDefault();
                setUsername(event.target.value);
              }}
            />
            <br></br>
            <p>
              <strong className="lh30 fs-12">Adresse email *</strong>
            </p>
            <input
              type="email"
              value={email}
              className="signup-input fs-20"
              onChange={(event) => {
                event.preventDefault();
                setEmail(event.target.value);
              }}
            />
            <br></br>
            <div className="d-flex space-between mb40">
              <div className="d-flex column">
                <strong className="lh30 fs-12">Mot de passe *</strong>
                <input
                  type="password"
                  className="signup-midinput fs-20"
                  value={password}
                  onChange={(event) => {
                    event.preventDefault();
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div className="d-flex column">
                <strong className="lh30 fs-12">
                  Confirmez le mot de passe *
                </strong>
                <input
                  type="password"
                  className="signup-midinput fs-20"
                  value={passwordbis}
                  onChange={(event) => {
                    event.preventDefault();
                    setPasswordbis(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="d-flex aligned">
              <input
                name="CGV-CGU"
                className="signup-check"
                // pour insérer des cases à cocher:
                type="checkbox"
                value={acceptConditions}
                onChange={(event) => {
                  event.preventDefault();
                  setAcceptConditions(event.target.checked);
                }}
              />

              {/* aaaaaaaaaah les {" "} ce sont des espaces ! = &nbsp; */}
              <label className="cgu-cgv">
                « J’accepte les{" "}
                <Link to="#" className="is-blue">
                  <b>Conditions Générales de Vente</b>
                </Link>{" "}
                et les{" "}
                <Link to="#" className="is-blue">
                  <b>Conditions Générales d’Utilisation</b>
                </Link>{" "}
                »
              </label>
            </div>
            <span className="error-message is-16">{errorMessage}</span>
            <button type="submit" className="btn-signup white fs-20 bold">
              Se connecter
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
