import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SharedLayout() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex sm:justify-center sm:items-center">
      <div className="bg-white w-full h-full sm:w-[85vw] sm:h-[85vh] rounded-xl flex flex-col overflow-hidden">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default SharedLayout;
