class Clock {
    constructor(targetElement) {
        this._hourDiv = targetElement.querySelector(".clock__hour");
        this._minuteDiv = targetElement.querySelector(".clock__minute");
        this._secondDiv = targetElement.querySelector(".clock__second");

        this.refreshScreen();
    }

    refreshScreen() {
        const currDate = new Date();
        this._hourDiv.innerHTML = currDate.getHours().toString().padStart(2, "0");
        this._minuteDiv.innerHTML = currDate.getMinutes().toString().padStart(2, "0");
        this._secondDiv.innerHTML = currDate.getSeconds().toString().padStart(2, "0");

        setTimeout(() => { this.refreshScreen() }, 100);
    }
}