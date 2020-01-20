import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import "./config/ReactotronConfig";
import history from "./services/history";
import { store, persistor } from "./store";
import Routes from "./routes";
import GlobalStyle from "./styles/global";

function App() {
  useEffect(() => {
    document.title = "Sistema de convênios AFMI";
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
