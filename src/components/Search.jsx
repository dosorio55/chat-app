import React from 'react'

const Search = ({ searchContacts, setSearchContacts }) => {
    return (
        <div className='search'>
            <input type="text" placeholder='find user...' value={searchContacts} onChange={(event) => setSearchContacts(event.target.value)} />
        </div>
    )
}

export default Search