// 1. Deposite some money
// 2. Determine number of lines to bet
// 3. Collect the bet money
// 4. Spin the slot machine
// 5. check f the user won
// 6. Give the user there winnings
// 7. Play again

import promptSync from "prompt-sync";
const prompt = promptSync();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 7,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposite = () => {
  while (true) {
    const despositeAmount = prompt("Enter a deposite Amount: ");
    const numberDepositeAmount = parseFloat(despositeAmount);
    if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0) {
      console.log("Enter a valid number");
    } else {
      return numberDepositeAmount;
    }
  }
};

const getBetLines = () => {
  while (true) {
    const Lines = prompt("Enter no of lines to bet on (1 - 3): ");
    const numberOfLines = parseFloat(Lines);
    if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
      console.log("Enter valid number of lines. try again ");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Enter valid number of lines. try again ");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];

  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const radomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[radomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(radomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (let row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbol[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposite();
  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getBetLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());
    console.log("Total Balance : " + balance.toString() + "\n");

    if (balance <= 0) {
      console.log("You ran out of money");
      break;
    }
    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();
