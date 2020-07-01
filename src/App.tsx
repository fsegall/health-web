import React from 'react';
import GlobalStyles from './styles/global';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Signin />
      {/* <Signup /> */}
    </AuthProvider>
    <GlobalStyles />
  </>
);

export default App;
