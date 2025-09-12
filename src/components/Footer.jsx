import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-links">
          <a href="#">Informazioni</a>
          <a href="#">Informativa sulla comunity professionale</a>
          <a href="#">Privacy e condizioni</a>
          <a href="#"> Sales solution</a>
          <a href="#">Centro Sicurezza</a>
        </div>
        <div className="footer-links">
          <a href="#">Accessibilità</a>
          <a href="#">Carriera</a>
          <a href="#">Opzioni per gli annunci pubblicitari</a>
          <a href="#">Mobile</a>
        </div>
        <div className="footer-links">
          <a href="#">Talent Solutions</a>
          <a href="#">Soluzioni di Marketing</a>
          <a href="#">Pubblicità</a>
          <a href="#">Piccole imprese</a>
        </div>
        <div className="footer-links">
          <div>
            <div className="contenuti">
              <i className="bi bi-question-circle-fill"></i>
              <h6>Domande?</h6>
            </div>
            <p>Visita il nostro centro assistenza</p>
          </div>
          <div>
            <div className="contenuti">
              <i className="bi bi-gear-fill"></i>
              <h6>Gestisci il tuo account e la tua Privacy</h6>
            </div>
            <p>Vai alle impostazioni</p>
          </div>
          <div>
            <div className="contenuti">
              <i className="bi bi-shield-shaded"></i>
              <h6>Trasparenza sui contenuti consigliati</h6>
            </div>
            <p>Scopri di più sui contenuti consigliati</p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Footer;
