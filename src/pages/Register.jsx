import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import circle from '../assets/circle.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute, registerRoute } from '../utils/APIRoutes.js';

const initialState = {
  userName: '',
  password: '',
  confirmPassword: ''
};

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

//what the hell are you waiting for

const Register = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState(initialState);
  const [loginState, setLoginState] = useState(false)

  const changeInputRegister = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  /* REGISTER FORM POST */
  const handleRegisterForm = async (event) => {
    event.preventDefault();
    const { userName, password, confirmPassword } = formState;
    if (password.trim().length === 0 || userName.trim().length === 0) {
      toast.error("You have to fill all the fields", toastOptions)
      return
    } else if (password.length < 6) {
      toast.error("Password should have 6 or more characters", toastOptions)
      return
    } else if (!loginState && password !== confirmPassword) {
      toast.error("Both passwords should be equal", toastOptions)
      return
    } else if (userName.length <= 4) {
      toast.error("Username should have 4 or more characters", toastOptions)
      return
    }

    let data;

    if (!loginState) {
      data = await axios.post(registerRoute,
        { userName: userName, password: password });
    } else {
      console.log('entra por login');
      data = await axios.post(loginRoute,
        { userName: userName, password: password });
    }

    if (data.data.status !== 201) {
      toast.error(`${data.data.msg}`, toastOptions)
      return
    }

    /*     localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.createdUser)
        ); */
    // navigate("/");
  }
  return (
    <div className="formContainer">
      <form onSubmit={handleRegisterForm} className='form'>
        <div className="form__img">
          <img src={circle} alt="logo" />
        </div>
        <h1>MAICHAT</h1>
        <p>{loginState ? 'Login' : 'Register'}</p>
        <input className='form__input' type="text" placeholder='Username' name='userName' value={formState.userName} onChange={changeInputRegister} />
        <input className='form__input' type="password" placeholder='password' name='password' value={formState.password} onChange={changeInputRegister} />
        {!loginState && <input className='form__input' type="password" placeholder='Confirm Password' name='confirmPassword' value={formState.confirmPassword} onChange={changeInputRegister} />}
        <button className='form__btn' type='submit'>Create User</button>
        <span onClick={() => setLoginState(!loginState)}>{loginState ? 'Create an account' : 'I already have an account LOGIN'}</span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register