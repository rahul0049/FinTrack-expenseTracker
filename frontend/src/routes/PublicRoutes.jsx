import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore.jsx";
const PublicRoute = ({ children }) => {
  const token = useAuthStore((state)=>state.token)

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
