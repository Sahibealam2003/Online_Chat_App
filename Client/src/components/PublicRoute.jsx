import { Navigate } from "react-router-dom";
import { useAuth } from "../Utils/useAuth";
import { Loader } from "lucide-react";

const PublicRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuth();

  // Auth check running
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // 🔒 If user already logged in → go home
  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
