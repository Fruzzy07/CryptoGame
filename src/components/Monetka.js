import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Select,
  Text,
  VStack,
  useToast,
  Spinner,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Confetti from 'react-confetti';
import './Monetka.css';
import { useGlobalState } from '../context/GlobalState';

const CoinFlipGame = () => {
  const { balance, setBalance } = useGlobalState(); // Access global state
  const [side, setSide] = useState('heads');
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [coinFace, setCoinFace] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [history, setHistory] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const boxBg = useColorModeValue('gray.100', 'gray.700');
  const boxBorder = useColorModeValue('gray.300', 'gray.600');
  const buttonBg = useColorModeValue('teal.400', 'teal.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const resultColor = result === side ? 'green.500' : 'red.500';

  useEffect(() => {
    if (result !== null && gameActive) {
      if (result === side) {
        // Player wins: double the stake
        setBalance((balance) => balance + 0.0001); // Adding the stake to balance
        setShowConfetti(true);
        toast({
          title: 'Congratulations!',
          description: `You won! The coin landed on ${result}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Try Again',
          description: `The coin landed on ${result}. You lost!`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }

      // Add the result to history
      setHistory((prevHistory) => [
        ...prevHistory,
        { choice: side, result, won: result === side },
      ]);

      setTimeout(() => setShowConfetti(false), 5000);

      setGameActive(false);
    }
  }, [result, side, toast, gameActive, balance, setBalance]);

  const handleFlip = () => {
    if (balance < 0.0001) {
      toast({
        title: 'Insufficient Balance',
        description: 'You need at least 0.0001 to play.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setFlipping(true);
    setCoinFace('');
    setResult(null); // Clear the previous result to prevent seeing it
    setGameActive(true); // Activate the game

    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const outcome = isHeads ? 'heads' : 'tails';
      setResult(outcome); // Set result only after flip
      setCoinFace(outcome); // Set coin face for animation
      setFlipping(false); // End the flipping animation
    }, 2000); // Animation duration for spinning
  };

  return (
    <VStack
      spacing={4}
      align="center"
      position="relative"
      width="100%"
    >
      {/* Coin Flip Game */}
      <Box
        className="coin-flip-container"
        bg={boxBg}
        borderColor={boxBorder}
        p={6}
        borderRadius="lg"
        boxShadow="md"
      >
        <Text
          className="coin-flip-title"
          fontSize="2xl"
          fontWeight="bold"
        >
          Coin Flip Game
        </Text>
        <Text
          className="coin-flip-description"
          color={textColor}
          // mb={4}
        >
          Try your luck and flip the coin!
        </Text>

        <Text
          fontSize="lg"
          mb={2}
        >
          Choose Side:
        </Text>
        <Select
          className="coin-select"
          placeholder="Select side"
          value={side}
          onChange={(e) => setSide(e.target.value)}
          mb={4}
          textAlign="center"
          isDisabled={flipping || gameActive} // Disable selection during active game
        >
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </Select>

        <Button
          className="coin-flip-button"
          onClick={handleFlip}
          isLoading={flipping}
          bg={buttonBg}
          color="white"
          _hover={{ bg: 'teal.500' }}
          isDisabled={gameActive} // Prevent multiple flips during active game
        >
          Flip Coin
        </Button>

        {flipping && (
          <Box
            className="spinner"
            mt={4}
          >
            <Spinner size="xl" />
          </Box>
        )}

        {coinFace && !flipping && (
          <Box
            className="coin-flip-result"
            mt={4}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={resultColor}
            >
              The coin landed on{' '}
              <Text
                as="span"
                fontWeight="bold"
              >
                {coinFace}
              </Text>
            </Text>
            <div className={`coin ${coinFace}`}></div>
          </Box>
        )}

        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}
      </Box>

      {/* Game History */}
      <Box
        className="history-container"
        bg={boxBg}
        borderColor={boxBorder}
        p={4}
        width="100%"
        maxWidth="600px"
        mt={6}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          mb={4}
        >
          Game History
        </Text>
        {history.length === 0 ? (
          <Text
            textAlign="center"
            color={textColor}
          >
            No games played yet!
          </Text>
        ) : (
          history.map((game, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              mb={2}
            >
              <Text color={textColor}>
                You chose: <strong>{game.choice}</strong>
              </Text>
              <Text color={game.won ? 'green.500' : 'red.500'}>
                Result: <strong>{game.result}</strong>{' '}
                {game.won ? 'Won' : 'Lost'}
              </Text>
            </Box>
          ))
        )}
      </Box>

    </VStack>
  );
};

export default CoinFlipGame;

