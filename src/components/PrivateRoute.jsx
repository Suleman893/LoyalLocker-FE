import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./login/login";

const PrivateRoute = ({ role, children }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo || userInfo?.role !== role) {
      navigate("/");
    }
  }, [userInfo?.role, navigate]);

  return <>{userInfo?.role === role ? <>{children}</> : <Login />}</>;
};

export default PrivateRoute;
