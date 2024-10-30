import React, { useState } from 'react'
import Profileinfo from '../Cards/Profileinfo'
import {useNavigate} from "react-router-dom"
import SearchBar from '../Searchbar/SearchBar';

const Navbar = () => {
  const [searchQuerry , setSearchQuerry] = useState('');

  const navigate = useNavigate();
  const onLogout = () => {
      navigate("/login");
  };

  const handleSearch = () => {

  }

  const onClearSearch = () =>{
    setSearchQuerry("")
  }

  return (
    <>
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">SnapNote</h2>

        <SearchBar
        value={searchQuerry}
        onChange={({target})=>{
          setSearchQuerry(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />

    <Profileinfo onLogout={onLogout}/>
    </div>

    </>
  )
}

export default Navbar
