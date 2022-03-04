import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import counterReducer, { increment } from "./store/slices/counter";

import PluginManager from "./core/Plugins/PluginManager";
import init from "./core/GraphEditor/editor";
import "./styles.css";

import store from "./store/store";
import "./plugins/todos";
import "./plugins/blogs";

function App() {
  console.log({ PluginManager }); //
  return (
    <Provider store={store}>
      <div className="App">
        <button
          onClick={() => {
            store.injectReducer("counter", counterReducer);
            store.dispatch(increment());
          }}
        >
          Add Reducer
        </button>
        <div>
          <h2>Plugins</h2>
          {Array.from(PluginManager.plugins).map(([key, p]) => (
            <p>{key}</p>
          ))}
        </div>
        <div style={{ textAlign: "left", width: "100vw", height: "100vh" }}>
          <div ref={(el) => init(el, PluginManager)} />
        </div>
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
