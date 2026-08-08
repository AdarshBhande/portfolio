import React, { useState, useEffect } from 'react';

const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const isRed = (suit) => suit === '♥' || suit === '♦';

const Solitaire = () => {
  const [deck, setDeck] = useState([]);
  const [stock, setStock] = useState([]);
  const [waste, setWaste] = useState([]);
  const [foundations, setFoundations] = useState({ '♠': [], '♥': [], '♦': [], '♣': [] });
  const [tableau, setTableau] = useState([[], [], [], [], [], [], []]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize new deck and deal
  const initGame = () => {
    let newDeck = [];
    let id = 1;
    SUITS.forEach(suit => {
      VALUES.forEach((val, idx) => {
        newDeck.push({
          id: id++,
          suit,
          value: val,
          rank: idx + 1,
          isRed: isRed(suit),
          faceUp: false
        });
      });
    });

    // Shuffle
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    // Deal tableau
    const newTableau = [[], [], [], [], [], [], []];
    let cardIdx = 0;
    for (let col = 0; col < 7; col++) {
      for (let r = 0; r <= col; r++) {
        const card = { ...newDeck[cardIdx++] };
        if (r === col) card.faceUp = true; // top card face up
        newTableau[col].push(card);
      }
    }

    // Remaining cards go to Stock
    const remainingStock = newDeck.slice(cardIdx).map(c => ({ ...c, faceUp: false }));

    setStock(remainingStock);
    setWaste([]);
    setFoundations({ '♠': [], '♥': [], '♦': [], '♣': [] });
    setTableau(newTableau);
    setMoves(0);
    setScore(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Draw card from stock to waste
  const drawCard = () => {
    if (stock.length > 0) {
      const nextCard = { ...stock[stock.length - 1], faceUp: true };
      setStock(stock.slice(0, stock.length - 1));
      setWaste([...waste, nextCard]);
      setMoves(m => m + 1);
    } else if (waste.length > 0) {
      // Recycle waste back to stock
      const recycledStock = waste.map(c => ({ ...c, faceUp: false })).reverse();
      setStock(recycledStock);
      setWaste([]);
      setMoves(m => m + 1);
    }
  };

  // Move card to foundation
  const tryMoveToFoundation = (card, source, sourceIdx) => {
    const fCards = foundations[card.suit];
    const topRank = fCards.length > 0 ? fCards[fCards.length - 1].rank : 0;

    if (card.rank === topRank + 1) {
      // Valid foundation move!
      setFoundations(prev => ({
        ...prev,
        [card.suit]: [...prev[card.suit], card]
      }));

      // Remove from source
      if (source === 'waste') {
        setWaste(waste.slice(0, waste.length - 1));
      } else if (source === 'tableau') {
        const newTableau = [...tableau];
        newTableau[sourceIdx] = newTableau[sourceIdx].slice(0, newTableau[sourceIdx].length - 1);
        // Turn top card face up if needed
        if (newTableau[sourceIdx].length > 0) {
          newTableau[sourceIdx][newTableau[sourceIdx].length - 1].faceUp = true;
        }
        setTableau(newTableau);
      }

      setScore(s => s + 10);
      setMoves(m => m + 1);

      // Check win condition
      const totalFoundationCards = Object.values(foundations).reduce((acc, arr) => acc + arr.length, 0) + 1;
      if (totalFoundationCards === 52) {
        setIsWon(true);
      }
    }
  };

  // Move card to tableau column
  const tryMoveToTableau = (card, source, sourceColIdx, targetColIdx) => {
    const targetCol = tableau[targetColIdx];
    const topTargetCard = targetCol.length > 0 ? targetCol[targetCol.length - 1] : null;

    let isValid = false;
    if (!topTargetCard) {
      // Empty column accepts Kings (rank 13)
      if (card.rank === 13) isValid = true;
    } else {
      // Accepts alternate color and rank - 1
      if (card.isRed !== topTargetCard.isRed && card.rank === topTargetCard.rank - 1) {
        isValid = true;
      }
    }

    if (isValid) {
      const newTableau = [...tableau];

      if (source === 'waste') {
        newTableau[targetColIdx].push(card);
        setWaste(waste.slice(0, waste.length - 1));
      } else if (source === 'tableau') {
        // Move stack of cards
        const sourceCol = newTableau[sourceColIdx];
        const cardIndexInCol = sourceCol.findIndex(c => c.id === card.id);
        const movingStack = sourceCol.slice(cardIndexInCol);

        newTableau[sourceColIdx] = sourceCol.slice(0, cardIndexInCol);
        if (newTableau[sourceColIdx].length > 0) {
          newTableau[sourceColIdx][newTableau[sourceColIdx].length - 1].faceUp = true;
        }

        newTableau[targetColIdx] = [...newTableau[targetColIdx], ...movingStack];
      }

      setTableau(newTableau);
      setScore(s => s + 5);
      setMoves(m => m + 1);
    }
  };

  return (
    <div className="solitaire-container">
      {/* Top Header Controls */}
      <div className="solitaire-bar">
        <button className="solitaire-btn" onClick={initGame}>New Game 🎴</button>
        <div className="solitaire-stats">
          <span>Score: <strong>{score}</strong></span>
          <span>Moves: <strong>{moves}</strong></span>
        </div>
      </div>

      {/* Top Piles: Stock, Waste, Foundations */}
      <div className="solitaire-top-row">
        <div className="solitaire-stock-waste">
          {/* Stock Pile */}
          <div className="card-slot stock-slot" onClick={drawCard}>
            {stock.length > 0 ? (
              <div className="card card-back">🎴</div>
            ) : (
              <div className="card-empty-slot">🔄</div>
            )}
          </div>

          {/* Waste Pile */}
          <div className="card-slot waste-slot">
            {waste.length > 0 && (
              <div
                className={`card ${waste[waste.length - 1].isRed ? 'red' : 'black'}`}
                onClick={() => tryMoveToFoundation(waste[waste.length - 1], 'waste')}
              >
                <div className="card-val">{waste[waste.length - 1].value}</div>
                <div className="card-suit">{waste[waste.length - 1].suit}</div>
              </div>
            )}
          </div>
        </div>

        {/* 4 Foundations */}
        <div className="solitaire-foundations">
          {SUITS.map(suit => {
            const fCards = foundations[suit];
            const topCard = fCards.length > 0 ? fCards[fCards.length - 1] : null;

            return (
              <div key={suit} className="card-slot foundation-slot">
                {topCard ? (
                  <div className={`card ${topCard.isRed ? 'red' : 'black'}`}>
                    <div className="card-val">{topCard.value}</div>
                    <div className="card-suit">{topCard.suit}</div>
                  </div>
                ) : (
                  <div className="card-suit-icon">{suit}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tableau Columns */}
      <div className="solitaire-tableau">
        {tableau.map((col, colIdx) => (
          <div
            key={colIdx}
            className="tableau-column"
            onClick={() => {
              if (waste.length > 0) {
                tryMoveToTableau(waste[waste.length - 1], 'waste', null, colIdx);
              }
            }}
          >
            {col.length === 0 && <div className="card-empty-slot col-empty" />}
            {col.map((card, cardIdx) => (
              <div
                key={card.id}
                className={`card tableau-card ${card.faceUp ? (card.isRed ? 'red' : 'black') : 'card-back'}`}
                style={{ top: `${cardIdx * 20}px` }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (card.faceUp) {
                    if (cardIdx === col.length - 1) {
                      // Try foundation move first on top card click
                      tryMoveToFoundation(card, 'tableau', colIdx);
                    }
                  }
                }}
              >
                {card.faceUp ? (
                  <>
                    <div className="card-val">{card.value}</div>
                    <div className="card-suit">{card.suit}</div>
                  </>
                ) : (
                  <div className="card-pattern">🎴</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="solitaire-win-banner">
          👑 CONGRATULATIONS! YOU SOLVED SOLITAIRE! 👑
        </div>
      )}
    </div>
  );
};

export default Solitaire;
