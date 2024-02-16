// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { IoIosPeople } from 'react-icons/io';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdLocationCity, MdLogout, MdOutlineRule } from 'react-icons/md';
import { IoFastFood } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../features/user/userSlice';

function Navbar({ menuOpen }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <nav
      className={`flex flex-col bg-darkDashboardNav gap-y-7 w-60 p-10 duration-300 ${
        menuOpen ? 'ml-0' : '-ml-60'
      }`}
    >
      <div className="flex items-center gap-x-2">
        <div>
          <img
            src={
              user?.image ||
              `https://ui-avatars.com/api/?name=tester&background=0D8ABC&color=fff`
            }
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div>
          <p className="text-lg text-white">{user?.name}</p>
          <p className="text-sm text-gray-400">view profile</p>
        </div>
      </div>
      <NavLink
        to="/admin/speakers"
        className="flex items-center space-x-4 p-2 hover:bg-gray-600"
      >
        <IoIosPeople className="text-gray-400 text-xl" />
        <span className="text-white text-lg font-thin tracking-wide capitalize">
          speakers
        </span>
      </NavLink>
      <NavLink className="flex items-center space-x-4 p-2 hover:bg-gray-600">
        <AiOutlineSchedule className="text-gray-400 text-xl" />
        <span className="text-white text-lg font-thin tracking-wide capitalize">
          schedule
        </span>
      </NavLink>
      <NavLink
        to="/admin/location"
        className="flex items-center space-x-4 p-2 hover:bg-gray-600"
      >
        <MdLocationCity className="text-gray-400 text-xl" />
        <span className="text-white text-lg font-thin tracking-wide capitalize">
          location
        </span>
      </NavLink>
      <NavLink
        to="/admin/foods"
        className="flex items-center space-x-4 p-2 hover:bg-gray-600"
      >
        <IoFastFood className="text-gray-400 text-xl" />
        <span className="text-white text-lg font-thin tracking-wide capitalize">
          food
        </span>
      </NavLink>
      <NavLink
        to="/admin/rules"
        className="flex items-center space-x-4 p-2 hover:bg-gray-600"
      >
        <MdOutlineRule className="text-gray-400 text-xl" />
        <span className="text-white text-lg font-thin tracking-wide capitalize">
          rules
        </span>
      </NavLink>
      <div className="w-full h-[1px] rounded-full bg-gray-400" />
      <button
        type="button"
        className="flex items-center space-x-4 p-2 hover:bg-gray-600"
        onClick={() => dispatch(logoutUser())}
      >
        <MdLogout className="text-gray-400 text-xl" />
        <span className="text-white text-lg font-thin tracking-wide capitalize">
          Logout
        </span>
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
};

export default Navbar;
