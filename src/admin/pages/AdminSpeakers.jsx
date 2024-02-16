import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md';

import {
  getSpeakers,
  deleteSpeaker,
} from '../../features/speakers/speakersSlice';

// https://tailwindcomponents.com/component/table-4

function AdminSpeakers() {
  const { isLoading, speakers } = useSelector((store) => store.speakers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpeakers());
  }, [dispatch]);

  const handleDelete = (id) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmedToDelete = confirm('Are you sure want to delete?');

    if (confirmedToDelete) {
      dispatch(deleteSpeaker(id));
    }
  };

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">speakers</h1>
        <Link
          to="/admin/speakers/add"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          add speaker
        </Link>
      </div>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <table className="table text-gray-400 border-separate space-y-6 text-sm">
            <thead className="bg-gray-800 text-gray-500">
              <tr>
                <th className="p-3 text-left capitalize">name & occupation</th>
                <th className="p-3 text-left capitalize">company</th>
                <th className="p-3 text-left capitalize">Action</th>
              </tr>
            </thead>
            <tbody>
              {speakers.map((speaker) => (
                <tr key={speaker.id} className="bg-gray-800">
                  <td className="p-3">
                    <div className="flex align-items-center">
                      <img
                        className="rounded-full h-12 w-12  object-cover"
                        src={speaker.image}
                        alt="speaker"
                      />
                      <div className="ml-3">
                        <div className="">{speaker.name}</div>
                        <div className="text-gray-500">
                          {speaker.occupation}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{speaker.company}</td>
                  <td className="p-3 flex">
                    <Link
                      to={`/admin/speakers/edit/${speaker.id}`}
                      className="text-gray-400 hover:text-gray-100  mx-2"
                    >
                      <MdModeEditOutline />
                    </Link>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-100  ml-2"
                      onClick={() => handleDelete(speaker.id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminSpeakers;
