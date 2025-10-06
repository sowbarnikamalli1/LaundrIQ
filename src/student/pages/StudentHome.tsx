import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function StudentHome() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Welcome</h2>
        <button onClick={() => signOut(auth)} className="text-sm text-red-600">Logout</button>
      </div>
      <p className="text-gray-700">Use the sidebar to manage your laundry.</p>
    </div>
  );
}
