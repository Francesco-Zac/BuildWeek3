import React, { useState, useEffect } from "react";

const Experiences = ({ userId, token }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
    currentJob: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const API_BASE = "https://striveschool-api.herokuapp.com/api/profile";

  useEffect(() => {
    if (userId) {
      fetchExperiences();
    }
  }, [userId]);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/${userId}/experiences`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const expData = await response.json();
      setExperiences(expData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
      currentJob: false,
    });
    setEditingExp(null);
    setImageFile(null);
  };

  const handleAddClick = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEditClick = (exp) => {
    setEditingExp(exp);
    setFormData({
      role: exp.role || "",
      company: exp.company || "",
      startDate: exp.startDate ? exp.startDate.split("T")[0] : "",
      endDate: exp.endDate ? exp.endDate.split("T")[0] : "",
      description: exp.description || "",
      area: exp.area || "",
      currentJob: !exp.endDate,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const expData = {
        ...formData,
        endDate: formData.currentJob ? null : formData.endDate,
      };

      const url = editingExp ? `${API_BASE}/${userId}/experiences/${editingExp._id}` : `${API_BASE}/${userId}/experiences`;

      const method = editingExp ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedExp = await response.json();

      if (imageFile) {
        await uploadExperienceImage(savedExp._id);
      }

      await fetchExperiences();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const uploadExperienceImage = async (expId) => {
    try {
      setUploadingImage(true);
      const formDataImg = new FormData();
      formDataImg.append("experience", imageFile);

      const response = await fetch(`${API_BASE}/${userId}/experiences/${expId}/picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataImg,
      });

      if (!response.ok) {
        throw new Error(`Image upload failed! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (expId) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa esperienza?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/${userId}/experiences/${expId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchExperiences();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (months < 12) {
      return `${months} ${months === 1 ? "mese" : "mesi"}`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      let duration = `${years} ${years === 1 ? "anno" : "anni"}`;
      if (remainingMonths > 0) {
        duration += ` ${remainingMonths} ${remainingMonths === 1 ? "mese" : "mesi"}`;
      }
      return duration;
    }
  };

  if (loading) {
    return (
      <div className="card mb-3">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Caricamento esperienze...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center bg-white border-0 pb-0">
          <h2 className="h5 mb-0 fw-semibold">Esperienza</h2>
          <div className="d-flex gap-2">
            <button className="btn btn-link p-1 text-muted" onClick={handleAddClick} title="Aggiungi esperienza">
              <i className="fas fa-plus"></i>
            </button>
            <button className="btn btn-link p-1 text-muted" title="Modifica sezione">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </div>
        </div>

        <div className="card-body pt-2">
          {error && (
            <div className="alert alert-danger">
              <strong>Errore:</strong> {error}
            </div>
          )}

          {experiences.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-3">Metti in risalto i risultati raggiunti e ottieni fino a 2 volte più visualizzazioni del profilo e collegamenti</p>
              <button className="btn btn-outline-primary" onClick={handleAddClick}>
                <i className="fas fa-plus me-2"></i>
                Aggiungi esperienza
              </button>
            </div>
          ) : (
            <>
              {experiences.map((exp, index) => (
                <div key={exp._id} className={`d-flex ${index > 0 ? "border-top pt-3 mt-3" : ""}`}>
                  <div className="me-3">
                    {exp.image ? (
                      <img src={exp.image} alt={exp.company} className="rounded" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
                    ) : (
                      <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
                        <i className="fas fa-building text-muted"></i>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h3 className="h6 mb-1 fw-semibold">{exp.role}</h3>
                        <p className="mb-1 text-dark">{exp.company}</p>
                        <p className="small text-muted mb-1">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Presente"}
                          {exp.startDate && <span className="ms-2">· {calculateDuration(exp.startDate, exp.endDate)}</span>}
                        </p>
                        {exp.area && <p className="small text-muted mb-2">{exp.area}</p>}
                        {exp.description && (
                          <p className="small mb-0" style={{ lineHeight: "1.4" }}>
                            {exp.description}
                          </p>
                        )}
                      </div>

                      <div className="dropdown">
                        <button className="btn btn-link p-1 text-muted" type="button" data-bs-toggle="dropdown">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item" onClick={() => handleEditClick(exp)}>
                              <i className="fas fa-pencil-alt me-2"></i>
                              Modifica
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item text-danger" onClick={() => handleDelete(exp._id)}>
                              <i className="fas fa-trash me-2"></i>
                              Elimina
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-3 pt-3 border-top">
                <button className="btn btn-outline-primary" onClick={handleAddClick}>
                  <i className="fas fa-plus me-2"></i>
                  Aggiungi esperienza
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal per aggiungere/modificare esperienza */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingExp ? "Modifica esperienza" : "Aggiungi esperienza"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <div>
                  <div className="mb-3">
                    <label className="form-label">Qualifica *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="Es: Retail Sales Manager"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Azienda o organizzazione *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Es: Microsoft"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="currentJob"
                        checked={formData.currentJob}
                        onChange={handleInputChange}
                        id="currentJob"
                      />
                      <label className="form-check-label" htmlFor="currentJob">
                        Attualmente ricopro questo ruolo
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Data di inizio *</label>
                        <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                      </div>
                    </div>

                    {!formData.currentJob && (
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Data di fine</label>
                          <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Località</label>
                    <input
                      type="text"
                      className="form-control"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="Es: Milano, Italia"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descrizione</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Descrivi le tue responsabilità, risultati raggiunti, competenze acquisite..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Immagine aziendale</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                    <div className="form-text">Carica il logo dell'azienda o un'immagine rappresentativa</div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Annulla
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!formData.role || !formData.company || !formData.startDate || uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Salvando...
                    </>
                  ) : (
                    "Salva"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Experiences;
