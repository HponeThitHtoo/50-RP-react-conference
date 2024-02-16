import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getRules } from '../features/rules/rulesSlice';

// https://dribbble.com/shots/3982365-Code-of-Conduct-splash-screen

function Rules() {
  const { isLoading, rules } = useSelector((store) => store.rules);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRules());
  }, [dispatch]);

  return (
    <section className="flex-1 flex flex-col lg:flex-row mx-10 mb-4 gap-4 font-lato">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center bg-purple-700 rounded-md px-5 md:px-10 space-y-10">
          <h2 className=" text-plum text-lg">
            You must follow the following rules to attend ReactBarcamp of Yangon
            2023
          </h2>
          <ul className="list-decimal list-inside space-y-2 text-white">
            {rules.map((rule) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={rule.id}>{rule.rule}</li>
            ))}
          </ul>

          <Link
            to="/schedule"
            className="border border-white px-4 py-2 uppercase text-white duration-300 hover:bg-white hover:border-mossgreen hover:text-mossgreen"
          >
            got it, let&apos;s go
          </Link>
        </div>
      )}
    </section>
  );
}

export default Rules;
