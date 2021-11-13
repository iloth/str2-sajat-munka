/* eslint-disable no-param-reassign */
const matchingGame = {
  cells: [...document.querySelectorAll('.board__col')],
  timerLabel: document.querySelector('.timer__label'),
  cards: [
    ['00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00'],
  ],
  visiblePositions: [],
  foundPositions: [],
  gameStarted: undefined,
  intervalRef: undefined,

  init() {
    this.cells.forEach((item) => item.addEventListener('click', () => {
      this.cellClick(item.dataset.position);
    }));

    this.startGame();
  },

  cellClick(position = '-') {
    if (this.visiblePositions.some((item) => item === position)
        || this.foundPositions.some((item) => item === position)
        || this.visiblePositions.length === 2) {
      return;
    }

    if (this.intervalRef === undefined) {
      this.startInterval();
    }

    this.showCard(position);

    if (this.visiblePositions.length === 2) {
      if (this.checkMatch()) {
        this.foundPositions.push(...this.visiblePositions);
        this.visiblePositions = [];
        if (this.foundPositions.length === this.cells.length) {
          this.endGame();
        }
      } else {
        setTimeout(() => this.hideVisibleCards(), 1000);
      }
    }
  },

  startGame() {
    document.querySelectorAll('.card__foreground').forEach((item) => { item.remove(); });
    document.querySelectorAll('.card__background').forEach((item) => { item.style.display = 'initial'; });

    this.foundPositions = [];
    this.visiblePositions = [];
    this.timerLabel.textContent = '00:00';

    this.shuffleDeck();
    this.addCards();
  },

  endGame() {
    this.stopInterval();
    setTimeout(() => {
      this.startGame();
    }, 5000);
  },

  shuffleDeck() {
    const deck = ['01', '01', '02', '02', '03', '03', '04', '04', '05', '05'];

    let row = 1;
    let col = 1;
    while (deck.length > 0) {
      const index = Math.floor(Math.random() * deck.length);
      const card = deck[index];
      this.cards[row - 1][col - 1] = card;
      deck.splice(index, 1);
      if (col === 5) {
        col = 1;
        row += 1;
      } else {
        col += 1;
      }
    }
  },

  addCards() {
    this.cells.forEach((item) => {
      const pos = item.dataset.position;
      const row = pos.split('-')[0];
      const col = pos.split('-')[1];

      const img = document.createElement('img');
      img.src = `assets/img/${this.cards[row - 1][col - 1]}.jpg`;
      img.alt = 'A card';
      img.classList.add('card__foreground');
      // img.style.display = 'none';
      item.appendChild(img);

      item.dataset.card = this.cards[row - 1][col - 1];
      item.classList.remove('card--flipped', 'card--unflip');
    });
  },

  startInterval() {
    this.gameStarted = new Date();
    this.intervalRef = setInterval(() => {
      this.refreshTimerLabel();
    }, 200);
  },

  stopInterval() {
    clearInterval(this.intervalRef);
    this.intervalRef = undefined;
  },

  refreshTimerLabel() {
    const ms = new Date() - this.gameStarted;
    const seconds = (Math.round(ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor(ms / 1000 / 60).toString().padStart(2, '0');
    this.timerLabel.textContent = `${minutes}:${seconds}`;
  },

  checkMatch() {
    const cell1 = this.cells.find((item) => item.dataset.position === this.visiblePositions[0]);
    const cell2 = this.cells.find((item) => item.dataset.position === this.visiblePositions[1]);

    return (cell1.dataset.card === cell2.dataset.card);
  },

  showCard(position) {
    const cell = this.cells.find((item) => item.dataset.position === position);
    // const bg = cell.querySelector('.card__background');
    // const img = cell.querySelector('.card__foreground');
    // bg.style.display = 'none';
    // img.style.display = 'initial';
    cell.classList.add('card--flipped');
    this.visiblePositions.push(position);
  },

  hideVisibleCards() {
    while (this.visiblePositions.length > 0) {
      this.hideCard(this.visiblePositions.pop());
    }
  },

  hideCard(position) {
    const cell = this.cells.find((item) => item.dataset.position === position);
    // const bg = cell.querySelector('.card__background');
    // const img = cell.querySelector('.card__foreground');
    // bg.style.display = 'initial';
    // img.style.display = 'none';
    cell.classList.add('card--unflip');
    setTimeout(() => {
      cell.classList.remove('card--flipped', 'card--unflip');
    }, 500);
  },

};

export default matchingGame;
