import React, {useContext, useEffect, useState} from 'react';
import { FaPlus } from "react-icons/fa";
import { PlayList } from './PlayList';
import { MdMusicNote } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { PlayerContext } from '../context/playerContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';



const MenuPlayList = () => {
    const location = useLocation();
    const { playlistData } = useContext(PlayerContext);
    console.log( playlistData );
    const [userId, setUserId] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);


    const handleItemClick = (id)=>{
        navigate(`/album/${id}`);
    }
    const navigate = useNavigate();

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
                  console.log(response.data)
                  setPlaylists(response.data);
                  console.log(response.data);
              } catch (error) {
                  console.error('Error fetching playlists:', error);
              }
          };

          fetchPlaylists();
      }
  }, [userId]);

  useEffect(()=>{
    setActiveIndex(location.pathname.split('/').pop());
  },[location])

  const handleAddPlaylist = () => {
    navigate('/artist/playlist');
  }


  return (
    <div className='playlist-container'>
      <div className="name-container">
        <p>My PlayList</p>
        <i onClick={handleAddPlaylist} className='add-playlist-icon'><FaPlus/></i>
      </div>
      <div className="playlist-scroll">
        
        {
            playlists ? playlists.map((list,index)=>{
              
                return <div onClick={()=>handleItemClick(list._id)} key={index} className={`playlist ${list._id === activeIndex ? 'active' : ''}`}>
                    <i className='list'><MdMusicNote/></i>
                    <p>{list.name}</p>
                    <i className='trash'><IoTrash/></i>
                </div>
            }) : null
        }
      </div>
    </div>
  )
}

export default MenuPlayList
