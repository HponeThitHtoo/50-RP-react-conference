import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

// https://mambaui.com/components/sidebar
// https://tailwind-elements.com/docs/standard/navigation/sidenav/

function DashboardSharedLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-darkDashboard min-h-screen flex overflow-hidden">
      <Navbar menuOpen={menuOpen} />
      <main className="px-10 py-2 flex-1 max-w-full">
        {/* Hamburger */}
        <button
          id="menu-btn"
          type="button"
          className={`${menuOpen ? 'hamburger open' : 'hamburger'}`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-top" />
          <span className="hamburger-middle" />
          <span className="hamburger-bottom" />
        </button>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardSharedLayout;
