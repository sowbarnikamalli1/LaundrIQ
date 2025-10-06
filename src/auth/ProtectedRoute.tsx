import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession, UserRole } from './session';

export default function ProtectedRoute({ role, children }: { role: UserRole; children: ReactNode }) {
  const { user, role: currentRole, loading } = useSession();
  const location = useLocation();

  if (loading) return null;

  if (!user || currentRole !== role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
