import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (!board[index]) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
    }
  };

  const winner = checkWinner();

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRIKI</Text>
      <Text style={styles.title}>Marcelino Isaac Garavito Castillo</Text>
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map(col => (
              <TouchableOpacity
                key={row * 3 + col}
                style={styles.cell}
                onPress={() => handlePress(row * 3 + col)}
                disabled={board[row * 3 + col] || winner}>
                <Text style={styles.cellText}>{board[row * 3 + col]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      {winner && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>¡Felicidades, {winner}! Eres el ganador.</Text>
          <Button title="Reiniciar Juego" onPress={resetGame} />
        </View>
      )}
      {!winner && !board.includes(null) && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>¡Nadie ganó! Reinicia el juego.</Text>
          <Button title="Reiniciar Juego" onPress={resetGame} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  board: {
    flexDirection: 'column',
    borderWidth: 3,
    borderColor: '#333',
    padding: 5,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 36,
    color: '#333',
  },
  messageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    color: '#009900',
  },
});

export default App;
