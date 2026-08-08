import React, { useState, useEffect } from 'react';

const BOARD_SIZE = 9;
const NUM_MINES = 10;

const Minesweeper = () => {
  const [board, setBoard] = useState([]);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'won' | 'lost'
  const [mineCount, setMineCount] = useState(NUM_MINES);
  const [timer, setTimer] = useState(0);
  const [isFaceSurprised, setIsFaceSurprised] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && !isFirstClick) {
      interval = setInterval(() => {
        setTimer(t => Math.min(t + 1, 999));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, isFirstClick]);

  // Initialize board
  const initBoard = () => {
    const newBoard = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      const row = [];
      for (let c = 0; c < BOARD_SIZE; c++) {
        row.push({
          row: r,
          col: c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        });
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
    setGameState('playing');
    setMineCount(NUM_MINES);
    setTimer(0);
    setIsFirstClick(true);
  };

  useEffect(() => {
    initBoard();
  }, []);

  // Plant mines after first click to guarantee safety
  const plantMines = (startRow, startCol, currentBoard) => {
    let planted = 0;
    const boardCopy = currentBoard.map(row => row.map(cell => ({ ...cell })));

    while (planted < NUM_MINES) {
      const r = Math.floor(Math.random() * BOARD_SIZE);
      const c = Math.floor(Math.random() * BOARD_SIZE);

      // Don't plant mine on first clicked cell or adjacent cells
      if (!boardCopy[r][c].isMine && !(Math.abs(r - startRow) <= 1 && Math.abs(c - startCol) <= 1)) {
        boardCopy[r][c].isMine = true;
        planted++;
      }
    }

    // Calculate neighbor counts
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (!boardCopy[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
                if (boardCopy[nr][nc].isMine) count++;
              }
            }
          }
          boardCopy[r][c].neighborMines = count;
        }
      }
    }

    return boardCopy;
  };

  // Reveal cell and cascades
  const revealCell = (r, c) => {
    if (gameState !== 'playing') return;

    let currentBoard = board;

    if (isFirstClick) {
      currentBoard = plantMines(r, c, board);
      setIsFirstClick(false);
    }

    const cell = currentBoard[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    const newBoard = currentBoard.map(row => row.map(c => ({ ...c })));

    // Hit a mine!
    if (newBoard[r][c].isMine) {
      // Reveal all mines
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (newBoard[row][col].isMine) {
            newBoard[row][col].isRevealed = true;
          }
        }
      }
      setBoard(newBoard);
      setGameState('lost');
      return;
    }

    // Cascade reveal zeros
    const stack = [[r, c]];
    while (stack.length > 0) {
      const [currR, currC] = stack.pop();
      const currCell = newBoard[currR][currC];

      if (!currCell.isRevealed && !currCell.isFlagged) {
        currCell.isRevealed = true;
        if (currCell.neighborMines === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = currR + dr;
              const nc = currC + dc;
              if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
                if (!newBoard[nr][nc].isRevealed && !newBoard[nr][nc].isMine) {
                  stack.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    }

    // Check win condition
    let unrevealedNonMines = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!newBoard[row][col].isMine && !newBoard[row][col].isRevealed) {
          unrevealedNonMines++;
        }
      }
    }

    if (unrevealedNonMines === 0) {
      setGameState('won');
    }

    setBoard(newBoard);
  };

  // Flag cell
  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameState !== 'playing') return;

    const cell = board[r][c];
    if (cell.isRevealed) return;

    const newBoard = board.map(row => row.map(c => ({ ...c })));
    const target = newBoard[r][c];

    if (!target.isFlagged && mineCount > 0) {
      target.isFlagged = true;
      setMineCount(prev => prev - 1);
    } else if (target.isFlagged) {
      target.isFlagged = false;
      setMineCount(prev => prev + 1);
    }

    setBoard(newBoard);
  };

  const getFaceEmoji = () => {
    if (gameState === 'lost') return '😵';
    if (gameState === 'won') return '😎';
    if (isFaceSurprised) return '😲';
    return '😃';
  };

  const getNumberColor = (num) => {
    switch (num) {
      case 1: return '#0000ff';
      case 2: return '#007b00';
      case 3: return '#ff0000';
      case 4: return '#00007b';
      case 5: return '#7b0000';
      case 6: return '#007b7b';
      case 7: return '#000000';
      case 8: return '#7b7b7b';
      default: return 'transparent';
    }
  };

  return (
    <div className="minesweeper-container">
      {/* Retro Header Bar */}
      <div className="minesweeper-header">
        {/* Mine Counter */}
        <div className="digital-display">
          {String(mineCount).padStart(3, '0')}
        </div>

        {/* Reset Face Button */}
        <button
          className="minesweeper-face-btn"
          onClick={initBoard}
          title="Reset Game"
        >
          {getFaceEmoji()}
        </button>

        {/* Game Timer */}
        <div className="digital-display">
          {String(timer).padStart(3, '0')}
        </div>
      </div>

      {/* Grid */}
      <div className="minesweeper-grid">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="minesweeper-row">
            {row.map((cell, cIdx) => (
              <button
                key={cIdx}
                className={`minesweeper-cell ${cell.isRevealed ? 'revealed' : ''}`}
                onClick={() => revealCell(rIdx, cIdx)}
                onContextMenu={(e) => handleRightClick(e, rIdx, cIdx)}
                onMouseDown={() => setIsFaceSurprised(true)}
                onMouseUp={() => setIsFaceSurprised(false)}
              >
                {cell.isRevealed ? (
                  cell.isMine ? '💣' : cell.neighborMines > 0 ? (
                    <span style={{ color: getNumberColor(cell.neighborMines), fontWeight: 'bold' }}>
                      {cell.neighborMines}
                    </span>
                  ) : ''
                ) : (
                  cell.isFlagged ? '🚩' : ''
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Game Status Banner */}
      {gameState === 'won' && (
        <div className="minesweeper-status win">🎉 Victory! You cleared all mines!</div>
      )}
      {gameState === 'lost' && (
        <div className="minesweeper-status loss">💥 Game Over! Try again!</div>
      )}
    </div>
  );
};

export default Minesweeper;
