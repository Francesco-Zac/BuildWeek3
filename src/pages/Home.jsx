import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";
const API_URL = "https://striveschool-api.herokuapp.com/api/posts/";

const Home = () => {
  const mainUser = useSelector((state) => state.user.mainUser);
  const currentUsername = mainUser?.username || "";

  const [posts, setPosts] = useState([]);
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
    } catch (err) {
      console.error("Errore nel caricamento post:", err);
    } finally {
      setLoading(false);
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
      const res = await fetch(`${API_URL}${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (res.ok) {
        fetchPosts();
      }
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
          <div className="d-flex justify-content-between px-3 text-muted small">
            <span>📷 Foto</span>
            <span>🎥 Video</span>
            <span>📄 Scrivi un Articolo</span>
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
                {}
                <img
                  src={post.username === currentUsername && mainUser?.image ? mainUser.image : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
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

              {/* post in modifica */}
              {post._id === editingPostId ? (
                <div>
                  <textarea className="form-control mb-2" rows={3} value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>
                      Annulla
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => saveEdit(post._id)}>
                      Salva
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{post.text}</p>
                  {/* Modifica/Elimina */}
                  {post.username === currentUsername && (
                    <div className="d-flex justify-content-end gap-2">
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
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
