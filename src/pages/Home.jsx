import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftSideHome from "../components/LeftSideHome";
import SidebarHome from "../components/SidebarHome";
import CommentSection from "../components/CommentSection";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";
const API_URL = "https://striveschool-api.herokuapp.com/api/posts/";
const PROFILE_URL = "https://striveschool-api.herokuapp.com/api/profile";

const Home = () => {
  const mainUser = useSelector((state) => state.user.mainUser);
  const currentUsername = mainUser?.username || "";

  const [posts, setPosts] = useState([]);
  const [userImages, setUserImages] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await res.json();
      setPosts(data.reverse());
      fetchUserImages(data.map((post) => post.username));
    } catch (err) {
      console.error("Errore nel caricamento post:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserImages = async (usernames) => {
    try {
      const res = await fetch(PROFILE_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const profiles = await res.json();
      const images = {};
      profiles.forEach((profile) => {
        if (usernames.includes(profile.username)) {
          images[profile.username] = profile.image;
        }
      });
      setUserImages(images);
    } catch (err) {
      console.error("Errore nel recupero immagini utenti:", err);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        setText("");
        fetchPosts();
      }
    } catch (err) {
      console.error("Errore nella creazione del post:", err);
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Vuoi eliminare questo post?")) return;
    try {
      await fetch(`${API_URL}${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      fetchPosts();
    } catch (err) {
      console.error("Errore nella cancellazione:", err);
    }
  };

  const startEdit = (post) => {
    setEditingPostId(post._id);
    setEditingText(post.text);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditingText("");
  };

  const saveEdit = async (postId) => {
    if (!editingText.trim()) return;
    try {
      const res = await fetch(`${API_URL}${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editingText }),
      });
      if (res.ok) {
        setEditingPostId(null);
        setEditingText("");
        fetchPosts();
      }
    } catch (err) {
      console.error("Errore nella modifica:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <LeftSideHome></LeftSideHome>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        {/* Box scrivi un post */}
        <div className="card mb-3 shadow-sm">
          <div className="card-body d-flex flex-column">
            <div className="d-flex align-items-center mb-2">
              <img
                src={mainUser?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="profile"
                width={48}
                height={48}
                className="rounded-circle me-2"
              />
              <form onSubmit={createPost} className="flex-grow-1">
                <input type="text" className="form-control rounded-pill" placeholder="Avvia un post" value={text} onChange={(e) => setText(e.target.value)} />
              </form>
            </div>
            <div className="d-flex justify-content-around px-3 text-muted small">
              <span className="icons">
                <i className="bi bi-play-btn-fill"></i> Foto
              </span>
              <span className="icons">
                <i className="bi bi-card-image"></i> Video
              </span>
              <span className="icons">
                <i className="bi bi-layout-text-window-reverse"></i> Scrivi un Articolo
              </span>
            </div>
          </div>
        </div>

        {/* Feed post */}
        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={userImages[post.username] || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                    alt="avatar"
                    className="rounded-circle me-2"
                    width={48}
                    height={48}
                  />
                  <div>
                    <strong>{post.username || "Utente"}</strong>
                    <div className="text-muted small">{new Date(post.createdAt).toLocaleDateString("it-IT")}</div>
                  </div>
                </div>

                {post._id === editingPostId ? (
                  <>
                    <textarea className="form-control mb-2" rows={3} value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>
                        Annulla
                      </button>
                      <button className="btn btn-sm btn-primary" onClick={() => saveEdit(post._id)}>
                        Salva
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{post.text}</p>
                    {post.username === currentUsername && (
                      <div className="d-flex justify-content-end gap-2 mb-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(post)}>
                          Modifica
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deletePost(post._id)}>
                          Elimina
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Sezione commenti - ora posizionata correttamente */}
                <CommentSection postId={post._id} />
              </div>
            </div>
          ))
        )}
      </div>
      <SidebarHome></SidebarHome>
    </>
  );
};

export default Home;
