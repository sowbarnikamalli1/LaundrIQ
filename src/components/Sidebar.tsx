import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import clsx from 'clsx';

export default function Sidebar({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      <aside className="border-r bg-white">
        <div className="p-4 border-b text-xl font-semibold">Laundry</div>
        <nav className="p-2 space-y-1">
          {children}
        </nav>
      </aside>
      <main className="bg-gray-50">
        <div className="container-app py-6">
          {/* Routed content */}
        </div>
      </main>
    </div>
  );
}

export function Item({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'block rounded-md px-3 py-2 text-sm font-medium',
          isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
        )
      }
    >
      {label}
    </NavLink>
  );
}
