import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from '../../auth/session';

export default function PaymentPage() {
  const { user } = useSession();
  const [amount, setAmount] = useState(100);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const pay = async () => {
    if (!user) return;
    // Placeholder for Razorpay/Stripe/UPI integration frontend
    // Assume payment success for prototype
    await addDoc(collection(db, 'payments'), {
      userId: user.uid,
      amount,
      status: 'success',
      createdAt: serverTimestamp(),
    });
    setStatus('success');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Payment</h2>
      <div className="bg-white border rounded-lg p-4 max-w-md">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value || '0'))}
          className="w-full border rounded-md px-3 py-2"
        />
        <button onClick={pay} className="mt-3 w-full bg-brand-600 text-white rounded-md py-2">Pay</button>
        {status === 'success' && <p className="text-green-600 mt-2">Payment successful</p>}
      </div>
    </div>
  );
}
