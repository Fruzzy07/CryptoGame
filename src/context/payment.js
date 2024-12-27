import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalState';
import './payment.css';

const Payment = () => {
  const { balance, deposit, withdraw } = useGlobalState();
  const [amount, setAmount] = useState(''); // Управление состоянием введенной суммы

  const handleDeposit = () => {
    if (amount > 0) {
      deposit(amount);
      setAmount('');
    } else {
      alert('Enter a valid amount to deposit');
    }
  };

  const handleWithdraw = () => {
    if (amount > 0) {
      withdraw(amount);
      setAmount('');
    } else {
      alert('Enter a valid amount to withdraw');
    }
  };


  return (
    <div>
      <div className="balance">Balance: {balance} ETH</div>
      <div className="actions">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in ETH"
        />
        <button onClick={handleDeposit} className="deposit-btn">
          Deposit
        </button>
        <button onClick={handleWithdraw} className="withdraw-btn">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Payment;