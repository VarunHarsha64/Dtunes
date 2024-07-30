import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import {toast, Toaster} from 'react-hot-toast'

const PlaylistForm = () => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [desc, setDesc] = useState('');
    const [privateStatus, setPrivateStatus] = useState(false);

    useEffect(() => {
      // Get the token from local storage or cookies
      const token = localStorage.getItem('token');
      if (token) {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          setUserId(decodedToken.id);
      }
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const playlistData = {
            name,
            userId,
            image:imageFile,
            desc,
            privateStatus,
        };

        try {

            const response = await axios.post('/api/album/add', playlistData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }

            }); 
            if(response.data.error) {
              toast.error(response.data.error);
              
            } else {
              toast.success('Playlist created successfully!');
              setName('');
              setImageFile(null);
              setDesc('');
              setPrivateStatus(false);
            }
            

            
            
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    return (
      <div className='playlist-form-container'>
        <form className='playlist-form' onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
            <label>Image File:</label>
                <input 
                    type="file" 
                    onChange={(e) => setImageFile(e.target.files[0])} 
                    required 
                />
            </div>
            <br/>
            <div>
                <label>Description:</label>
                <input 
                    type="text" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                />
            </div>
            <div>
                <label>Private:</label>
                <input 
                    type="checkbox" 
                    checked={privateStatus} 
                    onChange={(e) => setPrivateStatus(e.target.checked)} 
                /> Choose to set Playlist as Private
            </div>
            <button onClick={handleSubmit} type="submit">Create Playlist</button>
        </form>
      </div>
        
    );
};

export default PlaylistForm;
