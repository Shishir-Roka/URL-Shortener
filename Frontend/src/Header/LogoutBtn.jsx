import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/Slice/AuthSlice.js';


function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
   console.log("logOUt");
   
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200 rounded-full bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
