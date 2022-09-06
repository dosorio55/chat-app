import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';
import circle from '../assets/circle.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes.js';

const initialState = {
  userName: '',
  password: '',
  confirmPassword: ''
};

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

//what the hell are you waiting for

const Register = () => {

  const [formState, setFormState] = useState(initialState)

  const changeInputRegister = (event) => {
    const { name, value } = event.target
    console.log(name, value);
    setFormState((prevState) => ({ ...prevState, [name]: value }))
    console.log(formState);
  }

  const handleRegisterForm = async (event) => {
    event.preventDefault();
    console.log(formState);
    const { userName, password, confirmPassword } = formState;
    if (password.trim().length === 0 || userName.trim().length === 0) {
      toast.error("You should fill all the fields", toastOptions)
      return
    } else if (password.length < 6) {
      toast.error("Password should have 6 or more characters", toastOptions)
      return
    } else if (password !== confirmPassword) {
      toast.error("Both passwords should be equal", toastOptions)
      return
    } else if (userName.length <= 4) {
      toast.error("Password should have 6 or more characters", toastOptions)
      return
    }

    const data = await axios.post(registerRoute,
      { userName: userName, password: password });
    setFormState(initialState)
  }
  return (
    <div className="formContainer">
      <form onSubmit={handleRegisterForm} className='form'>
        <div className="form__img">
          <img src={circle} alt="logo" />
        </div>
        <h1>MAICHAT</h1>
        <input className='form__input' type="text" placeholder='Username' name='userName' value={formState.userName} onChange={changeInputRegister} />
        <input className='form__input' type="password" placeholder='password' name='password' value={formState.password} onChange={changeInputRegister} />
        <input className='form__input' type="password" placeholder='Confirm Password' name='confirmPassword' value={formState.confirmPassword} onChange={changeInputRegister} />
        <button className='form__btn' type='submit'>Create User</button>
        <span>I already have an account, <Link to={'/login'}>LOGIN</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register