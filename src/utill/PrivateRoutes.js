import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../customHook/useLocalStorage";
const PrivateRoutes = () => {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;