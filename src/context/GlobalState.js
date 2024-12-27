import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [balance, setBalance] = useState(0); // UserContract balance in Ether
  const [signer, setSigner] = useState(null);
  const [userContract, setUserContract] = useState(null);
  const [storageContract, setStorageContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const userContractAddress = '0x4BD40635CF6b177d9A7E71f3200C50e30960D132'; // Replace with actual address
  const storageContractAddress = '0x628d51d1EADDE476C9F77d839891DeC9b98c1229'; // Replace with actual address

  // Contract ABIs
  const userContractABI = useMemo(() => [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_storageContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "stateMutability": "payable",
      "type": "receive"
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
    },
    {
      "inputs": [],
      "name": "storageContract",
      "outputs": [
        {
          "internalType": "contract IStorageContract",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ], []);

  const storageContractABI = useMemo(() => [
    {
      "inputs": [],
      "name": "depositFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
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
        
        const userContractInstance = new ethers.Contract(userContractAddress, userContractABI, userSigner);
        const storageContractInstance = new ethers.Contract(storageContractAddress, storageContractABI, userSigner);

        setSigner(userSigner);
        setUserContract(userContractInstance);
        setStorageContract(storageContractInstance);

        const userBalance = await userContractInstance.provider.getBalance(userContractAddress);
        const formattedBalance = ethers.utils.formatUnits(userBalance, 18); // Convert to Ether
        setBalance(formattedBalance);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Failed to connect to MetaMask');
      }
    } else {
      alert('MetaMask is not installed');
    }
  }, [userContractAddress, userContractABI, storageContractAddress, storageContractABI]);

  // Deposit function to send Ether to UserContract
  const deposit = async (amount) => {
    if (!userContract || !signer) return;

    try {
      // Send Ether directly to the UserContract using the receive function
      const tx = await signer.sendTransaction({
        to: userContractAddress,
        value: ethers.utils.parseUnits(amount.toString(), 18), // Convert to Wei
      });
      await tx.wait();

      // Update the balance after deposit
      const updatedBalance = await userContract.provider.getBalance(userContractAddress);
      setBalance(ethers.utils.formatUnits(updatedBalance, 18));
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  // Withdraw function using funds from StorageContract
  const withdraw = async (amount) => {
    if (!userContract || !storageContract || !signer) return;

    try {
      const tx = await userContract.withdraw(ethers.utils.parseUnits(amount.toString(), 18)); // Convert to Wei
      await tx.wait();

      // Update the balance after withdrawal
      const updatedBalance = await userContract.provider.getBalance(userContractAddress);
      setBalance(ethers.utils.formatUnits(updatedBalance, 18));
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
    <GlobalStateContext.Provider value={{ balance, setBalance, deposit, withdraw }}>
      {children}
    </GlobalStateContext.Provider>
  );
};


