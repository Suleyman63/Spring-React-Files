import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadFiles from "./components/UploadFiles";

function App() {
  return (
    <div className="container">
      <div style={{ margin: "30px" }}>
        <h4>Upload Files</h4>
      </div>
      <UploadFiles />
    </div>
  );
}
export default App;
