import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function FormRow({ type, name, checked, value, handleChange, labelText }) {
  if (type === 'checkbox') {
    return (
      <div className="flex flex-row-reverse justify-end items-center gap-x-1">
        <label htmlFor={name}>{labelText || name}</label>
        <input
          id={name}
          type={type}
          name={name}
          checked={checked}
          onChange={handleChange}
          className="bg-darkDashboardNav h-10 rounded-md outline-none"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="bg-darkDashboardNav h-10 px-2 rounded-md outline-none"
      />
    </div>
  );
}

FormRow.defaultProps = {
  labelText: '',
  value: '',
  checked: false,
};

FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
};

export default FormRow;
