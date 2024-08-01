import React, { useContext } from 'react'
import LeftMenu from '../components/LeftMenu.jsx';
import MainContainer from '../components/MainContainer'
import RightMenu from '../components/RightMenu';
import { useOverlay } from '../context/overlayContext.jsx';
const Home = () => {

  const { isOverlayOpen, overlayContent, showOverlay, hideOverlay} = useOverlay();
  return (
    <div className='app'>
      {
        isOverlayOpen && (
          <div className='overlay' onClick={hideOverlay}>
            <div onClick={e => e.stopPropagation()} className='overlay-content'>{overlayContent}</div>
          </div>
        )
      }
        <LeftMenu />
        <MainContainer/>
        <RightMenu/>
      <div className='background'></div>
    </div>
  )
}

export default Home
