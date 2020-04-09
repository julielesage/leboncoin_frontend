import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Offers from "./containers/Offers/Offers";
import Offer from "./containers/Offer/Offer";
import LogIn from "./containers/LogIn/LogIn";
import SignUp from "./containers/SignUp/SignUp";
import Publish from "./containers/Publish/Publish";
import Payment from "./containers/Payment/Payment";

import "./components/css/reset.css";
import "./App.css";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faClock,
  faPlusSquare,
  faEye,
  faBell,
} from "@fortawesome/free-regular-svg-icons";
library.add(faSearch, faPlusSquare, faUser, faCartPlus, faClock, faEye, faBell);

/* get API from Heroku ****************/

function App() {
  // is User connected ?
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");

  const onLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    Cookies.set("token", token);
    Cookies.set("username", username);
  };

  return (
    <Router>
      <Header setToken={setToken} token={token} username={username} />
      <div className="window">
        <Switch>
          <Route exact path="/">
            <Offers />
          </Route>
          <Route path="/publish">
            <Publish />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/sign_up">
            <SignUp onLogin={onLogin} />
          </Route>
          <Route path="/log_in">
            <LogIn onLogin={onLogin} />
          </Route>
          <Route path="/payment">
            <Payment username={username} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
