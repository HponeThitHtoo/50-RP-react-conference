import React, { useEffect } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaPlaceOfWorship } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import { getLocation } from '../features/location/locationSlice';

// https://dribbble.com/shots/18485811-Parcel-Delivery-App-Design

function Location() {
  const { isLoading, location } = useSelector((store) => store.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  return (
    <section className="flex flex-col-reverse md:flex-row flex-1 mx-10 mb-4 gap-3 font-lato">
      {isLoading ? (
        <div className="flex flex-col md:w-1/3 bg-purple-700 rounded-md p-6 space-y-6 text-white">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col md:w-1/3 bg-purple-700 rounded-md p-6 space-y-6">
          <div className="flex items-center gap-x-6">
            <span className="w-8 h-8 bg-white flex justify-center items-center rounded-full relative test">
              <IoLocationOutline />
            </span>
            <div className="text-white">
              <h3 className="uppercase text-md">location</h3>
              <p className="text-xs text-plum">{location.address}</p>
            </div>
          </div>
          <div className="flex gap-x-6">
            <span className="w-8 h-8 bg-white flex justify-center items-center rounded-full relative test">
              <FaPlaceOfWorship />
            </span>
            <div className="text-white">
              <h3 className="uppercase text-md">room</h3>
              <p className="text-xs text-plum">{location.room}</p>
            </div>
          </div>
          <div className="flex gap-x-6">
            <span className="w-8 h-8 bg-white flex justify-center items-center rounded-full">
              <BiTime />
            </span>
            <div className="text-white">
              <h3 className="uppercase text-md">time</h3>
              <p className="text-xs text-plum">{location.time}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 md:w-2/3">
        <iframe
          title="MICT Park Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7637.060677544409!2d96.129215!3d16.84964!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c194eb70b00001%3A0xb2a1f5694971b1b6!2sMICT%20Park%20Main%20Building!5e0!3m2!1sen!2smm!4v1676881359344!5m2!1sen!2smm"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded-md"
        />
      </div>
    </section>
  );
}

export default Location;
