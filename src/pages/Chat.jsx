import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Contacts from '../components/Contacts'
import { getAllContactsRoute, HOST } from '../utils/APIRoutes'
import circle from '../assets/circle.png'
import './Chat.scss'
import CurrentUser from '../components/CurrentUser';
import Welcome from '../components/Welcome';
import CurrentChat from '../components/CurrentChat';
import { io } from 'socket.io-client';
import Logout from '../components/Logout';
import { GiHamburgerMenu } from 'react-icons/gi'
import Search from '../components/Search'

const Chat = () => {

  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [sidebar, setSidebar] = useState(false)

  const socket = useRef();
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

  useEffect(() => {
    if (currentUser) {

      socket.current = io(HOST)
      socket.current.emit('add-user', currentUser._id)
    }

  }, [currentUser])

  return (
    <>

      <div className='chat-container'>
        <div className="chat-container__chat">
          <Logout />
          {/* <GiHamburgerMenu onClick={() => setSidebar(!sidebar)} /> */}
            <div className='chat-container__sidebar'>
              <div className="chat-container__logo">
                <img src={circle} alt="logo" />
                <h3>MAICHAT</h3>
              </div>
              <Search />
              <div className='chat-container__contacts'>
                {contacts.map((contact) =>
                  <Contacts key={contact._id} contact={contact} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
                )}
              </div>
              <CurrentUser currentUser={currentUser} />
            </div>
          {
            selectedChat ? <CurrentChat selectedChat={selectedChat} currentUserId={currentUser._id} socket={socket} />
              : <Welcome username={currentUser?.username} />
          }
        </div>
      </div>
    </>
  )
}

export default Chat