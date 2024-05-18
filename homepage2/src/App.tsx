import React from "react";
import { Introduction } from "./components/Introduction";
import "./css/index.scss";
import { Title } from "./components/Title";
import { PersonalSkills } from "./components/PersonalSkills";
import { PersonalAbilities } from "./components/PersonalAbilities";

function App() {
  return (
    <>
      <Title />
      <div className="row">
        <div className="column-1">
          <div className="row">
            <div className="column">
              <PersonalAbilities />
            </div>
          </div>
          <div className="row">
            <div className="column mr-1">
              <PersonalSkills />
            </div>
          </div>
        </div>
        <div className="column-2">
          <div className="row">
            <div className="column">
              <Introduction />
            </div>
          </div>
          <hr />
        </div>
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
