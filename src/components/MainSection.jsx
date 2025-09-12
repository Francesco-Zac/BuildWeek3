import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Experiences from "./Experiences";
import "./MainSection.css";
import Sidebar from "./Sidebar";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";
const MainSection = () => {
  const profile = useSelector((state) => state.user.mainUser);
  const [imageFile, setImageFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [editForm, setEditForm] = useState({
    name: "",
    surname: "",
    title: "",
    bio: "",
    area: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setEditForm({
        name: profile.name || "",
        surname: profile.surname || "",
        title: profile.title || "",
        bio: profile.bio || "",
        area: profile.area || "",
      });
      setLoading(false);
      setError(null);
    } else {
      setLoading(true);
    }
  }, [profile]);

  const fetchExperiences = async () => {
    try {
      const res = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${profile._id}/experiences`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!res.ok) throw new Error("Errore nella fetch delle esperienze");
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error("Errore nel caricamento esperienze:", err);
    }
  };

  fetchExperiences();

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
    if (!editForm.name || !editForm.surname || !editForm.title || !editForm.area) {
      setError("Tutti i campi sono obbligatori");
      return;
    }
    try {
      setShowEditModal(false);
      setError(null);
    } catch (err) {
      setError("Errore durante il salvataggio");
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
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const initials = `${profile.name?.charAt(0) || ""}${profile.surname?.charAt(0) || ""}`.toUpperCase();
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const res = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${profile._id}/picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Errore nell'upload immagine");

      window.location.reload();
    } catch (err) {
      console.error("Errore durante il cambio immagine profilo:", err);
    }
  };

  return (
    <>
      <div className="main-section">
        {/* Profile Header Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="cover-photo position-relative">
              <label htmlFor="upload-photo" className="edit-btn bg-white" title="Cambia immagine profilo">
                <i className="bi bi-camera-fill m-0"></i>
              </label>
              <input type="file" id="upload-photo" accept="image/*" style={{ display: "none" }} onChange={handleProfileImageUpload} />
            </div>

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
              <div className="profile-experiences mt-3">
                <h6 className="fw-bold mb-2">Esperienze recenti</h6>
                {experiences.length > 0 ? (
                  experiences.slice(0, 2).map((exp) => (
                    <div key={exp._id} className="d-flex align-items-center mb-2">
                      <div className="me-2">
                        {exp.image ? (
                          <img src={exp.image} alt={exp.company} className="rounded" style={{ width: "32px", height: "32px", objectFit: "cover" }} />
                        ) : (
                          <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                            <i className="fas fa-building text-muted"></i>
                          </div>
                        )}
                      </div>
                      <div>
                        <strong className="d-block">{exp.role}</strong>
                        <small className="text-muted">{exp.company}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Nessuna esperienza disponibile</p>
                )}
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

      <Sidebar />
    </>
  );
};

export default MainSection;
