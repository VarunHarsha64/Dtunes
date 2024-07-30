import React, { useState,useEffect, useContext } from 'react'
import '../styles/LeftMenu.css';
import { BsMusicNoteList } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import {BiSearchAlt} from 'react-icons/bi';
import { FaSearch } from "react-icons/fa";
import Menu from './Menu';
import { menuList } from './MenuList';
import MenuPlayList from './MenuPlayList';
import TrackList from './TrackList';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/searchContext';



const LeftMenu = () => {
  const [isArtist, setIsArtist] = useState(false);
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(SearchContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        setIsArtist(decodedToken.isArtist);
    }
}, []);

  const handleFocus = (e)=>{
    navigate('/search');
  }

  return (
    <div className='left-menu'>
      <div className="logo-container">
        <BsMusicNoteList className='react-icon' />
        <h2>DTunes</h2>
        <HiDotsHorizontal className='react-icon' />
        
      </div>
      <div className="search-box">
        <div className='search-icon-div'>
            <FaSearch className='search-icon' />
        </div>
        <input onFocus={handleFocus} onChange={e=>setSearchQuery(e.target.value)} type='text' placeholder='Search...' />
      </div>
      <Menu title={"Menu"} menuObject={menuList} isArtist={isArtist}/>
      <MenuPlayList  />
      <TrackList/>
    </div>
  )
}

export default LeftMenu
