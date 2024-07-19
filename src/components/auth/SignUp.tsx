import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import SignUpConfirmation from './SignUpConfirmation';

// type SignUpParams = {
//   password: string;
//   email: string;
// };

function SignUp() {
  const [data, setData] = useState({
    password: '',
    email: '',
  });
  const [showConfirmation, setshowConfirmation] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  async function handleSignup(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    console.log('clicked');
    console.log(data);
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        password: data.password,
        username: data.email,

        options: {
          userAttributes: {
            email: data.email,
          },
        },
      });
      setUsername(userId!);
      setshowConfirmation(!isSignUpComplete);
      console.log('userId', userId);
      console.log('isSignUpComplete', isSignUpComplete);
      console.log('nextStep', nextStep);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  return (
    <>
      <form>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className='form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Check me out
          </label>
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={(e) => handleSignup(e)}
        >
          Register
        </button>
      </form>

      {showConfirmation && <SignUpConfirmation userId={username} />}
    </>
  );
}

export default SignUp;
