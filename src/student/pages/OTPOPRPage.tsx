import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from '../../auth/session';
import QRCode from 'qrcode.react';

interface OTPDoc {
  id: string;
  code: string;
  expiresAt: any;
  submissionId: string;
}

export default function OTPOPRPage() {
  const { user } = useSession();
  const [otps, setOtps] = useState<OTPDoc[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'otp'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const list: OTPDoc[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        list.push({ id: d.id, code: data.code, expiresAt: data.expiresAt, submissionId: data.submissionId });
      });
      setOtps(list);
    });
    return () => unsub();
  }, [user]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">OTP / QR for Pickup</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {otps.map((o) => (
          <div key={o.id} className="bg-white border rounded-lg p-4 flex flex-col items-center">
            <div className="font-medium">Submission {o.submissionId.slice(0, 6)}</div>
            <div className="text-sm text-gray-600">OTP: {o.code}</div>
            <QRCode value={o.code} className="mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
