const tictactoe = {
    _cells: [],                 // cells on board
    _currentPlayer: "",         // X or O
    _playerDiv: undefined,      // container of current player text     
    _playerSpan: undefined,     // span of current player (X or O)
    _winnerDiv: undefined,      // container of winner player text 
    _winnerSpan: undefined,     // span of winner player (X or O)           
    _drawDiv: undefined,        // container of the text in case of draw
    _disabled: false,           // to prohibit click on cells - after win

    //initialize the game
    init: function (mainArea) {
        _cells = Array.from(mainArea.querySelectorAll(".tictactoe__cell"));
        _playerDiv = mainArea.querySelector(".tictactoe__player");
        _playerSpan = mainArea.querySelector(".tictactoe__player__span");
        _winnerDiv = mainArea.querySelector(".tictactoe__winner");
        _winnerSpan = mainArea.querySelector(".tictactoe__winner__span");
        _drawDiv = mainArea.querySelector(".tictactoe__draw");

        //Add event listener to cells
        _cells.map((cell) => cell.addEventListener("click", (e) => this._cellClick(e, cell.dataset.coord)));

        // Clear game board on HTML page
        this.clear();

    },

    //clear the board and reset all variables
    clear: function () {
        //clean the board
        _cells.map((cell) => {
            cell.innerHTML = "";
            cell.classList.remove("win");
        });

        //randomly set current player to X or O
        _currentPlayer = (Math.round(Math.random() * 100) % 2) == 0 ? "X" : "O";

        //reset variables
        _playerSpan.innerHTML = _currentPlayer;
        _playerDiv.style.display = "block";
        _winnerDiv.style.display = "none"
        _drawDiv.style.display = "none";
        _disabled = false;
    },

    //handle click on cells
    _cellClick: function (e, coord) {
        e.stopPropagation();

        if (_disabled)
            return;

        const cell = _cells.find((cell) => cell.dataset.coord == coord);
        if (cell.innerHTML == "") {
            cell.innerHTML = _currentPlayer;
            const winRow = this._checkGoal();
            if (winRow) {
                this._finish(winRow);
            } else if (!this._checkMoreRound()) {
                this._finish(false);
            } else {
                this._changePlayer();
            }
        }
    },

    //return false if the board is full
    _checkMoreRound: function () {
        return _cells.some((cell) => cell.innerHTML == "");
    },

    //return the winner row: array of cells (if available) or false 
    _checkGoal: function () {
        //vertical
        for (x = 1; x <= 3; x++) {
            const col = _cells.filter((cell) => cell.dataset.coord.match(new RegExp(x + "-[0-9]")));
            if (col.every((cell) => cell.innerHTML == _currentPlayer))
                return col;
        }

        //horizontal
        for (y = 1; y <= 3; y++) {
            const row = _cells.filter((cell) => cell.dataset.coord.match(new RegExp("[0-9]-" + y)));
            if (row.every((cell) => cell.innerHTML == _currentPlayer))
                return row;
        }

        //diagonal
        let diag = _cells.filter((cell) => ["1-1", "2-2", "3-3"].includes(cell.dataset.coord));
        if (diag.every((cell) => cell.innerHTML == _currentPlayer))
            return diag;
        diag = _cells.filter((cell) => ["1-3", "2-2", "3-1"].includes(cell.dataset.coord));
        if (diag.every((cell) => cell.innerHTML == _currentPlayer))
            return diag;

        return false;
    },

    //set the current player
    _changePlayer: function () {
        _currentPlayer = _currentPlayer == "X" ? "O" : "X";
        _playerSpan.innerHTML = _currentPlayer;
    },

    //popup the draw or win message and highlight the winner cells
    _finish: function (winRow) {
        _playerDiv.style.display = "none";
        if (winRow) {
            _winnerSpan.innerHTML = _currentPlayer;
            _winnerDiv.style.display = "block"
            winRow.map((cell) => cell.classList.add("win"));
        } else {
            _drawDiv.style.display = "block";
        }
        _disabled = true;
    }

}