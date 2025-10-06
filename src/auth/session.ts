import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { auth, db } from '../firebase';

export type UserRole = 'student' | 'admin';

interface SessionState {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  setRole: (role: UserRole | null) => void;
}

export const useSession = create<SessionState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setRole: (role) => set({ role }),
}));

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    useSession.setState({ user: null, role: null, loading: false });
    return;
  }
  let role: UserRole | null = null;
  try {
    const roleSnap = await getDoc(doc(db, 'roles', user.uid));
    if (roleSnap.exists()) {
      role = roleSnap.data().role as UserRole;
    }
  } catch {}
  useSession.setState({ user, role, loading: false });
});
