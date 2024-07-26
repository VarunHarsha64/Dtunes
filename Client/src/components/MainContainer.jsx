import React from 'react';
import '../styles/MainContainer.css';
import {Route, Routes, useLocation} from 'react-router-dom'
import DisplayHome from './DisplayHome';
import DisplayPlayList from './DisplayPlayList';
import Player from './Player';
import { SongList } from './SongList.jsx';
import DisplayArtistSection from './DisplayArtistSection.jsx';

const MainContainer = () => {
  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={<DisplayHome/>}/>
        <Route path='/album/:id' element={<DisplayPlayList/>}/>
        <Route path='/artist/*' element={<DisplayArtistSection/>} />
      </Routes>
      <br></br>
      <Player song={SongList[0]} imgSrc={SongList[0].image}/>
    </div>
  )
}

export default MainContainer;
