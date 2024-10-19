import React from 'react';
import { Web3Provider } from './components/webthree';
import SignIn from './components/signin';
import {ThemeProvider} from './components/theme';
import ThemeToggle from './components/themetoggle';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Web3Provider>
        <div className="App">
          <div className='header'>
            <h1 >Sign In With Ethereum</h1>
            <ThemeToggle/>
          </div>
          <SignIn />
        </div>
      </Web3Provider>
    </ThemeProvider>
  );
};

export default App;
