import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import "./styles/reset.scss";
import "./styles/global.scss";

import reportWebVitals from "./reportWebVitals";


import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
library.add(fasStar, faStarHalfAlt);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
