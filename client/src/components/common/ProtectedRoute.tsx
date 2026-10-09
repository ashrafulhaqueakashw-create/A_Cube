import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from './LoadingPage';

interface ProtectedRouteProps {
  role?: 'student' | 'admin' | 'superadmin';
  allowedRoles?: ('student' | 'admin' | 'superadmin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, allowedRoles }) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  const effectiveRoles = allowedRoles || (role ? [role] : undefined);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (effectiveRoles && user && !effectiveRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (user?.role === 'student') {
    if (user.status === 'pending') {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md text-center">
            <h2 className="mb-2 text-2xl font-bold text-yellow-600">Account Pending</h2>
            <p className="text-gray-600">
              Your account is currently pending approval. You will be able to access the portal once an administrator approves your registration.
            </p>
          </div>
        </div>
      );
    }
    
    if (user.status === 'suspended') {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md text-center">
            <h2 className="mb-2 text-2xl font-bold text-red-600">Account Suspended</h2>
            <p className="text-gray-600">
              Your account has been suspended. Please contact support for more information.
            </p>
          </div>
        </div>
      );
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
