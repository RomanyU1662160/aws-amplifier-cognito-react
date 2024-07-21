import { signOut } from 'aws-amplify/auth';
import React from 'react';

function Logout() {
  const handleLogout = async () => {
    await signOut({
      global: true,
    });
    window.location.href = '/';
  };

  return (
    <div>
      <button className='btn btn-outline-danger' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
