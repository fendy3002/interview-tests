import React from "react";
import { Introduction } from "./components/Introduction";
import "./css/index.scss";
import { Title } from "./components/Title";
import { PersonalSkills } from "./components/PersonalSkills";
import { PersonalAbilities } from "./components/PersonalAbilities";
import { WorkExperience } from "./components/WorkExperience";
import { Education } from "./components/Education";

function App() {
  return (
    <>
      <Title />
      <div className="row">
        <div className="column-1 mr-1">
          <div className="row">
            <div className="column">
              <PersonalAbilities />
            </div>
          </div>
          <div className="row">
            <div className="column mr-2">
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
          <div className="row">
            <div className="column">
              <WorkExperience />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Education />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "200px", marginLeft: "32px" }}></div>
      <hr />
      <div
        style={{ minHeight: "1px", marginTop: "16px", marginBottom: "16px" }}
      ></div>
    </>
  );
}

export default App;
