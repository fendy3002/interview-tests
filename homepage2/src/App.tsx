import React from "react";
import { StatusBar } from "./components/StatusBar";
import "./css/index.scss";

function App() {
  return (
    <>
      <div style={{ display: "flex", height: "30px", lineHeight: "30px" }}>
        <div>Status:</div>
        <StatusBar point={3} />
      </div>
      <div>
        <button className="btn primary">Submit</button>
      </div>
    </>
  );
}

export default App;
