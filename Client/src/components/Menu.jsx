import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Menu = ({title,menuObject, isArtist}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      // Update activeIndex based on the current URL
      if (location.pathname === '/') {
        setActiveIndex(0);
      }
      else if (location.pathname.startsWith('/artist')){
        setActiveIndex(5);
      }
      else {
        setActiveIndex(null);
      }
    }, [location]);

    const handleItemClick = (index)=>{
        setActiveIndex(index);
        if (index === 0) {
          navigate('/');
        }
        if(index === 5) {
          navigate('/artist/playlist');
        }
    }

  return (
    <div className='menu-container'>
      <p className='title'>{title}</p>
      <ul>
        {
            menuObject && menuObject.map((menu,index)=>{
              if((index == 5) && !isArtist) return;
                return <li onClick={()=>handleItemClick(index)} className={index === activeIndex ? 'active' : ''} key={menu.id} ><a>{menu.icon}<span>{menu.name}</span></a></li>
            })
        }
      </ul>
    </div>
  )
}

export default Menu
