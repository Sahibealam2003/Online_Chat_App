import { Navigate } from "react-router-dom";
import { useAuth } from "../Utils/useAuth";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuth();

  // Auth check in progress
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated
  return children;
};

export default ProtectedRoute;
