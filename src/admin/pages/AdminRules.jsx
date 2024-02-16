/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md';

import { getRules, deleteRule } from '../../features/rules/rulesSlice';

// https://tailwindcomponents.com/component/table-4

function AdminRules() {
  const { isLoading, rules } = useSelector((store) => store.rules);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRules());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmedToDelete = confirm('Are you sure want to delete?');
    if (confirmedToDelete) dispatch(deleteRule(id));
  };

  return (
    <div className="w-full overflow-auto">
      <div className="my-7 flex justify-center items-center gap-10">
        <h1 className="capitalize text-lg text-white">rules</h1>
        <Link
          to="/admin/rules/add"
          className="px-4 py-2 rounded-md bg-mossgreen text-sm text-white capitalize"
        >
          add rule
        </Link>
      </div>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <table className="table text-gray-400 border-separate space-y-6 text-sm">
            <thead className="bg-gray-800 text-gray-500">
              <tr>
                <th className="p-3 text-left capitalize">rule</th>
                <th className="p-3 text-left capitalize">Action</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} className="bg-gray-800">
                  <td className="p-3">{rule.rule}</td>
                  <td className="p-3 flex">
                    <Link
                      to={`/admin/rules/edit/${rule.id}`}
                      className="text-gray-400 hover:text-gray-100  mx-2"
                    >
                      <MdModeEditOutline />
                    </Link>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-100  ml-2"
                      onClick={() => handleDelete(rule.id)}
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

export default AdminRules;
