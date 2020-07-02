import React from 'react';
import GlobalStyles from './styles/global';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />

      {/* <Signup /> */}
    </AppProvider>

    <GlobalStyles />
  </Router>
);

export default App;
