import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Button, Col, Image } from "react-bootstrap";

const Sidebar = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState(null);

  //use params con react router

  const API_BASE = "https://striveschool-api.herokuapp.com/api/profile";
  const TOKEN =
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlZDViNWIxMGJmMDAwMTVjZjIyYjYiLCJpYXQiOjE3NDg5NDg0MDYsImV4cCI6MTc1MDE1ODAwNn0.OdtalgFyC7p5edoHwc0t6DdVkCcrtVHFhaxzCp1Cq5E";
  useEffect(() => {
    fetchProfile();
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch(API_BASE, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("errore nella fetch");
      }
      const data = await response.json();
      setFriends(data.slice(2, 12));
    } catch (error) {
      setError(error.message);
    }
  };

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

  if (friends) {
    console.log(friends);
  }

  const initials = `${profile.name?.charAt(0) || ""}${profile.surname?.charAt(0) || ""}`.toUpperCase();

  return (
    <>
      <Col className="side-section ms-auto" xs={3}>
        <div className="cards">
          <h4>Lingua del profilo</h4>
          <i className="bi bi-pencil"></i>
          <h4>Profilo pubblico e URL</h4>
          <i className="bi bi-pencil"></i>
          //da modificare
          <p>link preso da param</p>
        </div>
        <div className="cards">
          {profile.image ? (
            <Image className="img-fluid rounded-circle custom-img-side-profile" src={profile.image} alt="Profile" />
          ) : (
            <div className="profile-photo-placeholder">{initials}</div>
          )}
          <p>{profile.name}, scopri le opportunità offerte intorno a te</p>
        </div>
        {/* sezione amici */}
        <div className="cards">
          <h2 className="section-title">Altri profili per te</h2>
          {friends &&
            friends.map((friend) => {
              return (
                <div key={friend.id} className="d-flex justify-content-center my-2">
                  {friend.image ? (
                    <Image className="img-fluid rounded-circle custom-side-img" src={friend.image} alt="profile" />
                  ) : (
                    <div className="profile-photo-placeholder">{initials}</div>
                  )}
                  <div>
                    <p>
                      {friend.name} {friend.surname}
                    </p>
                    <p>{friend.title}</p>
                    <Button variant="primary" className="btn btn-outline-primary rounded-pill ">
                      Aggiungi
                    </Button>
                  </div>
                </div>
              );
            })}
          <p className="text-muted">Aggiungi la tua formazione</p>
        </div>
      </Col>
    </>
  );
};

export default Sidebar;
