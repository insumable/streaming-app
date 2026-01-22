import React from 'react'

//props is an object
//props = {searchTerm,setSearchTerm}
export const Search = ({searchTerm,setSearchTerm}) => {
    return (
        <div className="search">
            <div >
                <img src="search.svg"/>
                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    //event listener on every event change ie on every character typed setvalue to searchterm
                />
            </div>
        </div>
    )
}
