import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Contacts from '../components/Contacts'
import { getAllContactsRoute } from '../utils/APIRoutes'
import circle from '../assets/circle.png'
import './Chat.scss'
import CurrentUser from '../components/CurrentUser'
import Welcome from '../components/Welcome'
import CurrentChat from '../components/CurrentChat'


const Chat = () => {

  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(undefined);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('chat-app-user'));
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return
    } else if (!currentUser.isAvatarImageSet) {
      navigate('/set-avatar');
      return
    }
    const getAllContacts = async () => {
      const data = await axios.get(`${getAllContactsRoute}/${currentUser._id}`);
      setContacts(data.data);
    };

    getAllContacts();

  }, [navigate]);

  console.log(selectedChat);

  return (
    <>
      <div className='chat-container'>
        <div className="chat-container__chat">
          <div className='chat-container__sidebar'>
            <div className="chat-container__logo">
              <img src={circle} alt="logo" />
              <h3>MAICHAT</h3>
            </div>
            <div className='chat-container__contacts'>
              {contacts.map((contact) =>
                <Contacts key={contact._id} contact={contact} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
              )}
            </div>
            <CurrentUser currentUser={currentUser} />
          </div>
          {
            selectedChat ? <CurrentChat selectedChat={selectedChat}/>
              : <Welcome username={currentUser.username} />
          }
        </div>
      </div>
    </>
  )
}

export default Chat