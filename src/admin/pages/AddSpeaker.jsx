import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  addSpeaker,
  getSpeaker,
  updateSpeaker,
} from '../../features/speakers/speakersSlice';

import FormRow from '../components/FormRow';

const initialState = {
  name: '',
  occupation: '',
  company: '',
  image: 'https://ui-avatars.com/api/?name=tester&background=0D8ABC&color=fff',
};

function AddSpeaker({ edit }) {
  const [values, setValues] = useState(initialState);
  const { isEditLoading, speaker } = useSelector((store) => store.speakers);
  const dispatch = useDispatch();
  const { speakerId } = useParams();

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const clearFields = () => {
    setValues({ ...values, name: '', occupation: '', company: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, occupation, company, image } = values;
    if (!name || !occupation || !company) {
      toast.warn('Please fill all fields');
      return;
    }

    if (edit) {
      dispatch(
        updateSpeaker({ id: speakerId, name, occupation, company, image })
      );
      clearFields();
      return;
    }

    dispatch(addSpeaker({ name, occupation, company, image }));
    clearFields();
  };

  useEffect(() => {
    if (edit) {
      dispatch(getSpeaker({ id: speakerId }));
    }
    // console.log('page loaded');
  }, [edit, dispatch, speakerId]);

  useEffect(() => {
    if (speaker) setValues(speaker);
    // console.log('speaker added for edit');
  }, [speaker]);

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">add speaker</h1>
        <Link
          to="/admin/speakers"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          back to speakers
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <form
          action=""
          className="space-y-4 text-white w-full md:w-2/3"
          onSubmit={handleSubmit}
        >
          {/* name field */}
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />

          {/* occupation field */}
          <FormRow
            type="text"
            name="occupation"
            value={values.occupation}
            handleChange={handleChange}
          />

          {/* company field */}
          <FormRow
            type="text"
            name="company"
            value={values.company}
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

AddSpeaker.defaultProps = {
  edit: false,
};

AddSpeaker.propTypes = {
  edit: PropTypes.bool,
};

export default AddSpeaker;
