import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useSession } from '../../auth/session';

interface Submission {
  id: string;
  status: 'In Locker' | 'Picked' | 'Washing' | 'Completed' | 'Ready for Pickup';
  items: Record<string, number>;
}

export default function StatusTrackingPage() {
  const { user } = useSession();
  const [subs, setSubs] = useState<Submission[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'submissions'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const list: Submission[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        list.push({ id: d.id, status: data.status, items: data.items });
      });
      setSubs(list);
    });
    return () => unsub();
  }, [user]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Laundry Status</h2>
      <div className="grid gap-3">
        {subs.map((s) => (
          <div key={s.id} className="bg-white border rounded-lg p-4">
            <div className="font-medium">Submission {s.id.slice(0, 6)}</div>
            <div className="text-sm text-gray-600">Status: {s.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
