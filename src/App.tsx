import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainHomepage } from "./screens/MainHomepage/MainHomepage";
import BoatProgram from "./screens/ProgramPages/BoatProgram";
import CoastProgram from "./screens/ProgramPages/CoastProgram";
import AzureProgram from "./screens/ProgramPages/AzureProgram";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomepage />} />
        <Route path="/programs/boat" element={<BoatProgram />} />
        <Route path="/programs/coast" element={<CoastProgram />} />
        <Route path="/programs/azure" element={<AzureProgram />} />
      </Routes>
    </Router>
  );
}

export default App;