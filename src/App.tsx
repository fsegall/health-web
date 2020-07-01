import React from 'react';
import GlobalStyles from './styles/global';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Signin />
      {/* <Signup /> */}
    </AppProvider>

    <GlobalStyles />
  </>
);

export default App;
