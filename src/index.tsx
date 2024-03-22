import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { redirectToWWW } from "utils/RedirectToWWW";
import reportWebVitals from "./reportWebVitals";
import App from "App";
import Providers from "Providers";
import "assets/scss/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

redirectToWWW();

root.render(
  <>
    <Router>
      <Suspense fallback={null}>
        <Providers>
          <App />
        </Providers>
      </Suspense>
    </Router>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
