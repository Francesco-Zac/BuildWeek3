import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar";
import JobsPage from "./pages/Jobs.jsx";
import Home from "./pages/Home";

import "./App.css";
import JobsPage from "./pages/Jobs.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<MainSection />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </div>
      <div className="d-none">
        <Sidebar></Sidebar>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
