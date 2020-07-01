import React from 'react';
import GlobalStyles from './styles/global';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';
import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Signin />
      {/* <Signup /> */}
    </AuthProvider>
    <ToastContainer />
    <GlobalStyles />
  </>
);

export default App;
