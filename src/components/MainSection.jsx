import React, { useState, useEffect } from "react";
import "./MainSection.css";

const MainSection = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    surname: "",
    title: "",
    bio: "",
    area: "",
  });

  const API_BASE = "https://striveschool-api.herokuapp.com/api/profile";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";

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
      setEditForm({
        name: profileData.name || "",
        surname: profileData.surname || "",
        title: profileData.title || "",
        bio: profileData.bio || "",
        area: profileData.area || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = {
        ...editForm,
        email: profile.email,
        username: profile.username,
      };

      const response = await fetch(`${API_BASE}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updated = await response.json();
      setProfile(updated);
      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
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
    <div className="main-section">
      <div className="profile-card">
        {/* Header con foto copertina e profilo */}
        <div className="profile-header">
          <div className="cover-photo"></div>
          <div className="profile-photo">
            {profile.image ? <img src={profile.image} alt="Profile" /> : <div className="profile-photo-placeholder">{initials}</div>}
          </div>
          <button className="edit-btn" onClick={handleEditClick}>
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>

        {/* Informazioni profilo */}
        <div className="profile-info">
          <h1 className="profile-name">
            {profile.name} {profile.surname}
          </h1>
          <p className="profile-headline">{profile.title || "Titolo professionale"}</p>
          <p className="profile-location">
            <i className="fas fa-map-marker-alt me-1"></i>
            {profile.area || "Località non specificata"}
          </p>

          <div className="profile-stats">
            <span>500+ collegamenti</span>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary-linkedin">
              <i className="fas fa-plus me-2"></i>Segui
            </button>
            <button className="btn btn-secondary-linkedin">
              <i className="fas fa-envelope me-2"></i>Messaggio
            </button>
            <button className="btn btn-outline-linkedin">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>

        {/* Sezione Bio */}
        {profile.bio && (
          <div className="profile-section">
            <h2 className="section-title">Informazioni</h2>
            <div className="about-text">{profile.bio}</div>
          </div>
        )}

        {/* Sezione Attività */}
        <div className="profile-section">
          <h2 className="section-title">Attività</h2>
          <p className="text-muted">Non ci sono ancora attività da mostrare</p>
        </div>

        {/* Sezione Esperienza */}
        <div className="profile-section">
          <h2 className="section-title">Esperienza</h2>
          <p className="text-muted">Aggiungi la tua esperienza lavorativa</p>
        </div>

        {/* Sezione Formazione */}
        <div className="profile-section">
          <h2 className="section-title">Formazione</h2>
          <p className="text-muted">Aggiungi la tua formazione</p>
        </div>
      </div>

      {/* Modal per modifica profilo */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifica Profilo</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input type="text" className="form-control" name="name" value={editForm.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cognome</label>
                  <input type="text" className="form-control" name="surname" value={editForm.surname} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Titolo</label>
                  <input type="text" className="form-control" name="title" value={editForm.title} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea className="form-control" name="bio" value={editForm.bio} onChange={handleInputChange} rows="4" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Area</label>
                  <input type="text" className="form-control" name="area" value={editForm.area} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Annulla
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>
                  Salva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSection;
