import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAvatar } from '../utils/APIRoutes.js';
import { Buffer } from "buffer";

const SetAvatar = () => {

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(false)

    useEffect(() => {
     const getAvatar = async () => {

       const data = [];
       for (let i = 0; i < 4; i++) {
         const image = await axios.get(
           `${apiAvatar}/${Math.round(Math.random() * 1000)}`
         );
         const buffer = new Buffer(image.data);
         data.push(buffer.toString("base64"));
       }
       setAvatars(data);
       setLoading(false);
     }
     getAvatar()
    }, []);


  console.log(avatars);
  const navigate = useNavigate();

  const setProfilePicture = () => {

  }

  return (
    <div>
      <div className='tittle-container'>
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className='avatars'>
        {avatars.map((avatar, index) => 
        <div>
          <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
        </div>
        )}
      </div>
    </div>
  )
}

export default SetAvatar