import React, { useState } from 'react';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';

type SignUpConfirmationParams = {
  userId: string;
};

function SignUpConfirmation({ userId }: SignUpConfirmationParams) {
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const handleConfirmation = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const params: ConfirmSignUpInput = {
        username: userId,
        confirmationCode: confirmationCode,
      };
      await confirmSignUp(params);
      window.location.href = '/';
    } catch (error) {
      console.log('error:::>>>', error);
    }
  };

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='ConfirmationCode'>Confirmation Code</label>
        <input
          type='text'
          className='form-control'
          id='ConfirmationCode'
          aria-describedby='confirm-password'
          placeholder='Enter Confirmation'
          onChange={(e) => {
            setConfirmationCode(e.target.value);
          }}
        />
        <small id='emailHelp' className='form-text text-muted'>
          We'll never share your email with anyone else.
        </small>
      </div>

      <button
        type='submit'
        className='btn btn-primary'
        onClick={(e) => {
          handleConfirmation(e);
        }}
      >
        Confirm
      </button>
    </form>
  );
}

export default SignUpConfirmation;
