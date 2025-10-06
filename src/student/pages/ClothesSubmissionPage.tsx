import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase';
import { useSession } from '../../auth/session';

export default function ClothesSubmissionPage() {
  const { user } = useSession();
  const [items, setItems] = useState({ shirt: 0, pant: 0, tshirt: 0, shorts: 0, inner: 0 });
  const [ironing, setIroning] = useState(false);
  const [emergency, setEmergency] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await addDoc(collection(db, 'submissions'), {
      userId: user.uid,
      items,
      services: { ironing, emergency },
      status: 'In Locker',
      createdAt: serverTimestamp(),
    });
    alert('Submitted');
  };

  const set = (key: keyof typeof items, value: number) => setItems((prev) => ({ ...prev, [key]: value }));

  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-xl font-semibold">Clothes Submission</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.keys(items).map((k) => (
          <label key={k} className="bg-white border rounded-lg p-3">
            <div className="text-sm font-medium capitalize">{k}</div>
            <input
              type="number"
              min={0}
              value={(items as any)[k]}
              onChange={(e) => set(k as any, parseInt(e.target.value || '0'))}
              className="mt-2 w-full border rounded-md px-2 py-1"
            />
          </label>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={ironing} onChange={(e) => setIroning(e.target.checked)} />
          <span>Ironing (extra)</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={emergency} onChange={(e) => setEmergency(e.target.checked)} />
          <span>Emergency wash (extra)</span>
        </label>
      </div>
      <button className="bg-brand-600 text-white rounded-md px-4 py-2">Submit</button>
    </form>
  );
}
