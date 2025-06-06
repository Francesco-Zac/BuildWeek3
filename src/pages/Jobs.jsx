import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftSideHome from "../components/LeftSideHome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setJobsArray } from "../redux/action";
import './Jobs.css'
const LinkedinJobsPage = () => {
  //   const [jobs, setJobs] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const jobs = useSelector((state) => state.jobs.content);
  const dispatch = useDispatch();

  const API_JOBS = "https://strive-benchmark.herokuapp.com/api/jobs?limit=5";

  // Caricamento API
  useEffect(() => {
    dispatch(setJobsArray(API_JOBS));
  }, []);

  if (!jobs) return null;

  return (
    <>
      <LeftSideHome></LeftSideHome>

      <div className="container py-4">
        {/* Ricerche recenti  */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Ricerche di offerte di lavoro recenti</h6>
              <button className="btn btn-sm btn-link text-danger">Cancella</button>
            </div>
            <ul className="list-unstyled mb-0 d-flex row text-start">
              <li>
                <strong>3000</strong>
                <br />
                <small className="text-muted">Distretto di Sofia, Bulgaria</small>
              </li>
              <li className="mt-3">
                <strong>salary</strong> · <span className="text-success">15 nuove</span>
                <br />
                <small className="text-muted">Distretto di Sofia, Bulgaria</small>
              </li>
              <li className="mt-3">
                <strong>italian</strong> · <span className="text-success">33 nuove</span>
                <br />
                <small className="text-muted">Distretto di Sofia, Bulgaria</small>
              </li>
            </ul>
            <button className="btn btn-link mt-2 p-0">Vedi altro ▾</button>
          </div>
        </div>

        {/* Banner Premium */}
        <div className="card bg-light mb-4">
          <div className="card-body d-flex align-items-center">
            <div className="me-3">
              <img src="https://placehold.co/48x48" alt="Premium" className="rounded-circle" width="48" height="48" />
            </div>
            <div className="flex-grow-1">
              <p className="mb-1">
                <strong>Fatti notare dai recruiter</strong> con offerte di lavoro personalizzate per te
              </p>
              <small className="text-muted">Milioni di utenti usano Premium</small>
            </div>
            <button className="btn btn-warning ms-3 fw-bold">Prova Premium per 0 EUR</button>
          </div>
          <div className="px-3 pb-2 text-muted small">
            Prova gratuita di 1 mese. Annulli in qualsiasi momento. Ti invieremo un promemoria 7 giorni prima della fine del periodo di prova.
          </div>
        </div>

        {/* Offerte */}
        <div className="card mb-4 text-start">
          <div className="card-body">
            <h5 className="card-title">Le principali offerte di lavoro per te</h5>
            <p className="text-muted small">In base al tuo profilo, preferenze e attività come candidature, ricerche e salvataggi</p>
            {/* {loading ? (
            <div>Caricamento offerte…</div>
          ) : ( */}
            <>
              {jobs.map((job) => (
                <div className="mb-4 border-bottom pb-3" key={job._id}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="mb-1 text-primary">{job.title}</h6>
                      <small className="text-muted">
                        {job.company_name} · {job.candidate_required_location}
                      </small>
                      <div className="mt-1 small text-muted">Promosso · Candidatura semplice</div>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-secondary">✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
            {/* )} */}
            {/* Pulsante "Cerca altre offerte" */}
            <div className="text-center">
              <button className="btn btn-outline-primary">Cerca altre offerte di lavoro →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkedinJobsPage;
