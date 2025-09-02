import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import { useEffect } from "react";
import { getCurrentUser } from "./services/userAuth.js";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./Store/Slice/AuthSlice.js";
import AuthLayout from "./AuthLayout.jsx"

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
    <div>
      <Routes>
          <Route
          path="/"
          element={
            <AuthLayout>
              <Home />
            </AuthLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
