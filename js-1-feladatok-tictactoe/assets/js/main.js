const tictactoe = {
    _board: undefined,                   // main div                            
    _cells: [],                          // cells on board
    _currentPlayer: "",                  // X or O
    _playerDiv: undefined,               // container of current player text     
    _playerSpan: undefined,              // span of current player (X or O)
    _winnerDiv: undefined,               // container of winner player text 
    _winnerSpan: undefined,              // span of winner player (X or O)           
    _drawDiv: undefined,                 // container of the text in case of draw
    _disabled: false,                    // to prohibit click on cells - after win

    //initialize the object
    init: function (doc, boardSelector) {
        _board = doc.querySelector(boardSelector);
        _cells = Array.from(doc.querySelectorAll(".cell"));
        _playerDiv = doc.querySelector(".player");
        _playerSpan = doc.querySelector(".player__span");
        _winnerDiv = doc.querySelector(".winner");
        _winnerSpan = doc.querySelector(".winner__span");
        _drawDiv = doc.querySelector(".draw");

        // Clear game board on HTML page
        this.clear();

        //Add event listener to cells
        _cells.map((cell) => cell.addEventListener("click", (e) => {
            this._cellClick(e, cell.id.substring(5))
        }));

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

        let cell = _cells.find((cell) => cell.id == "cell-" + coord);
        if (cell.innerHTML == "") {
            cell.innerHTML = _currentPlayer;
            let winRow = this._checkGoal();
            if (winRow) {
                this._finish(winRow);
            } else if (!this._checkMoreRound()) {
                this._finish(false);
            } else {
                this._changePlayer();
            }
        }
    },

    //return true if the board is full
    _checkMoreRound: function () {
        return _cells.some((cell) => cell.innerHTML == "");
    },

    //return the winner row array of cells (if available) or false 
    _checkGoal: function () {
        //vertical
        for (x = 1; x <= 3; x++) {
            const col = _cells.filter((cell) => cell.id.match(new RegExp("cell-" + x + "-[0-9]")));
            if (col.every((cell) => cell.innerHTML == _currentPlayer))
                return col;
        }

        //horizontal
        for (y = 1; y <= 3; y++) {
            const row = _cells.filter((cell) => cell.id.match(new RegExp("cell-[0-9]-" + y)));
            if (row.every((cell) => cell.innerHTML == _currentPlayer))
                return row;
        }

        //diagonal
        let diag = _cells.filter((cell) => ["cell-1-1", "cell-2-2", "cell-3-3"].includes(cell.id));
        if (diag.every((cell) => cell.innerHTML == _currentPlayer))
            return diag;
        diag = _cells.filter((cell) => ["cell-1-3", "cell-2-2", "cell-3-1"].includes(cell.id));
        if (diag.every((cell) => cell.innerHTML == _currentPlayer))
            return diag;

        return false;
    },

    //set the current player
    _changePlayer: function () {
        _currentPlayer = _currentPlayer == "X" ? "O" : "X";
        _playerSpan.innerHTML = _currentPlayer;
    },

    //popup the win or draw message and highlight the winner row
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