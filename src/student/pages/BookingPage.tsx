import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, doc, getDoc, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from '../../auth/session';
import { format } from 'date-fns';

interface Slot {
  id: string;
  start: string; // ISO
  capacity: number;
  bookedCount: number;
}

export default function BookingPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const { user } = useSession();

  useEffect(() => {
    const q = query(collection(db, 'slots'));
    const unsub = onSnapshot(q, (snap) => {
      const list: Slot[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        list.push({
          id: d.id,
          start: data.start,
          capacity: data.capacity,
          bookedCount: data.bookedCount || 0,
        });
      });
      setSlots(list);
    });
    return () => unsub();
  }, []);

  const handleBook = async (slotId: string) => {
    if (!user) return;
    const slotRef = doc(db, 'slots', slotId);
    const slotSnap = await getDoc(slotRef);
    const slot = slotSnap.data() as any;
    if (!slot) return;
    if ((slot.bookedCount || 0) >= slot.capacity) {
      alert('Slot full');
      return;
    }
    await addDoc(collection(db, 'bookings'), {
      slotId,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
    // Cloud Function should increment bookedCount atomically; this is placeholder
    alert('Booked!');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Slots</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((s) => (
          <div key={s.id} className="bg-white border rounded-lg p-4">
            <div className="font-medium">{format(new Date(s.start), 'PPpp')}</div>
            <div className="text-sm text-gray-600">{s.bookedCount}/{s.capacity} booked</div>
            <button
              onClick={() => handleBook(s.id)}
              className="mt-3 w-full bg-brand-600 text-white rounded-md py-2 text-sm"
              disabled={s.bookedCount >= s.capacity}
            >
              Book Slot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
