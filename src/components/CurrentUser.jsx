import React from 'react'

const CurrentUser = ({ currentUser }) => {
    return (
        <div className="current-user">
            <div className="current-user__avatar">
                <img src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`} alt="avatar" />
            </div>
            <h2>{currentUser?.username}</h2>
        </div>
    )
}

export default CurrentUser