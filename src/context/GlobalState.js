import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [balance, setBalance] = useState(0.0001); // Initial balance in Ether
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const contractAddress = '0xe96A52fb22dD49959758b39fc8e533E67a60030b'; // Replace with your smart contract address

  // Contract ABI (same as yours, but added some comments)
  const contractABI = useMemo(() => [
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ], []);

  // Connect to MetaMask and fetch the balance
  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum); // For ethers v5.x.x
        const userSigner = provider.getSigner();
        const userContract = new ethers.Contract(contractAddress, contractABI, userSigner);

        setSigner(userSigner);
        setContract(userContract);

        const userBalance = await userContract.getBalance();
        const formattedBalance = ethers.utils.formatUnits(userBalance, 18); // Convert to Ether
        setBalance(formattedBalance); // Set the balance in the state
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Failed to connect to MetaMask');
      }
    } else {
      alert('MetaMask is not installed');
    }
  }, [contractAddress, contractABI]);

  // Deposit function to send Ether to the contract
  const deposit = async (amount) => {
    if (!contract || !signer) return;

    try {
      const tx = await contract.deposit({
        value: ethers.utils.parseUnits(amount.toString(), 18), // Convert to Wei
      });
      await tx.wait();

      // Update the balance after deposit
      const newBalance = await contract.getBalance();
      const formattedBalance = ethers.utils.formatUnits(newBalance, 18);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  // Withdraw function to withdraw Ether from the contract
  const withdraw = async (amount) => {
    if (!contract || !signer) return;

    try {
      const tx = await contract.withdraw(ethers.utils.parseUnits(amount.toString(), 18)); // Convert to Wei
      await tx.wait();

      // Update the balance after withdrawal
      const newBalance = await contract.getBalance();
      const formattedBalance = ethers.utils.formatUnits(newBalance, 18);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  // Initialize connection when component mounts
  useEffect(() => {
    if (window.ethereum && !isConnected) {
      connectWallet();
    }
  }, [isConnected, connectWallet]);

  return (
    <GlobalStateContext.Provider value={{ balance, deposit, withdraw }}>
      {children}
    </GlobalStateContext.Provider>
  );
};


