import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
// import Logout from './components/auth/Logout';
// import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Logout from './components/auth/Logout';

// Amplify.configure({
//   Auth: {
//     region: 'eu-west-1',
//     identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL,
//     userPoolId: import.meta.env.VITE_COGNITO_USER_POOL,
//     userPoolWebClientId: import.meta.env.VITE_COGNITO_WEB_CLIENT_ID,
//   },
//   Storage: {
//     AWSS3: {
//       bucket: import.meta.env.VITE_ASSETS_S3_NAME,
//       region: 'eu-west-1',
//     },
//   },
// });

Amplify.configure(config);

function App({ user }: WithAuthenticatorProps) {
  console.log('user', user);
  return (
    <Authenticator>
      <div className='container'>
        <h1 className='text-center text-info'>Home page</h1>
      </div>
      {/* 
      <SignUp /> */}
      <Logout />
    </Authenticator>
  );
}

export default withAuthenticator(App);
