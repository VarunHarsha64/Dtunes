import React, { useState,useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SongForm from "./SongForm";
import PlaylistForm from "./PlaylistForm";
import { jwtDecode } from "jwt-decode";

const DisplayArtistSection = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(0);
  const [isArtist, setIsArtist] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsArtist(decodedToken.isArtist);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <div className="artist-page">
      <nav className="artist-navbar">
        <div
          onClick={() => {
            setRedirect(0);
            navigate("/artist/playlist");
          }}
          className={`artist-redirect-header ${redirect === 0 ? "active" : ""}`}
        >
          Playlist
        </div>
        { isArtist?                
                <div
                    onClick={() => {
                    setRedirect(1);
                    navigate("/artist/song");
                    }}
                    className={`artist-redirect-header ${redirect === 1 ? "active" : ""}`}
                >
                    Song
                </div> : null
        }
      </nav>
      <div>
        <Routes>
          <Route path="/song" element={<SongForm />} />
          <Route path="/playlist" element={<PlaylistForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default DisplayArtistSection;
