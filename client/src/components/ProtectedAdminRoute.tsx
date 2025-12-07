import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const ADMIN_EMAIL = 'neelanshu.2024@nst.rishihood.edu.in';

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Check if user is authenticated and has the correct email
    if (!isAuthenticated || !user || user.email !== ADMIN_EMAIL) {
        // Redirect to home if not authorized
        return <Navigate to="/" replace />;
    }

    // If authorized, render the child routes
    return <Outlet />;
};

export default ProtectedAdminRoute;
