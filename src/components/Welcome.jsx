import React from 'react';
import welcome from '../assets/welcome.gif';
import './Welcome.scss';
import { AiFillStepBackward } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import Logout from './Logout';

const Welcome = ({ username, handleSidebar, sidebar }) => {
    return (
        <div className='welcome'>
            <div className='welcome__header'>
                {sidebar ? <AiFillStepBackward onClick={handleSidebar} />
                    : <FiMenu onClick={handleSidebar} />}
            <Logout />
            </div>
            <div className='welcome__logo'>
                <img src={welcome} alt="welcome" />
                <h1>
                    Welcome, <span>{username}!</span>
                </h1>
                <h3>Please select a chat to Start messaging.</h3>
            </div>
        </div>
    )
}

export default Welcome