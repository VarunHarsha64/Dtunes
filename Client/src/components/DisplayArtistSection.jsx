import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SongForm from './SongForm';
import PlaylistForm from './PlaylistForm';

const DisplayArtistSection = () => {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(0);

    return (
        <div className='artist-page'>
            <nav className='artist-navbar'>
                <div 
                    onClick={() => {
                        setRedirect(0);
                        navigate('/artist/playlist');
                    }} 
                    className={`artist-redirect-header ${redirect === 0 ? 'active' : ''}`}
                >
                    Playlist
                </div>
                <div 
                    onClick={() => {
                        setRedirect(1);
                        navigate('/artist/song');
                    }} 
                    className={`artist-redirect-header ${redirect === 1 ? 'active' : ''}`}
                >
                    Song
                </div>
            </nav>
            <div>
            <Routes>
              <Route path='/song' element={<SongForm/>}/>
              <Route path='/playlist' element={<PlaylistForm/>}/>
            </Routes>
            </div>
        </div>
    );
}

export default DisplayArtistSection;
