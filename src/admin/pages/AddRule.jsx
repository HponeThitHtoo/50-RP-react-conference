import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { addRule, getRule, updateRule } from '../../features/rules/rulesSlice';

import FormRow from '../components/FormRow';

const initialState = {
  rule: '',
};

function AddRule({ edit }) {
  const [values, setValues] = useState(initialState);
  const { isEditLoading, editRule } = useSelector((store) => store.rules);
  const dispatch = useDispatch();
  const { ruleId } = useParams();

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const clearFields = () => {
    setValues({ ...values, rule: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { rule } = values;
    if (!rule) {
      toast.warn('Please fill all fields');
      return;
    }

    if (edit) {
      dispatch(updateRule({ id: ruleId, rule }));
      clearFields();
      return;
    }

    dispatch(addRule({ rule }));
    clearFields();
  };

  useEffect(() => {
    if (edit) {
      dispatch(getRule({ id: ruleId }));
    }
    console.log('Page Loaded');
  }, [dispatch, edit, ruleId]);

  useEffect(() => {
    if (editRule) setValues({ rule: editRule.rule });

    console.log('rule added for edit');
  }, [editRule]);

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">add rule</h1>
        <Link
          to="/admin/rules"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          back to rules
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <form
          action=""
          className="space-y-4 text-white w-full md:w-2/3"
          onSubmit={handleSubmit}
        >
          {/* rule field */}
          <FormRow
            type="text"
            name="rule"
            value={values.rule}
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

AddRule.defaultProps = {
  edit: false,
};

AddRule.propTypes = {
  edit: PropTypes.bool,
};

export default AddRule;
