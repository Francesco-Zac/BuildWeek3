import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProfileFriend = () => {
  const [currentProfile, setCurrentProfile] = useState();
  const params = useParams();
  console.log(params);

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

  return <h1>hello</h1>;
};

export default ProfileFriend;
