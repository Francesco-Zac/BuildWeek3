import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../redux/action";
import "./LeftSideHome.css";
import { Image } from "react-bootstrap";

const LeftSideHome = () => {
  const profile = useSelector((state) => {
    return state.user.mainUser;
  });

  const dispatch = useDispatch();

  const API_BASE = "https://striveschool-api.herokuapp.com/api/profile";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";

  useEffect(() => {
    dispatch(setUserAction(API_BASE + "/me", TOKEN));
  }, []);

  if (!profile) return null;

  console.log(profile);
  return profile ? (
    <div className="left-side-home">
      <div className="cards-left-side-home">
        <div className="profile-card left-side-profile-card">
          <div className="profile-header">
            <div className="cover-photo left-side-cover-header"></div>

            <div className="profile-photo online left-side-profile-pic-header">
              <img src={profile.image} alt="Profile" className="position-relative" />
              <div className="pinocchio"></div>
            </div>
          </div>

          <div className="profile-info left-side-profile-info">
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex flex-column align-items-start">
                <h1 className="profile-name left-side-profile-name">
                  {profile.name} {profile.surname}
                </h1>
                <p className="profile-headline left-side-profile-headline">{profile.title || "Studente presso EPICODE Institute of Technology"}</p>
                <p className="profile-location left-side-profile-location">{profile.area || "Rende, Calabria, Italia"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-left-side-home">
        <div className="analytics-left-side-div">
          <div className="d-flex justify-content-between align-items-center w-100 borislav">
            <p className="analytics-left-side-p">Visitatori del profilo</p>
            <span className="analytics-left-side-span">4</span>
          </div>

          <p className="analytics-left-side-p">Visualizza tutte le analisi</p>
        </div>
      </div>
      <div className="cards-left-side-home">
        <div className="obj-left-side-div">
          <p>Raggiuti i tuoi obiettivi di carriera</p>
          <p className="obj-left-side-p">Prova premium per 0 EUR 🟨</p>
        </div>
      </div>
      <div className="cards-left-side-home">
        <div className="icons-div-main">
          <div className="icons-div">
            <i className="bi bi-bookmark-fill"></i>
            <p>Elelmenti salvati</p>
          </div>
          <div className="icons-div">
            <i className="bi bi-people-fill"></i>
            <p>Gruppi</p>
          </div>
          <div className="icons-div">
            <i className="bi bi-newspaper"></i>
            <p>Newsletter</p>
          </div>
          <div className="icons-div">
            <i className="bi bi-calendar-week"></i>
            <p>Eventi</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>loading or erorr</p>
    </div>
  );
};

export default LeftSideHome;
