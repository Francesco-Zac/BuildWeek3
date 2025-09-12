import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const COMMENTS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQyOWY2NjM3MTg2MjAwMTVhZjFkNzUiLCJpYXQiOjE3NDkxOTY2NDYsImV4cCI6MTc1MDQwNjI0Nn0.0z8yk2wdbmI_I1yAZ8-2Z0aE5N4_PxW9zaJO7AIfJlY";
const COMMENTS_API_URL = "https://striveschool-api.herokuapp.com/api/comments/";
const PROFILE_URL = "https://striveschool-api.herokuapp.com/api/profile";

const COMMENTS_PER_PAGE = 10;
const INITIAL_LOAD = 5;

const CommentSection = ({ postId }) => {
  const mainUser = useSelector((state) => state.user.mainUser);
  const currentUsername = mainUser?.username || "";

  const [allComments, setAllComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [userProfiles, setUserProfiles] = useState({});
  const [error, setError] = useState(null);

  const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Server sovraccarico`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error("Server troppo lento - riprova più tardi");
      }
      throw error;
    }
  };

  const fetchUserProfiles = useCallback(async () => {
    try {
      setError(null);
      const res = await fetchWithTimeout(PROFILE_URL, {
        headers: { Authorization: `Bearer ${COMMENTS_TOKEN}` },
      });

      const profiles = await res.json();

      const limitedProfiles = profiles.slice(0, 50);
      const profilesMap = {};

      limitedProfiles.forEach((profile) => {
        profilesMap[profile.username] = profile;
      });

      setUserProfiles(profilesMap);
    } catch (err) {
      console.warn("Profili non disponibili:", err.message);
    }
  }, []);

  const fetchComments = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithTimeout(COMMENTS_API_URL, {
        headers: { Authorization: `Bearer ${COMMENTS_TOKEN}` },
      });

      const allCommentsData = await res.json();

      const postComments = allCommentsData.filter((comment) => comment.elementId === postId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAllComments(postComments);

      setDisplayedComments(postComments.slice(0, visibleCount));
    } catch (err) {
      console.error("Errore caricamento commenti:", err.message);
      setError("Server temporaneamente sovraccarico. Riprova tra qualche minuto.");
    } finally {
      setLoading(false);
    }
  }, [postId, visibleCount]);

  const loadMoreComments = () => {
    setLoadingMore(true);

    setTimeout(() => {
      const newVisibleCount = Math.min(visibleCount + COMMENTS_PER_PAGE, allComments.length);
      setVisibleCount(newVisibleCount);
      setDisplayedComments(allComments.slice(0, newVisibleCount));
      setLoadingMore(false);
    }, 300);
  };

  const createComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const commentData = {
        comment: newComment,
        rate: "5",
        elementId: postId,
      };

      const res = await fetchWithTimeout(COMMENTS_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${COMMENTS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        const newCommentData = await res.json();

        const updatedComments = [newCommentData, ...allComments];
        setAllComments(updatedComments);
        setDisplayedComments(updatedComments.slice(0, visibleCount));

        setNewComment("");
      }
    } catch (err) {
      console.error("Errore creazione commento:", err.message);
      setError("Impossibile pubblicare il commento. Server sovraccarico.");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Vuoi eliminare questo commento?")) return;

    try {
      await fetchWithTimeout(`${COMMENTS_API_URL}${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${COMMENTS_TOKEN}` },
      });

      const updatedComments = allComments.filter((c) => c._id !== commentId);
      setAllComments(updatedComments);
      setDisplayedComments(updatedComments.slice(0, visibleCount));
    } catch (err) {
      console.error("Errore eliminazione commento:", err.message);
      setError("Impossibile eliminare il commento. Riprova.");
    }
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.comment);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const saveEdit = async (commentId) => {
    if (!editingText.trim()) return;

    try {
      const res = await fetchWithTimeout(`${COMMENTS_API_URL}${commentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${COMMENTS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: editingText,
          rate: "5",
          elementId: postId,
        }),
      });

      if (res.ok) {
        const updatedComments = allComments.map((comment) => (comment._id === commentId ? { ...comment, comment: editingText } : comment));

        setAllComments(updatedComments);
        setDisplayedComments(updatedComments.slice(0, visibleCount));

        setEditingCommentId(null);
        setEditingText("");
      }
    } catch (err) {
      console.error("Errore modifica commento:", err.message);
      setError("Impossibile modificare il commento. Riprova.");
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchComments();
    fetchUserProfiles();
  };

  useEffect(() => {
    if (postId && showComments) {
      fetchComments();
      fetchUserProfiles();
    }
  }, [postId, showComments, fetchComments, fetchUserProfiles]);

  useEffect(() => {
    setDisplayedComments(allComments.slice(0, visibleCount));
  }, [allComments, visibleCount]);

  const hasMoreComments = allComments.length > displayedComments.length;

  return (
    <div className="mt-3">
      {/* Barra azioni */}
      <div className="d-flex justify-content-between align-items-center border-top pt-3">
        <div className="d-flex gap-3">
          <button className="btn btn-link text-muted p-0 d-flex align-items-center" onClick={() => setShowComments(!showComments)}>
            <i className="bi bi-chat me-1"></i>
            Commenti {showComments ? `(${allComments.length})` : ""}
          </button>
        </div>
      </div>

      {/* Sezione commenti */}
      {showComments && (
        <div className="mt-3 border-top pt-3">
          {/* Messaggio errore */}
          {error && (
            <div className="alert alert-warning d-flex justify-content-between align-items-center mb-3" role="alert">
              <div>
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
              <button className="btn btn-sm btn-outline-warning" onClick={handleRetry} disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-1" role="status" /> : <i className="bi bi-arrow-clockwise me-1"></i>}
                Riprova
              </button>
            </div>
          )}

          {/* Form nuovo commento */}
          <div className="d-flex mb-3">
            <img
              src={mainUser?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="profile"
              width={32}
              height={32}
              className="rounded-circle me-2"
            />
            <form onSubmit={createComment} className="flex-grow-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Scrivi un commento..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" className="btn btn-primary rounded-pill ms-2" disabled={!newComment.trim() || loading}>
                  {loading ? <span className="spinner-border spinner-border-sm" role="status" /> : <i className="bi bi-send"></i>}
                </button>
              </div>
            </form>
          </div>

          {/* Lista commenti */}
          {loading && displayedComments.length === 0 ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <div className="mt-2 text-muted">Caricamento commenti...</div>
            </div>
          ) : (
            <div className="comments-list">
              {displayedComments.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-chat-dots text-muted" style={{ fontSize: "2rem" }}></i>
                  <p className="text-muted mt-2">Nessun commento ancora</p>
                  <p className="text-muted small">Sii il primo a commentare!</p>
                </div>
              ) : (
                <>
                  {displayedComments.map((comment) => (
                    <div key={comment._id} className="d-flex mb-3">
                      <img
                        src={userProfiles[comment.author]?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-circle me-2"
                      />
                      <div className="flex-grow-1">
                        <div className="bg-light rounded p-2 mb-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <strong className="text-dark">{userProfiles[comment.author]?.name || comment.author || "Utente"}</strong>
                              <div className="text-muted small">
                                {new Date(comment.createdAt).toLocaleDateString("it-IT", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>

                            {/* Menu azioni per commenti dell'utente */}
                            {comment.author === currentUsername && (
                              <div className="dropdown">
                                <button className="btn btn-sm btn-link text-muted p-0" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i className="bi bi-three-dots"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <button className="dropdown-item" onClick={() => startEdit(comment)}>
                                      <i className="bi bi-pencil me-2"></i>Modifica
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item text-danger" onClick={() => deleteComment(comment._id)}>
                                      <i className="bi bi-trash me-2"></i>Elimina
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Modalità modifica o visualizzazione */}
                          {comment._id === editingCommentId ? (
                            <div className="mt-2">
                              <textarea
                                className="form-control form-control-sm mb-2"
                                rows={2}
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                              />
                              <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>
                                  Annulla
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={() => saveEdit(comment._id)} disabled={!editingText.trim()}>
                                  Salva
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="mb-0 mt-1">{comment.comment}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pulsante "Mostra altri commenti" */}
                  {hasMoreComments && (
                    <div className="text-center mt-3">
                      <button className="btn btn-outline-primary" onClick={loadMoreComments} disabled={loadingMore}>
                        {loadingMore ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            Caricamento...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-arrow-down me-2"></i>
                            Mostra altri commenti ({allComments.length - displayedComments.length})
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Indicatore fine commenti */}
                  {!hasMoreComments && allComments.length > INITIAL_LOAD && (
                    <div className="text-center mt-3">
                      <small className="text-muted">
                        <i className="bi bi-check-circle me-1"></i>
                        Tutti i commenti caricati
                      </small>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
