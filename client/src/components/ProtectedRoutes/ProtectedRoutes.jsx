import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoutes = ({ isAuthenticated, children }) => {

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoutes;