class Clock {
  constructor(targetElement) {
    this.clockLabel = targetElement.querySelector('.clock__label');
    this.refreshScreen();
  }

  refreshScreen() {
    const currDate = new Date();
    this.clockLabel.textContent = currDate.toLocaleTimeString(navigator.userLanguage, { timeFormat: 'long' });

    setTimeout(() => {
      this.refreshScreen();
    }, 500);
  }
}
