'use client';

import { useState } from 'react';
import { signIn } from '../lib/SignInSlice';
import Navbar from '../components/Navbar';
import { useAppDispatch } from '../lib/hooks';
import styles from '../styles/SignIn.module.css'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      email,
      password
    };
    dispatch(signIn(body));
    console.log(email, 'hhhhh');
    window.location.href = '/Chat';
  };

  return (
    <div>
      <Navbar />
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <img
                src='https://media.istockphoto.com/id/1319031310/photo/doctor-writing-a-medical-prescription.jpg?s=612x612&w=0&k=20&c=DWZGM8lBb5Bun7cbxhKT1ruVxRC_itvFzA9jxgoA0N8='
                alt='Doctor'
                className={styles.image}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className={styles.submitButton} type='submit'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
