import React, { useEffect, useState } from 'react';
import { useWeb3 } from './webthree';
import axios from 'axios';
import styles from './signin.module.css';

const SignIn: React.FC = () => {
  const { connectWallet, signMessage, address, isConnected, disconnectWallet } = useWeb3();
  const [nonce, setNonce] = useState<string | null>(null);

  const fetchNonce = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/nonce');
      setNonce(response.data.nonce);
    } catch (error) {
      console.error('Error fetching nonce:', error);
    }
  };

  const handleSignIn = async () => {
    if (!nonce) return;
    try {
      const signature = await signMessage(nonce);
      await axios.post('http://localhost:5000/api/auth', { signature, address });
      alert('Signed in successfully!');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchNonce();
    }
  }, [isConnected]);

  return (
    <div className={styles.container}>
      {!isConnected ? (
        <button className={styles.button} onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected as: {address}</p>
          <button className={styles.button} onClick={handleSignIn} disabled={!nonce}>Sign-In</button>
          <button className={styles.button} onClick={disconnectWallet}>Sign-Out</button>
        </>
      )}
    </div>
  );
};

export default SignIn;
