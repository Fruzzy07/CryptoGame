import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import GameList from './components/GameList';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Miner from './components/Miner'; 
import Monetka from './components/Monetka';
import RockPaperScissors from './components/RockPaperScissors';
import './App.css';
import './components/rock-paper-scissors.css';
import './components/Miner.css';
import ProtectedRoute from './service/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/miner" element={
            <ProtectedRoute>
              <Miner />
            </ProtectedRoute>} />
          <Route path="/monetka" element={
            <ProtectedRoute>
              <Monetka />
            </ProtectedRoute>} />
          <Route path="/rock-paper-scissors" element={
            <ProtectedRoute>
              <RockPaperScissors />
            </ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;