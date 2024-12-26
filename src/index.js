import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../src/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
