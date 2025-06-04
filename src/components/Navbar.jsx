import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSelector } from "react-redux";




const Navbar = () => {
  const mainUser = useSelector ((state) => state.user.mainUser);
  return (
    <nav className="navbar">
      <div className=" d-flex align-items-center w-100 justify-content-center">
        
        <div className="nav d-flex  gap-2 px-4">
          <a href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              width="41"
            
            />
          </a>
          <div className='search-wrapper d-flex align-items-center'>
          <i className="bi bi-search d-block d-sm-none " style={{ fontSize: '1.2rem' }}></i>
  <input
    type="text"
    className="form-control d-none d-sm-block"
    placeholder="🔍Cerca"
  />
          </div>
        </div>


        <div className="d-flex align-items-center gap-4 ">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7z" />
            </svg>
            <p className="mb-0 small">Home</p>
          </div>

          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z" />
            </svg>
            <p className="mb-0 small">Rete</p>
          </div>

          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M22.84 10.22L21 6h-3.95V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2l2.22 5.18A3 3 0 007 13h14a2 2 0 001.84-2.78zM15.05 6h-6V5a1 1 0 011-1h4a1 1 0 011 1zM7 14h15v3a3 3 0 01-3 3H5a3 3 0 01-3-3V8.54l1.3 3A4 4 0 007 14z" />
            </svg>
            <p className="mb-0 small">Lavoro</p>
          </div>

          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z" />
            </svg>
            <p className="mb-0 small">Messaggistica</p>
          </div>

          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z" />
            </svg>
            <p className="mb-0 small">Notifiche</p>
          </div>


<div className="dropdown text-center d-flex flex-column align-items-center">
  <button
    className="rounded-circle bg-secondary border-0 p-0"
    style={{ width: "24px", height: "24px", backgroundImage: mainUser ? 'url(${mainUser.image})' : undefined, backgroundSize:"cover", backgroundPosition: "center" }}
    id="meDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  ></button>

  <button
    className="btn btn-link text-decoration-none d-flex align-items-center gap-1 p-0 mt-1 "
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <p className="mb-0 small">Tu</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M1.5 5.5l6 6 6-6" />
    </svg>
  </button>

  {/*menu */}
  <ul className="dropdown-menu dropdown-menu-end mt-2 p-3" aria-labelledby="meDropdown" style={{ width: '280px' }}>
  <li className="d-flex align-items-start mb-3">
    <img
      src={mainUser?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
      className="rounded-circle me-2"
      style={{ width: "56px", height: "56px", objectFit: "cover" }}
      alt="Profile"
    />
    <div>
      <strong>{mainUser?.name || "Utente"}</strong><br />
      <small className="text-muted">{mainUser?.title || "Ruolo non disponibile"}</small>
      <div className="mt-2 row">
        <a href="/profile" className="btn btn-outline-primary btn-sm me-2">Visualizza profilo</a>
        <button className="btn btn-primary btn-sm">Verifica</button>
      </div>
    </div>
  </li>

  <li><hr className="dropdown-divider" /></li>

  <li className="mb-2 px-2"><strong>Account</strong></li>
  <li><a className="dropdown-item" href="/premium">🟨 Sblocca 1 mese di Premium</a></li>
  <li><a className="dropdown-item" href="/settings">Impostazioni e privacy</a></li>
  <li><a className="dropdown-item" href="/help">Guida</a></li>
  <li><a className="dropdown-item" href="/language">Lingua</a></li>

  <li><hr className="dropdown-divider" /></li>

  <li className="mb-2 px-2"><strong>Gestisci</strong></li>
  <li><a className="dropdown-item" href="/posts">Post e attività</a></li>
  <li><a className="dropdown-item" href="/job-offers">Account per la pubblicazione di offerte</a></li>

  <li><hr className="dropdown-divider" /></li>

  <li><a className="dropdown-item text-danger" href="/logout">Esci</a></li>
</ul>

</div>






<div  className="linea" style={{
              width: "1px",
              height: "32px",
              backgroundColor: "#d3d3d3",
            }} ></div>






 <div className="dropdown ">
 

 
  <button
  className="btn bg-transparent border-0 d-flex flex-column align-items-center gap-1"
  type="button"
  id="businessDropdown"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z" />
  </svg>

  <div className="d-flex align-items-center gap-1">
    <p className="mb-0 small">Per le aziende</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M1.5 5.5l6 6 6-6" />
    </svg>
  </div>
</button>



            {/* Menu */}
            <div
  className="dropdown-menu p-4 shadow-lg"
  aria-labelledby="businessDropdown"
  style={{ minWidth: "650px", maxWidth: "1000px" }}
>
  <div className="row">
    {/* Colonna sinistra - Le mie app */}
    <div className="col-6 border-end pe-4">
      <h6 className="text-muted mb-3">Le mie app</h6>

      <div className="d-flex align-items-center mb-3">
        <img src="https://cdn-icons-png.flaticon.com/512/5977/5977561.png" width="24" className="me-3" />
        <span>Trova nuovi clienti</span>
      </div>
      <div className="d-flex align-items-center mb-3">
        <img src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" width="24" className="me-3" />
        <span>Gruppi</span>
      </div>

      <h6 className="text-muted mt-4 mb-3">Talent</h6>
      <div className="d-flex align-items-center mb-3">
        <img src="https://cdn-icons-png.flaticon.com/512/1034/1034131.png" width="24" className="me-3" />
        <span>Talent Insights</span>
      </div>
      <div className="d-flex align-items-center mb-3">
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" width="24" className="me-3" />
        <span>Pubblica un’offerta di lavoro</span>
      </div>

      <h6 className="text-muted mt-4 mb-3">Vendite</h6>
      <div className="d-flex align-items-center mb-3">
        <img src="https://cdn-icons-png.flaticon.com/512/9290/9290349.png" width="24" className="me-3" />
        <span>Trova i migliori freelance</span>
      </div>

      <h6 className="text-muted mt-4 mb-3">Marketing</h6>
      <div className="d-flex align-items-center mb-3">
        <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" width="24" className="me-3" />
        <span>Pubblicizza</span>
      </div>

      <h6 className="text-muted mt-4 mb-3">Learning</h6>
      <div className="d-flex align-items-center">
        <img src="https://cdn-icons-png.flaticon.com/512/2965/2965879.png" width="24" className="me-3" />
        <span>Learning</span>
      </div>
    </div>

    {/* Colonna destra*/}
    <div className="col-6 ps-4">
      <h6 className="mb-3">Scopri altro per il business</h6>

      {[
        {
          title: "Assumi su LinkedIn",
          desc: "Trova, attrai e assumi",
        },
        {
          title: "Vendi con LinkedIn",
          desc: "Sblocca nuove opportunità di vendita",
          highlight: true,
        },
        {
          title: "Offerta di lavoro gratuita",
          desc: "Ottieni rapidamente candidati qualificati",
        },
        {
          title: "Fai pubblicità su LinkedIn",
          desc: "Acquisisci clienti e fai crescere la tua azienda",
        },
        {
          title: "Inizia con Premium",
          desc: "Amplia e sfrutta la tua rete",
        },
        {
          title: "Impara con LinkedIn",
          desc: "Corsi per formare i tuoi dipendenti",
        },
        {
          title: "Centro per amministratori",
          desc: "Gestisci i dettagli di fatturazione e account",
        },
      ].map(({ title, desc, highlight }) => (
        <div className="mb-3" key={title}>
          <strong className={`d-block ${highlight ? "text-primary" : ""}`}>{title}</strong>
          <small className="text-muted">{desc}</small>
        </div>
      ))}

      <div className="mt-3">
        <strong className="d-block">Crea una pagina aziendale ➕</strong>
      </div>
    </div>
  </div>
</div>

          </div>

          <div className="text-center">
<a className="dropdown-item" href="/premium">🟨</a>

<p>Try Premium for $0</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
