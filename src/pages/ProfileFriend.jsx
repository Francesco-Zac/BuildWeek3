import test from "node:test";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Experiences from "../components/Experiences";
import Sidebar from "../components/Sidebar";

const ProfileFriend = () => {
  const [currentProfile, setCurrentProfile] = useState();
  const params = useParams();
  console.log(params.userID);

  const API_BASE = `https://striveschool-api.herokuapp.com/api/profile/${params.userID}`;
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlYmZjOWIxMGJmMDAwMTVjZjIyYjAiLCJpYXQiOjE3NDg5NDI3OTMsImV4cCI6MTc1MDE1MjM5M30.zt8TWcMqLwO6oYyfg5qvdD3KlS8YUn-F6igqfPGjVGQ";

  const fetchProfileFriend = async () => {
    try {
      const response = await fetch(API_BASE, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("errore nella fetch");
      }
      const data = await response.json();
      setCurrentProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileFriend();
  }, []);

  if (!currentProfile) {
    return null;
  }

  return (
    // test

    <>
      <div className="main-section">
        {/* Profile Header Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="cover-photo position-relative"></div>
            <div className="profile-photo">
              {currentProfile.image ? <img src={currentProfile.image} alt="Profile" /> : <div className="profile-photo-placeholder"></div>}
            </div>
          </div>

          <div className="profile-info">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="profile-name">
                  {currentProfile.name} {currentProfile.surname}
                </h1>
                <p className="profile-headline">{currentProfile.title || "Studente presso EPICODE Institute of Technology"}</p>
                <p className="profile-location">
                  {currentProfile.area || "Rende, Calabria, Italia"} · <span className="contact-info">Informazioni di contatto </span>
                </p>
                <div className="availability">
                  <span className="available-badge">Disponibile per</span>
                </div>
              </div>
              <div className="profile-experiences mt-3">
                <h6 className="fw-bold mb-2">Esperienze recenti</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <Experiences userId={currentProfile._id} token={TOKEN} />
      </div>
    </>

    // fine test
  );
};

export default ProfileFriend;
