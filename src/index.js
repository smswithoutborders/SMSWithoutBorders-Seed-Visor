import React, { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { SplashScreen } from "components";
import "./styles/index.css";

const App = lazy(() => import("App"));

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById("root")
);
