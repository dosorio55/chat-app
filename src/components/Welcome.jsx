import React from 'react';
import welcome from '../assets/welcome.gif';
import './Welcome.scss' 

const Welcome = ({ username }) => {
    return (
        <div className='welcome'>
            <img src={welcome} alt="welcome" />
            <h1>
                Welcome, <span>{username}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    )
}

export default Welcome