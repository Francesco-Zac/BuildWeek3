import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <MainSection />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default App;
