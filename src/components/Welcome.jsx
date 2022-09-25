import React from 'react';
import welcome from '../assets/welcome.gif';
import './Welcome.scss';
import { GiHamburgerMenu } from 'react-icons/gi';

const Welcome = ({ username, setSidebar }) => {
    return (
        <div className='welcome'>
            <div>
                <GiHamburgerMenu onClick={() => setSidebar(prevState => !prevState)} />
            </div>
            <div>
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