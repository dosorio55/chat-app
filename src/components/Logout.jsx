import React from 'react'
import { FiPower } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Logout.scss'

const Logout = () => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <button className='logout-btn' onClick={handleLogOut}>
            <FiPower />
        </button>
    )
}

export default Logout