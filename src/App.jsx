import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar";
import JobsPage from "./pages/Jobs.jsx";
import Home from "./pages/Home";
import LoadingPage from "./components/LoadingPage.jsx";

import "./App.css";
import ProfileFriend from "./pages/ProfileFriend.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un caricamento iniziale
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<MainSection />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/profileFriend/:userID" element={<ProfileFriend />} />
        </Routes>
      </div>
      <div className="d-none">
        <Sidebar />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
