import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css";
import store, { persistor } from "./store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ced4da",
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
