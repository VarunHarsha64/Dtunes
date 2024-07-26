import React from 'react'
import LeftMenu from '../components/LeftMenu.jsx';
import MainContainer from '../components/MainContainer'
import RightMenu from '../components/RightMenu';
const Home = () => {
  return (
    <div className='app'>
        <LeftMenu />
        <MainContainer/>
        <RightMenu/>
      <div className='background'></div>
    </div>
  )
}

export default Home
