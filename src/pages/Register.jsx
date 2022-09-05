import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';
import circle from '../assets/circle.png'

const initialState = {
  userName: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {

  const [formState, setFormState] = useState(initialState)

  const changeInputRegister = (event) => {
    const { name, value } = event.target
    console.log(name, value);
    setFormState((prevState) => ({ ...prevState, [name]: value }))
    console.log(formState);
  }

  const handleRegisterForm = (event) => {
    event.preventDefault();
    console.log(formState);
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
    </div>
  )
}

export default Register