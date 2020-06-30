import React from 'react';
import GlobalStyles from './styles/global';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';
import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Felipe' }}>
      <Signin />
      {/* <Signup /> */}
    </AuthContext.Provider>
    <GlobalStyles />
  </>
);

export default App;
