import { Navigate, useLocation } from 'react-router-dom';
import { getCookieItem } from '../Utils/cookiesHelper';

type AuthGuardProps = {
    children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
    const userRole = getCookieItem('roleName');
    const location = useLocation();
    const isPublicRoute = location.pathname === '/login' || location.pathname === '/signup';
    
    // If trying to access public routes (login/signup)
    if (isPublicRoute) {
        if (userRole) {
            // Redirect based on role if user is already logged in
            switch (userRole) {
                case 'Manager':
                    return <Navigate to="/pending-requests" replace />;
                case 'Employee':
                    return <Navigate to="/request-access" replace />;
                case 'Admin':
                    return <Navigate to="/create-software" replace />;
                default:
                    return <Navigate to={location.pathname} replace />;
            }
        }
        return <>{children}</>;
    }

    // For protected routes
    if (!userRole) {
        return <Navigate to="/login" replace />;
    }

    // Role-based access control for protected routes
    switch (userRole) {
        case 'Manager':
            if (location.pathname !== '/pending-requests') {
                return <Navigate to="/pending-requests" replace />;
            }
            break;
        case 'Employee':
            if (location.pathname !== '/request-access') {
                return <Navigate to="/request-access" replace />;
            }
            break;
        case 'Admin':
            if (location.pathname !== '/create-software') {
                return <Navigate to="/create-software" replace />;
            }
            break;
        default:
            return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default AuthGuard; 