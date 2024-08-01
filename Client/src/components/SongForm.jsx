import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast, Toaster } from 'react-hot-toast';

const SongForm = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [userId, setUserId] = useState();
    const [audioFile, setAudioFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [playlistId, setPlaylistId] = useState('');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setUserId(decodedToken.id);
            console.log(userId);
        }
    },[] );

    useEffect(() => {
        if(userId) {
            const fetchPlaylists = async () => {
                
                try {
                    console.log(userId);
                    const response = await axios.get(`/api/album/userGet/${userId}`);
                    setPlaylists(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching playlists:', error);
                }
            };

            fetchPlaylists();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const songData = {
            title,
            artist,
            lyrics,
            releaseDate,
            audio:audioFile,
            image:imageFile,
            artistId: userId,
        }

        try {
            const response1 = await axios.post('/api/song/add', songData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response1);

            if (response1.data.error) {
                toast.error(response1.data.error);
            } else {
                toast.success('Song uploaded successfully!');

                const response2 = await axios.post('/api/album/addToAlbum',{
                    albumId : playlistId,
                    songId : response1.data.song._id
                });
                if (response2.data.error) {
                    toast.error(response2.data.error);
                }
                setTitle('');
                setArtist('');
                setLyrics('');
                setReleaseDate('');
                setAudioFile(null);
                setImageFile(null);
                setPlaylistId('');
            }
        } catch (error) {
            console.error('Error uploading song:', error);
            toast.error('Error uploading song or adding to playlist');
        }
    };

    return (
        <div className='song-form-container'>
            <Toaster />
            <form className='song-form' onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Artist:</label>
                    <input 
                        type="text" 
                        value={artist} 
                        onChange={(e) => setArtist(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Lyrics:</label>
                    <textarea 
                        value={lyrics} 
                        onChange={(e) => setLyrics(e.target.value)} 
                    />
                </div>
                <div className='song-form-small-details'>
                <div>
                    <label>Release Date:</label>
                    <input 
                        type="date" 
                        value={releaseDate} 
                        onChange={(e) => setReleaseDate(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Audio File:</label>
                    <input 
                        className='song-form-audio-file song-form-file'
                        type="file" 
                        onChange={(e) => setAudioFile(e.target.files[0])} 
                        required 
                    />
                </div>
                <div>
                    <label>Image File:</label>
                    <input 
                        className='song-form-image-file song-form-file'
                        type="file" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                        required 
                    />
                </div>
                <div>
                    <label>Playlist:</label>
                    <select 
                        value={playlistId} 
                        onChange={(e) => setPlaylistId(e.target.value)}
                        required
                    >
                        <option value="">Select Playlist</option>
                        {playlists.map((playlist) => (
                            <option key={playlist._id} value={playlist._id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
                <button type="submit">Upload Song</button>
            </form>
        </div>
    );
};

export default SongForm;
