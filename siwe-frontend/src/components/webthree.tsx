import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';
declare var window: any

interface Web3ContextType {
  connectWallet: () => Promise<void>;
  signMessage: (nonce: string) => Promise<string>;
  address: string | null;
  isConnected: boolean;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  const connectWallet = async () => {
    // const { ethereum } = window as any;
    const ethereum = (window as any).ethereum;
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

      try {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await newProvider.send('eth_requestAccounts', []);
        setAddress(accounts[0]);
        setProvider(newProvider);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
  };

  const signMessage = async (nonce: string) => {
    if (!provider || !address) throw new Error('Wallet not connected');
    const signer = provider.getSigner();
    const message = `Sign this message to authenticate with nonce: ${nonce}`;
    const signature = await signer.signMessage(message);
    return signature;
  };

  const disconnectWallet = () => {
    setAddress(null);
    setProvider(null);
  };

  return (
    <Web3Context.Provider value={{ connectWallet, signMessage, address, isConnected: !!address, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
