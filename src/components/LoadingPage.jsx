import "./LoadingPage.css"; // crea anche questo

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-box">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="LinkedIn Logo"
          className="linkedin-logo"
        />
        <div className="spinner" />
        <p className="loading-text">Caricamento in corso...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
