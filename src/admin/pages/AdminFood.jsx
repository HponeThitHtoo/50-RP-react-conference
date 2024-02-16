import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md';

import { getFoods, deleteFood } from '../../features/foods/foodsSlice';

function AdminFood() {
  const { isLoading, foods } = useSelector((store) => store.foods);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmedToDelete = confirm('Are you sure want to delete?');

    if (confirmedToDelete) dispatch(deleteFood(id));
  };

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">food</h1>
        {/* <Link
          to="/admin/foods/edit"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          edit location
        </Link> */}
      </div>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <table className="table text-gray-400 border-separate space-y-6 text-sm">
            <thead className="bg-gray-800 text-gray-500">
              <tr>
                <th className="p-3 text-left capitalize">title</th>
                <th className="p-3 text-left capitalize">time</th>
                <th className="p-3 text-left capitalize">food</th>
                <th className="p-3 text-left capitalize">Action</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id}>
                  <td className="p-3">{food.title}</td>
                  <td className="p-3">{food.time}</td>
                  <td className="p-3">{food.food}</td>
                  <td className="p-3 flex">
                    <Link
                      to={`/admin/foods/edit/${food.id}`}
                      className="text-gray-400 hover:text-gray-100  mx-2"
                    >
                      <MdModeEditOutline />
                    </Link>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-100  ml-2"
                      onClick={() => handleDelete(food.id)}
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

export default AdminFood;
