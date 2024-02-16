import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getLocation } from '../../features/location/locationSlice';

function AdminLocation() {
  const { isLoading, location } = useSelector((store) => store.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">speakers</h1>
        <Link
          to="/admin/location/edit"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          edit location
        </Link>
      </div>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <table className="table text-gray-400 border-separate space-y-6 text-sm">
            <thead className="bg-gray-800 text-gray-500">
              <tr>
                <th className="p-3 text-left capitalize">address</th>
                <th className="p-3 text-left capitalize">room</th>
                <th className="p-3 text-left capitalize">time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">{location.address}</td>
                <td className="p-3">{location.room}</td>
                <td className="p-3">{location.time}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminLocation;
