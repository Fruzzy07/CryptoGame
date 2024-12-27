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
import { GlobalStateProvider } from './context/GlobalState';
import Payment from './context/payment';
import Home from './components/Home';
function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<ProtectedRoute><GameList /></ProtectedRoute> } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/miner"
              element={
                <ProtectedRoute>
                  <Miner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/monetka"
              element={
                <ProtectedRoute>
                  <Monetka />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rock-paper-scissors"
              element={
                <ProtectedRoute>
                  <RockPaperScissors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
