import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAvatar, setAvatarRoute } from '../utils/APIRoutes.js';
import { Buffer } from "buffer";
import loader from '../assets/loader.gif'
import './setAvatar.scss'
import { toast } from 'react-toastify';
import { toastOptions } from '../utils/toastOpts.js';


const SetAvatar = () => {

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAvatar = async () => {
      setLoading(true);
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


  const navigate = useNavigate();

  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem('chat-app-user')
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(data);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <div className='select-avatar'>
      <div className='select-avatar__title'>
        <h1>Select your avatar...</h1>
      </div>
      <div className='select-avatar__avatars'>
        {loading ? <img src={loader} alt="loader" />
          : avatars.map((avatar, index) =>
            <div className={`select-avatar__avatars__avatar ${selectedAvatar === index ? 'select-avatar__avatars__avatar--selected' : ''}`}
              key={index} onClick={() => setSelectedAvatar(index)}>
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
            </div>
          )}
      </div>
      <button disabled={loading} className='select-avatar__btn' onClick={setProfilePicture} >
        Set as Profile Picture
      </button>
    </div>
  )
}

export default SetAvatar