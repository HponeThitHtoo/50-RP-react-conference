import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getLocation,
  updateLocation,
} from '../../features/location/locationSlice';

import FormRow from '../components/FormRow';

const initialState = {
  address: '',
  room: '',
  time: '',
};

function EditLocation() {
  const [values, setValues] = useState(initialState);
  const { isEditLoading, location, editLocation } = useSelector(
    (store) => store.location
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const clearFields = () => {
    setValues(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { address, room, time } = values;
    if (!address || !room || !time) {
      toast.warn('Please fill all fileds');
      return;
    }

    dispatch(updateLocation({ id: location.id, address, room, time }));
    clearFields();
  };

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {
    if (location) setValues(location);
  }, [location]);

  useEffect(() => {
    if (editLocation) {
      setTimeout(() => {
        navigate('/admin/location');
      }, 2000);
    }
  }, [editLocation, navigate]);

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">edit location</h1>
        <Link
          to="/admin/location"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          back to location
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <form
          action=""
          className="space-y-4 text-white w-full md:w-2/3"
          onSubmit={handleSubmit}
        >
          {/* address field */}
          <FormRow
            type="text"
            name="address"
            value={values.address}
            handleChange={handleChange}
          />

          {/* room field */}
          <FormRow
            type="text"
            name="room"
            value={values.room}
            handleChange={handleChange}
          />

          {/* time field */}
          <FormRow
            type="text"
            name="time"
            value={values.time}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="block w-full py-2 rounded-md bg-white text-black duration-200 hover:brightness-75 disabled:cursor-not-allowed"
            disabled={isEditLoading}
          >
            {isEditLoading ? 'loading' : 'submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLocation;
