import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Search = ({ searchContacts, setSearchContacts }) => {
    return (
        <div className='search'>
            <input type="text" placeholder='find user...' value={searchContacts} onChange={(event) => setSearchContacts(event.target.value)} />
            {searchContacts.length !== 0 &&
                <div className="search__close">
                    <AiOutlineClose onClick={() => setSearchContacts('')} />
                </div>}
        </div>
    )
}

export default Search