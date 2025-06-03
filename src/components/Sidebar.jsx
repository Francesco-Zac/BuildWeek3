import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Col, Container, Row } from "react-bootstrap";

const Sidebar = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //use params con react router
  const API_BASE = "https://striveschool-api.herokuapp.com/api/profile";
  const TOKEN =
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzljZTFjMjUwNDAwMTUxYWI2NGUiLCJpYXQiOjE3NDg5NDUzNTYsImV4cCI6MTc1MDE1NDk1Nn0.nu6nlNSP9jzD2zdfF4NSXWlUy5LILhJiw9Cul_lI3Ls";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const profileData = await response.json();
      setProfile(profileData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="main-section">
        <div className="loading text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Caricamento profilo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-section">
        <div className="alert alert-danger">Errore nel caricamento del profilo: {error}</div>
      </div>
    );
  }

  if (!profile) return null;

  const initials = `${profile.name?.charAt(0) || ""}${profile.surname?.charAt(0) || ""}`.toUpperCase();

  return (
    <>
      <Col className="side-section ms-auto" xs={2}>
        <div className="language-card">
          <h4>Lingua del profilo</h4>
          <i className="bi bi-pencil"></i>
          <h4>Profilo pubblico e URL</h4>
          <i className="bi bi-pencil"></i>
          //da modificare
          <p>link preso da param</p>
        </div>
        <div className="profile-job-offer">
          {profile.image ? <img src={profile.image} alt="Profile" /> : <div className="profile-photo-placeholder">{initials}</div>}
          <p>{profile.name}, scopri le opportunità offerte intorno a te</p>
        </div>
      </Col>

      <Col>
        {/* sezione amici */}
        <div className="friends-section">
          <h2 className="section-title">Formazione</h2>
          <p className="text-muted">Aggiungi la tua formazione</p>
        </div>
      </Col>
    </>
  );
};

export default Sidebar;
