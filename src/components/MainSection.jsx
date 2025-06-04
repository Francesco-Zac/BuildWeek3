import React, { useState, useEffect } from "react";
import Experiences from "./Experiences";
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
        const errorText = await response.text();
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
        <div className="alert alert-danger">
          <strong>Errore nel caricamento del profilo:</strong> {error}
          <br />
          <button className="btn btn-primary mt-2" onClick={fetchProfile}>
            Riprova
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const initials = `${profile.name?.charAt(0) || ""}${profile.surname?.charAt(0) || ""}`.toUpperCase();

  return (
    <div className="main-section">
      {/* Profile Header Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="cover-photo"></div>
          <div className="profile-photo">
            {profile.image ? <img src={profile.image} alt="Profile" /> : <div className="profile-photo-placeholder">{initials}</div>}
          </div>
        </div>

        <div className="profile-info">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="profile-name">
                {profile.name} {profile.surname}
              </h1>
              <p className="profile-headline">{profile.title || "Studente presso EPICODE Institute of Technology"}</p>
              <p className="profile-location">
                {profile.area || "Rende, Calabria, Italia"} · <span className="contact-info">Informazioni di contatto </span>
              </p>
              <div className="availability">
                <span className="available-badge">Disponibile per</span>
              </div>
            </div>
            <div className="profile-actions">
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle p-0" type="button">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
            <button className="edit-btn" onClick={handleEditClick}>
              <i className="bi bi-pencil"></i>
            </button>
          </div>

          <div className="profile-stats mt-3">
            <div className="connections">500+ collegamenti</div>
          </div>

          <div className="action-buttons mt-3">
            <button className="btn btn-primary-linkedin">Disponibile a lavorare</button>
            <button className="btn btn-secondary-linkedin">Aggiungi sezione del profilo</button>
            <button className="btn btn-outline-linkedin">Migliora profilo</button>
            <button className="btn btn-outline-linkedin">Risorse</button>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="profile-card">
        <div className="card-header">
          <h2 className="section-title">Consigliato per te</h2>
          <span className="private-badge">Solo per te</span>
        </div>
        <div className="card-body">
          <div className="recommendation-item">
            <div className="rec-icon">
              <i className="fas fa-industry"></i>
            </div>
            <div className="rec-content">
              <h3>In quale settore lavori?</h3>
              <p>Gli utenti che aggiungono un settore ricevono fino a 2,5 volte più visualizzazioni del profilo.</p>
              <button className="btn btn-outline-primary">Aggiungi settore</button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="profile-card">
        <div className="card-header">
          <h2 className="section-title">Analisi</h2>
          <span className="private-badge">Solo per te</span>
        </div>
        <div className="card-body">
          <div className="analytics-grid">
            <div className="analytics-item">
              <div className="analytics-number">0</div>
              <div className="analytics-label">visualizzazioni del profilo</div>
              <div className="analytics-desc">Aggiorna il tuo profilo per attrarre visitatori.</div>
            </div>
            <div className="analytics-item">
              <div className="analytics-number">0</div>
              <div className="analytics-label">impressioni del post</div>
              <div className="analytics-desc">Crea un post per aumentare l'interesse.</div>
            </div>
          </div>
          <div className="analytics-footer">
            <span className="analytics-period">Ultimi 7 giorni</span>
            <button className="btn btn-link">Mostra tutte le analisi</button>
          </div>
        </div>
      </div>

      {/* Experience Section */}

      <Experiences userId={profile._id} token={TOKEN} />

      {/* Education Section */}
      <div className="profile-card">
        <div className="card-header">
          <h2 className="section-title">Formazione</h2>
          <div className="section-actions">
            <button className="btn btn-link">
              <i className="fas fa-plus"></i>
            </button>
            <button className="btn btn-link">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="education-item">
            <div className="school-logo">
              <i className="fas fa-university"></i>
            </div>
            <div className="education-details">
              <h3>EPICODE Institute of Technology</h3>
              <p className="education-period">2025 - 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="profile-card">
        <div className="card-header">
          <h2 className="section-title">Competenze</h2>
          <div className="section-actions">
            <button className="btn btn-link">
              <i className="fas fa-plus"></i>
            </button>
            <button className="btn btn-link">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <p className="section-description">
            Fai capire se hai un profilo adatto per le nuove opportunità: il 50% dei recruiter usa i dati sulle competenze per coprire le posizioni aperte
          </p>
          <div className="skills-categories">
            <div className="skill-category">Soft skill</div>
            <div className="skill-category">Competenze tecniche</div>
          </div>
          <button className="btn btn-outline-primary">
            <i className="fas fa-plus me-2"></i>Aggiungi competenze
          </button>
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
                  <textarea className="form-control" name="bio" value={editForm.bio} onChange={handleInputChange} rows="4" />
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
