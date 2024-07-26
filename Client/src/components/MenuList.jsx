import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { BiParty } from "react-icons/bi";
import { MdOutlineTrackChanges } from "react-icons/md";


export const menuList = [
    {
        id: 1,
        icon : <FaHome/>,
        name: "Home",
    },
    {
        id: 2,
        icon : <FaThumbsUp/>,
        name: "Like",
    },
    {
        id: 3,
        icon : <FaThumbsDown/>,
        name: "Dislike",
    },
    {
        id: 4,
        icon : <FaUserFriends/>,
        name: "Friends",
    },
    {
        id: 5,
        icon : <BiParty/>,
        name: "Party",
    },
    {
        id: 6,
        icon : <MdOutlineTrackChanges />,
        name: "Artist",
        ifArtist: true,
    }
]

