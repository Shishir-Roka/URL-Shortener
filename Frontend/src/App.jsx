import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "./services/userAuth.js";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./Store/Slice/AuthSlice.js";
import { Outlet } from 'react-router-dom'
import Header from "./Header/Header.jsx";

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
       dispatch(setLoading(true));
      try {
        const respond = await getCurrentUser();
        if (respond) {
          dispatch(login(respond.data));
        } else {
        dispatch(setLoading(false));
      }
      } catch (error) {
        console.log("error in get user", error);
        dispatch(setLoading(false));
      }
    }

    getUser();
  }, [dispatch]);

  return (
    <>
    <Header/>
     <main> 
        <Outlet />
      </main>
      </>
  );
}

export default App;
