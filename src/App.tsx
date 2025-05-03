import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainHomepage } from "./screens/MainHomepage/MainHomepage";
import BoatProgram from "./screens/ProgramPages/BoatProgram";

import AzureProgram from "./screens/ProgramPages/AzureProgram";
import BlogPost from "./screens/BlogPost/BlogPost";
import Navbar from "./components/Navbar/Navbar";
import SymbolsPage from "./screens/SymbolsPage/SymbolsPage";
import { ArchivesPage } from "./screens/Archives/ArchivesPage";
import { ContributePage } from "./screens/Contribute/ContributePage";
import MapsPage from "./screens/Maps/MapsPage";
import { CoastProgram } from "./screens/Coast/CoastProgram";
import CoastProgramPage from "./screens/ProgramPages/CoastProgram";
import { StoneSection } from "./screens/Coast/Stone/StoneSection";
import { SaltSection } from "./screens/Coast/Salt/SaltSection";
import { CompassSection } from "./screens/Coast/Compass/CompassSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomepage />} />
        <Route path="/programs/boat" element={<BoatProgram />} />
        <Route path="/programs/coast" element={<CoastProgramPage />} />
        <Route path="/programs/azure" element={<AzureProgram />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/symbols" element={<SymbolsPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/maps" element={<MapsPage />} />
        
        {/* Coast Program Routes */}
        <Route path="/coast" element={<CoastProgram />} />
        <Route path="/coast/stone" element={<StoneSection />} />
        <Route path="/coast/salt" element={<SaltSection />} />
        <Route path="/coast/compass" element={<CompassSection />} />
      </Routes>
    </Router>
  );
}

export default App;