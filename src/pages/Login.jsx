import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import circle from '../assets/circle.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute, registerRoute } from '../utils/APIRoutes.js';
import { toastOptions } from '../utils/constants';

const initialState = {
  userName: 'leanejoye',
  password: '1234567',
  confirmPassword: ''
};


const Login = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState(initialState);
  const [loginState, setLoginState] = useState(true);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [])

  const changeInputRegister = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  /* REGISTER FORM POST */
  const handleRegisterForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { userName, password, confirmPassword } = formState;
    if (password.trim().length === 0 || userName.trim().length === 0) {
      toast.error("You have to fill all the fields", toastOptions)
      setLoading(false);
      return
    } else if (password.length < 6) {
      toast.error("Password should have 6 or more characters", toastOptions)
      setLoading(false);
      return
    } else if (!loginState && password !== confirmPassword) {
      toast.error("Both passwords should be equal", toastOptions)
      setLoading(false);
      return
    } else if (userName.length < 4) {
      toast.error("Username should have 4 or more characters", toastOptions)
      setLoading(false);
      return
    }

    let data;

    if (!loginState) {
      data = await axios.post(registerRoute,
        { userName: userName, password: password });
    } else {
      data = await axios.post(loginRoute,
        { userName: userName, password: password });
    }
    if (data.data.status !== 201) {
      toast.error(`${data.data.msg}`, toastOptions)
      setLoading(false);
      return
    }
    localStorage.setItem('chat-app-user', JSON.stringify(data.data.user));
    navigate("/set-avatar");
  }

  const buttonState = () => {
    if (loginState && !loading) {
      return 'login'
    } else if (!loginState && !loading) {
      return 'register'
    } else if (loading) {
      return 'loading...'
    }
  };

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
        {!loginState &&
          <input className='form__input' type="password" placeholder='Confirm Password' name='confirmPassword' value={formState.confirmPassword}
            onChange={changeInputRegister} />}
        <button disabled={loading} className='form__btn' type='submit'>{buttonState()}</button>
        <div className='form__text' onClick={() => setLoginState(!loginState)}>
          {loginState ? <p> You don't have an account, <span>Register</span> </p>
            : <p>Do you have an account? <span>Login</span></p>}
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login