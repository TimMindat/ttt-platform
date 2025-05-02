import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainHomepage } from "./screens/MainHomepage/MainHomepage";
import BoatProgram from "./screens/ProgramPages/BoatProgram";
import CoastProgram from "./screens/ProgramPages/CoastProgram";
import AzureProgram from "./screens/ProgramPages/AzureProgram";
import BlogPost from "./screens/BlogPost/BlogPost";
import Navbar from "./components/Navbar/Navbar";
import SymbolsPage from "./screens/SymbolsPage/SymbolsPage";
import { ArchivesPage } from "./screens/Archives/ArchivesPage";
import { ContributePage } from "./screens/Contribute/ContributePage";
import MapsPage from "./screens/Maps/MapsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomepage />} />
        <Route path="/programs/boat" element={<BoatProgram />} />
        <Route path="/programs/coast" element={<CoastProgram />} />
        <Route path="/programs/azure" element={<AzureProgram />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/symbols" element={<SymbolsPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/maps" element={<MapsPage />} />
      </Routes>
    </Router>
  );
}

export default App;