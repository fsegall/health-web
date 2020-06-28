import React from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <Signup />
    {/* <Signin /> */}
    {/* <form className="App">
      <input
        style={{
          padding: 10,
          backgroundColor: '#d9d9d9',
          width: 400,
          margin: 20,
          color: '#f2f2f2',
          fontWeight: 'bold',
          borderRadius: 10,
          border: 0,
        }}
        value="ok"
      />
      <button
        style={{
          padding: 10,
          backgroundColor: '#5c5cd6',
          width: 80,
          border: 0,
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: 10,
        }}
      >
        Submit
      </button>
    </form> */}
    <GlobalStyles />
  </>
);

export default App;
