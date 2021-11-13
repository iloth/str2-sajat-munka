class Clock {
  constructor(targetElement) {
    this.clockLabel = targetElement.querySelector('.clock__label');
    setInterval(() => {
      this.refreshScreen();
    }, 300);
  }

  refreshScreen() {
    const currDate = new Date();
    const hour = currDate.getHours().toString().padStart(2, '0');
    const min = currDate.getMinutes().toString().padStart(2, '0');
    const sec = currDate.getSeconds().toString().padStart(2, '0');

    this.clockLabel.textContent = `${hour}:${min}:${sec}`;
  }
}
