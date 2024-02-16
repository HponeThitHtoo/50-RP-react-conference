import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { getFood, updateFood } from '../../features/foods/foodsSlice';

import FormRow from '../components/FormRow';

const initialState = {
  title: '',
  time: '',
  food: '',
};

function AddFood() {
  const [values, setValues] = useState(initialState);
  const { isEditLoading, editFood } = useSelector((store) => store.foods);
  const dispatch = useDispatch();
  const { foodId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const clearFields = () => {
    setValues({ ...values, title: '', time: '', food: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, time, food } = values;
    if (!title || !time || !food) {
      toast.warn('Please fill all fields');
      return;
    }

    dispatch(updateFood({ id: foodId, title, time, food }));
    clearFields();
  };

  useEffect(() => {
    dispatch(getFood({ id: foodId }));
  }, [dispatch, foodId]);

  useEffect(() => {
    if (editFood) setValues(editFood);
  }, [editFood]);

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">add speaker</h1>
        <Link
          to="/admin/foods"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          back to foods
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <form
          action=""
          className="space-y-4 text-white w-full md:w-2/3"
          onSubmit={handleSubmit}
        >
          {/* title field */}
          <FormRow
            type="text"
            name="title"
            value={values.title}
            handleChange={handleChange}
          />

          {/* time field */}
          <FormRow
            type="text"
            name="time"
            value={values.time}
            handleChange={handleChange}
          />

          {/* food field */}
          <FormRow
            type="text"
            name="food"
            value={values.food}
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

export default AddFood;
