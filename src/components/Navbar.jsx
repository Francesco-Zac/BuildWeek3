import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm ">
      <div className=" d-flex align-items-center w-100 justify-content-center">
        
        <div className="d-flex  gap-2 px-4 ">
          <a href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              width="41"
            
            />
          </a>
          <div className='search-wrapper d-flex align-items-center'>
          <i className="bi bi-search d-block d-sm-none me-2" style={{ fontSize: '1.2rem' }}></i>
  <input
    type="text"
    className="form-control d-none d-sm-block"
    placeholder="🔍 Title, skill, or company"
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
            <p className="mb-0 small">My Network</p>
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
            <p className="mb-0 small">Jobs</p>
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
            <p className="mb-0 small">Messages</p>
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
            <p className="mb-0 small">Notifications</p>
          </div>


<div className="dropdown text-center d-flex flex-column align-items-center">
  <button
    className="rounded-circle bg-secondary border-0 p-0"
    style={{ width: "24px", height: "24px" }}
    id="meDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  ></button>

  <button
    className="btn btn-link text-decoration-none d-flex align-items-center gap-1 p-0 mt-1"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <p className="mb-0 small">Me</p>
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
  <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="meDropdown">
    <li>
      <a className="dropdown-item" href="/profile">
        View Profile
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="/settings">
        Settings & Privacy
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="/help">
        Help
      </a>
    </li>
    <li><hr className="dropdown-divider" /></li>
    <li>
      <a className="dropdown-item text-danger" href="/logout">
        Sign Out
      </a>
    </li>
  </ul>
</div>

<div style={{
              width: "1px",
              height: "32px",
              backgroundColor: "#d3d3d3",
            }} ></div>

 <div className="dropdown">
  <button className='btn bg-transparent border-0 d-flex align-items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
      <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z"></path>
    </svg></button>
            <button
              className="btn bg-transparent border-0 d-flex align-items-center gap-1"
              type="button"
              id="businessDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              
              <p className="mb-0 small"> For Business</p>
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

            {/* Menu */}
            <div
              className="dropdown-menu p-4 shadow-lg"
              aria-labelledby="businessDropdown"
              style={{ minWidth: "650px" }}
            >
              <div className="row">
                {/* Sinistra */}
                <div className="col-6 border-end pe-4">
                  <h6 className="text-muted">My Apps</h6>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5977/5977561.png"
                      width="20"
                      className="me-2"
                    />
                    <span>Find New Clients</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png"
                      width="20"
                      className="me-2"
                    />
                    <span>Groups</span>
                  </div>
                  <h6 className="text-muted mt-3">Talent</h6>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1034/1034131.png"
                      width="20"
                      className="me-2"
                    />
                    <span>Talent Insights</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                      width="20"
                      className="me-2"
                    />
                    <span>Post a job</span>
                  </div>
                </div>

                {/* Destra*/}
                <div className="col-6 ps-4">
                  <h6>Explore more for business</h6>
                  <div className="mb-2">
                    <strong className="d-block">Hire on LinkedIn</strong>
                    <small className="text-muted">
                      Find, attract and recruit talent
                    </small>
                  </div>
                  <div className="mb-2">
                    <strong className="d-block text-primary">
                      Sell with LinkedIn
                    </strong>
                    <small className="text-muted">
                      Unlock sales opportunities
                    </small>
                  </div>
                  <div className="mb-2">
                    <strong className="d-block">Post a job for free</strong>
                    <small className="text-muted">
                      Get qualified applicants quickly
                    </small>
                  </div>
                  <div className="mb-2">
                    <strong className="d-block">Advertise on LinkedIn</strong>
                    <small className="text-muted">
                      Acquire customers and grow your business
                    </small>
                  </div>
                  <div className="mb-2">
                    <strong className="d-block">Admin Center</strong>
                    <small className="text-muted">
                      Manage billing and account details
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
<svg role="none" aria-hidden="true" className="global-nav__primary-link--premium-chip" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-supported-dps="24x24" data-test-icon="premium-chip-medium">

    <use href="#premium-chip-medium" width="24" height="24"></use>
</svg>
<p>Try Premium for $0</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
