/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center mx-10 my-6">
        <span className="font-montserrat font-black text-2xl">ReactCamp</span>
        <ul className="hidden md:flex space-x-3 lg:space-x-6 font-montserrat font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-b-purple-700 p-2 capitalize'
                  : 'p-2 capitalize hover:bg-purple-600 hover:text-white hover:rounded duration-300'
              }
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/location"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-b-purple-700 capitalize'
                  : 'p-2 capitalize hover:bg-purple-600 hover:text-white hover:rounded duration-300'
              }
            >
              location
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/food"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-b-purple-700 capitalize'
                  : 'p-2 capitalize hover:bg-purple-600 hover:text-white hover:rounded duration-300'
              }
            >
              food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-b-purple-700 capitalize'
                  : 'p-2 capitalize hover:bg-purple-600 hover:text-white hover:rounded duration-300'
              }
            >
              schedule
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rules"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-b-purple-700 capitalize'
                  : 'p-2 capitalize hover:bg-purple-600 hover:text-white hover:rounded duration-300'
              }
            >
              rules
            </NavLink>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          id="menu-btn"
          type="button"
          className={`block md:hidden ${
            menuOpen ? 'hamburger open' : 'hamburger'
          }`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-top" />
          <span className="hamburger-middle" />
          <span className="hamburger-bottom" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`bg-black mx-10 duration-500 font-montserrat ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="w-full h-full py-5 space-y-3">
          <li className="" onClick={() => setMenuOpen((open) => !open)}>
            <NavLink
              to="/"
              className="flex justify-center items-center text-white duration-300 hover:text-purple-600"
            >
              Home
            </NavLink>
          </li>
          <li className="" onClick={() => setMenuOpen((open) => !open)}>
            <NavLink
              to="/location"
              className="flex justify-center items-center text-white duration-300 hover:text-purple-600"
            >
              Location
            </NavLink>
          </li>
          <li className="" onClick={() => setMenuOpen((open) => !open)}>
            <NavLink
              to="/food"
              className="flex justify-center items-center text-white duration-300 hover:text-purple-600"
            >
              Food
            </NavLink>
          </li>
          <li className="" onClick={() => setMenuOpen((open) => !open)}>
            <NavLink
              to="/schedule"
              className="flex justify-center items-center text-white duration-300 hover:text-purple-600"
            >
              Schedule
            </NavLink>
          </li>
          <li className="" onClick={() => setMenuOpen((open) => !open)}>
            <NavLink
              to="/rules"
              className="flex justify-center items-center text-white duration-300 hover:text-purple-600"
            >
              Rules
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
