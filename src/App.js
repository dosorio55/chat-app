import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './components/SetAvatar'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/set-avatar" element={<SetAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App