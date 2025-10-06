import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSession } from './session';

export default function LoginPage() {
  const [mode, setMode] = useState<'student' | 'admin'>('student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, role, loading } = useSession();

  if (!loading && user && role) {
    return <Navigate to={role === 'admin' ? '/admin' : '/student'} replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Use Student/Admin ID as email-like login (e.g., id@example.com) or actual email
      const email = id.includes('@') ? id : `${id}@example.com`;
      await signInWithEmailAndPassword(auth, email, password);
      navigate(mode === 'admin' ? '/admin' : '/student');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Login</h1>
          <div className="inline-flex rounded-md bg-gray-100 p-1">
            <button
              onClick={() => setMode('student')}
              className={`px-3 py-1 text-sm rounded ${mode === 'student' ? 'bg-white shadow' : ''}`}
            >
              Student
            </button>
            <button
              onClick={() => setMode('admin')}
              className={`px-3 py-1 text-sm rounded ${mode === 'admin' ? 'bg-white shadow' : ''}`}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{mode === 'admin' ? 'Admin ID' : 'Student ID'}</label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="e.g. STU123 or email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full bg-brand-600 text-white rounded-md py-2 font-medium">Login</button>
        </form>
      </div>
    </div>
  );
}
