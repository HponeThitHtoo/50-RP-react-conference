import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormRow from '../components/FormRow';

import { loginUser, registerUser } from '../../features/user/userSlice';

// https://dribbble.com/shots/19811417--Edupark-Sign-up-page

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  rememberedMe: false,
};

function Register() {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    let value;
    const { name } = e.target;
    if (name === 'rememberedMe') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    setValues({ ...values, [name]: value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, rememberedMe } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields');
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password, rememberedMe }));
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <div className="bg-darkDashboard flex justify-center items-center w-screen h-screen font-lato">
      <form
        action=""
        className="flex flex-col gap-y-7 w-[65vw] lg:w-[50vw] text-white"
        onSubmit={onSubmit}
      >
        <h3 className="capitalize text-2xl font-bold">
          {values.isMember ? 'login' : 'register'}
        </h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {/* remember checkbox */}
        {values.isMember && (
          <FormRow
            type="checkbox"
            labelText="remember me"
            name="rememberedMe"
            checked={values.rememberedMe}
            handleChange={handleChange}
          />
        )}

        <button
          type="submit"
          className="bg-white rounded-md py-2 text-black duration-200 hover:brightness-75 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'loading...' : 'submit'}
        </button>

        <p>
          {values.isMember ? 'Not a member yet? ' : 'Already a member? '}
          <button
            type="button"
            onClick={toggleMember}
            className="border-b-white border-b-2"
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
