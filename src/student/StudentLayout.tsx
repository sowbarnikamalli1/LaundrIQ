import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar, { Item } from '../components/Sidebar';
import StudentHome from './pages/StudentHome';
import BookingPage from './pages/BookingPage';
import ClothesSubmissionPage from './pages/ClothesSubmissionPage';
import PaymentPage from './pages/PaymentPage';
import StatusTrackingPage from './pages/StatusTrackingPage';
import OTPOPRPage from './pages/OTPOPRPage';
import ComplaintsPage from './pages/ComplaintsPage';

export default function StudentLayout() {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r bg-white">
          <div className="p-4 border-b text-xl font-semibold">Student</div>
          <nav className="p-2 space-y-1">
            <Item to="/student" label="Home" />
            <Item to="/student/booking" label="Slot Booking" />
            <Item to="/student/clothes" label="Clothes Submission" />
            <Item to="/student/payment" label="Payment" />
            <Item to="/student/status" label="Status Tracking" />
            <Item to="/student/pickup" label="OTP/QR Pickup" />
            <Item to="/student/complaints" label="Complaints" />
          </nav>
        </aside>
        <main className="bg-gray-50">
          <div className="container-app py-6">
            <Routes>
              <Route index element={<StudentHome />} />
              <Route path="booking" element={<BookingPage />} />
              <Route path="clothes" element={<ClothesSubmissionPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="status" element={<StatusTrackingPage />} />
              <Route path="pickup" element={<OTPOPRPage />} />
              <Route path="complaints" element={<ComplaintsPage />} />
              <Route path="*" element={<Navigate to="/student" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
