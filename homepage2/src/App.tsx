import React from "react";
import { Introduction } from "./components/Introduction";
import { PersonalStatus } from "./components/PersonalStatus";
import { StatusBar } from "./components/StatusBar";
import "./css/index.scss";

function App() {
  return (
    <>
      <h1>
        Fendy Heryanto
        <hr />
      </h1>
      <div className="row">
        <Introduction />
      </div>
      <div className="row">
        <PersonalStatus />
        <div className="row"></div>
      </div>
      <div style={{ width: "200px", marginLeft: "32px" }}></div>
      <hr />
      <div style={{ padding: "14px" }}>
        <button className="btn primary" type="button">
          Submit
        </button>
        <button className="btn secondary" type="button">
          Cancel
        </button>
      </div>
    </>
  );
}

export default App;
