import axios from 'axios'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import Search from '../components/Search'
import contactsLoaders from '../assets/contactsLoaders.gif'

const Chat = () => {

  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [searchContacts, setSearchContacts] = useState('');
  const [loading, setLoading] = useState(true)
  const [sidebar, setSidebar] = useState(true)

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
      setLoading(true)
      const data = await axios.get(`${getAllContactsRoute}/${currentUser._id}`);
      setLoading(false)
      setContacts(data.data);
    };

    getAllContacts();

  }, [navigate]);

  useEffect(() => {
    if (currentUser) {

      socket.current = io(HOST)
      socket.current.emit('add-user', currentUser._id)
    }

  }, [currentUser]);

  const filteredUsers = contacts.filter(contact => contact.username.toLowerCase().includes(searchContacts.toLowerCase()));

  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
    };
  }, []);

  console.log(windowSize);

  return (
    <>
      <div className='chat-container'>
        <div className="chat-container__chat">
          <Logout />
          {/* <GiHamburgerMenu onClick={() => setSidebar(!sidebar)} /> */}
          {sidebar &&
            <div className='chat-container__sidebar'>
              <div className="chat-container__logo">
                <img src={circle} alt="logo" />
                <h3>MAICHAT</h3>
              </div>
              <Search searchContacts={searchContacts} setSearchContacts={setSearchContacts} />
              {loading ?
                <div className='chat-container__loader'>
                  <img src={contactsLoaders} alt="loader" />
                </div>
                : <div className='chat-container__contacts'>
                  {filteredUsers.map((contact) => <Contacts key={contact._id} contact={contact} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />)}
                </div>}
              <CurrentUser currentUser={currentUser} />
            </div>}
          {selectedChat ? <CurrentChat selectedChat={selectedChat} currentUserId={currentUser._id} socket={socket} />
            : <Welcome username={currentUser?.username} sidebar={sidebar} setSidebar={setSidebar} />}
        </div>
      </div>
    </>
  )
}

export default Chat