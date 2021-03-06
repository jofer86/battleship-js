const GameBoard = (ships) => {
  const gridT = ['0123456789', '0123456789'];
  const grid = new Array(10);
  gridT[0].split('').forEach((item, i) => {
    grid[i] = [];
    gridT[1].split('').forEach((suItem) => {
      grid[i].push({
        pos: `${item}${suItem}`,
        state: 'empty',
      });
    });
  });

  const board = grid;
  const sunken = [];
  const validPosition = (ship, coord, facing) => {
    const cordH = parseInt(coord.pos[1]);
    const cordV = parseInt(coord.pos[0]);
    if (facing === 'horizontal') {
      for (let j = cordH; j <= cordH + ship.length - 1; j++) {
        if (!board[cordV][j] || board[cordV][j].state !== 'empty') {
          return false;
        }
      }
    } else {
      for (let i = cordV; i <= cordV + ship.length - 1; i++) {
        if (!board[i] || board[i][cordH].state !== 'empty') {
          return false;
        }
      }
    }
    return true;
  };

  return {
    validPosition,
    board,
    placeShip: () => {
      ships.map((ship) => {
        let [randomH, randomV] = [0, 0];
        let coord;
        const facing = ['horizontal', 'vertical'];
        let dir;
        do {
          randomH = Math.round(Math.random() * 9);
          randomV = Math.round(Math.random() * 9);
          coord = board[randomV][randomH];
          dir = Math.round(Math.random() * 1);
        } while (!validPosition(ship, coord, facing[dir]));
        if (facing[dir] === 'horizontal') {
          for (let i = randomH; i < randomH + ship.length; i++) {
            board[randomV][i].state = 'taken';
            ship.position.push(board[randomV][i].pos);
          }
        } else if (facing[dir] === 'vertical') {
          for (let i = randomV; i < randomV + ship.length; i++) {
            board[i][randomH].state = 'taken';
            ship.position.push(board[i][randomH].pos);
          }
        }
        return ship;
      });
    },
    recieveAttack: (coord1, coord2) => {
      const bomb = board[coord1][coord2];
      const position = bomb.pos;
      const ship = ships.filter((e) => e.position.includes(position))[0];
      if (ship) {
        ship.hit(position);
        board[coord1][coord2].state = 'hit';
        if (ship.isSunk()) {
          sunken.push(ship.type());
        }
      } else {
        board[coord1][coord2].state = 'miss';
      }
    },
    gameOver: () => {
      if (sunken.length >= ships.length) {
        return true;
      }
      return false;
    },
    sunkedShips: () => sunken.length,
  };
};

export default GameBoard;
