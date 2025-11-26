import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
   
  }, [isAuthenticated, loading, navigate]);

  if (loading)  return <div>Loading...</div>;; 

  return <>{children}</>;
}
