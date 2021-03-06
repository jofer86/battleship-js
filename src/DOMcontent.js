const computerBoard = (() => {
  const playerStatus = document.querySelector('.pl-status');
  const compStatus = document.querySelector('.cp-status');
  const comBoard = document.querySelector('.board__computer');
  const playerBoard = document.querySelector('.board__player');
  const playerHits = document.querySelector('#pl-hits');
  const compHits = document.querySelector('#cp-hits');
  const worngMoveInd = document.querySelector('.invalid');
  const wrapper = document.querySelector('.in-wrapper');
  const playerWin = `
    <div class="playerWin">
      <h1> Congratulations!! You are the Winner! </h1>
      <button class="gameStart"> Play Again </button>
    </div> 
  `;
  const computerWin = `
  <div class="computerWin">
    <h1> Oh no!! The Computer Wins! </h1>
    <button class="gameStart"> Play Again </button>
  </div> 
`;
  const buildCompBoard = (game) => {
    const html = game.board
      .map((line, i) => {
        const row = line
          .map((cell, j) => {
            let mark;
            let state = '';
            switch (cell.state) {
              case 'hit':
                mark = 'x';
                state = 'hit';
                break;
              case 'miss':
                mark = '||';
                state = 'miss';
                break;
              default:
                mark = [i, j].join('');
                break;
            }
            return `
        <div class="col bot ${state}" id="${[i, j].join('')}">${mark}</div>
        `;
          })
          .join('');
        return `
        <div class="row" > ${row}</div>
        `;
      })
      .join('');
    comBoard.innerHTML = html;
  };

  const buildPlayerBoard = (game) => {
    const html = game.board
      .map((line, ind) => {
        const row = line
          .map((cell, jind) => {
            let state;
            switch (cell.state) {
              case 'taken':
                state = '';
                break;
              default:
                state = [ind, jind].join('');
                break;
            }
            return `
        <div class= "col ${cell.state} " id = "P${[ind, jind].join(
    '',
  )}" > ${state}</div>
        `;
          })
          .join('');
        return `
        <div class= "row" > ${row}</div>
        `;
      })
      .join('');
    playerBoard.innerHTML = html;
  };

  const changeCell = (div, cell) => {
    let state = '';
    switch (cell.state) {
      case 'hit':
        state = 'hit';
        break;
      case 'miss':
        state = 'miss';
        break;
      default:
        break;
    }
    div.classList.add(state);
    div.innerText = '';
  };

  const updateBanner = (turn, hits) => {
    if (turn) {
      playerHits.innerText = `${hits} sunked ships`;
      playerStatus.classList.remove('active');
      compStatus.classList.add('active');
    } else {
      compHits.innerText = `${hits} sunked ships`;
      playerStatus.classList.add('active');
      compStatus.classList.remove('active');
    }
  };

  return {
    buildCompBoard,
    buildPlayerBoard,
    comBoard,
    changeCell,
    updateBanner,
    wrapper,
    playerWin,
    computerWin,
    worngMoveInd,
  };
})();
export default computerBoard;
