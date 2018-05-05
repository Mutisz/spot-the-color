import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer, { initialState } from "./reducers";
import App from "./components/App";
import "./palette.css";
import "./index.css";

const rootReducerPersisted = persistReducer(
  { key: "spotTheColor", storage },
  rootReducer
);
const store = createStore(rootReducerPersisted, initialState);
const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
