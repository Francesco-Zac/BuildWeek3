import './SidebarHome.css'

const newsItems = [
  { title: 'Voci dal pride month', time: '1 giorno fa', readers: 205 },
  { title: 'Se la radio scompare dall’auto', time: '18 ore fa', readers: 187 },
  { title: 'CreDem cerca nuovi bancari', time: '2 ore fa', readers: 143 },
  { title: 'È la Giornata mondiale dell’ambiente', time: '32 minuti fa', readers: 127 },
  { title: 'Occupazione stabile ad aprile', time: '1 giorno fa', readers: 164 },
  { title: 'Occupazione stabile ad aprile', time: '1 giorno fa', readers: 164 },
];

const SidebarHome = () => {
  return (
    <div className="sidebar-home" style={{ width: '100%', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
      {/* Box Notizie */}
      <div className="text-start" style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 4px rgba(0,0,0,0.1)',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <div className="d-flex justify-content-between">
  <h6 className="mb-2" style={{ fontWeight: 'bold' }}>
    LinkedIn Notizie
  </h6>
  <i className="bi bi-info-square-fill" style={{ fontSize: '18px' }}></i>
</div>
        <p className="mb-1 " style={{ fontWeight: 'bold' }}>Storie principali</p>
        <ul className="list-unstyled mb-2 ">
          {newsItems.map((item, index) => (
            <li key={index} className="mb-2">
              <div style={{ fontWeight: '500' }}>{item.title}</div>
              <small className="text-muted">{item.time} · {item.readers} lettori</small>
            </li>
          ))}
        </ul>
        <button className="btn btn-link p-0" style={{ fontSize: '14px', textDecoration: 'none', color: 'black' }}>Mostra altro <i className="bi bi-caret-right"></i>
</button>
        <hr />
        <div className="mt-3">
          <p className="mb-1 d-flex" style={{ fontWeight: 'bold' }}>Il rompicapo di oggi</p>
          <div className="d-flex align-items-center justify-content-between p-2 rounded border">
            <img src="https://static.licdn.com/aero-v1/sc/h/5o0bh0ro6f0jpe5e4bh06umvs" className="mr3" width="64" height="64" alt="Puzzle" />
            <div>
              <small>Zip – un rompicapo veloce</small><br />
              <small className="text-muted">Solo tu puoi vedere il punteggio</small>
            </div>
          </div>
        </div>
      </div>

      {/* Banner promozionale */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '0',
        boxShadow: '0 0 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        <img src="https://media.licdn.com/media/AAYABATPAAgAAQAAAAAAAKwYrfHUPkoBQGmwnaG71Ps_5Q.png" alt="Hiring" width="100%" height="250px" />"
    
        <div className="p-2 d-flex gap-2">
          <span className="badge bg-warning text-dark mb-2">SUGGERIMENTO</span><br />
          <small>Prova LinkedIn sull’app per Windows</small>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: '12px', color: '#666' }}>
        <p className="mb-1">Informazioni · Accessibilità · Centro assistenza</p>
        <p className="mb-1">Privacy e condizioni · Opzioni per gli annunci pubblicitari</p>
        <p className="mb-1">Pubblicità · Servizi alle aziende · Scarica l’app LinkedIn</p>
       <div className="d-flex justify-content-center gap-2 mt-2">
  <svg
    display="var(--hue-web-svg-display-light)"
    width="56"
    height="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      href="https://static.licdn.com/aero-v1/sc/h/aahlc8ivbnmk0t3eyz8as5gvr"
      x="0"
      y="0"
      width="56"
      height="14"
    />
  </svg>
  <small className="text-muted">LinkedIn Corporation © 2025</small>
</div>
      </div>
    </div>
  );
};
export default SidebarHome;
