'use strict'

const todo = {
    _storageKey: "todo_items",
    _dataBase: [],
    _dateDiv: document.querySelector(".todo__date"),
    _addInput: document.querySelector(".todo__add__input"),
    _addButton: document.querySelector(".todo__add__button"),
    _pendingDiv: document.querySelector(".todo__pending"),
    _pendingLst: document.querySelector(".todo__pending__list"),
    _pendingLbl: document.querySelector(".todo__pending__label"),
    _completedDiv: document.querySelector(".todo__completed"),
    _completedLst: document.querySelector(".todo__completed__list"),
    _completedLbl: document.querySelector(".todo__completed__label"),
    _chillDiv: document.querySelector(".todo__chill"),
    _buttonsDiv: document.querySelector(".todo__buttons"),
    _hideCompleteBtn: document.querySelector(".todo__hide__button"),
    _hideComplete: false,

    init() {
        const lang = navigator.languages ? navigator.languages[0] : navigator.language;
        const now = (new Date());
        this._dateDiv.innerHTML = new Intl.DateTimeFormat(lang, {
            dateStyle: 'full'
        }).format(now);

        if (storage.exists(this._storageKey)) {
            this._dataBase = storage.getItemObject(this._storageKey);
        }

        this._dataBase.forEach((item) => this._addListItem(item));
        this._refreshHtml();
        this._addButton.addEventListener("click", (e) => {
            this._addButtonClick(e);
        });
    },

    _refreshHtml() {
        if (this._dataBase.length == 0) {
            this._chillDiv.style.display = "block";
            this._pendingDiv.style.display = "none";
            this._completedDiv.style.display = "none";
            this._buttonsDiv.style.display = "none";
        } else {
            this._chillDiv.style.display = "none";
            this._pendingDiv.style.display = "block";
            if (this._hideComplete) {
                this._hideCompleteBtn.textContent = "Show Completes";
                this._completedDiv.style.display = "none";
            } else {
                this._hideCompleteBtn.textContent = "Hide Completes";
                this._completedDiv.style.display = "block";
            }
            this._buttonsDiv.style.display = "block";

            const pending = this._dataBase.filter((item) => !item.completed).length;
            this._pendingLbl.textContent = `You have ${pending} pending items`;

            const completed = this._dataBase.filter((item) => item.completed).length;
            this._completedLbl.textContent = `Completed items: ${Math.round(100 * completed / this._dataBase.length)}%`
        }
    },

    _addListItem(item) {
        let temp = document.createElement("temp");
        temp.innerHTML = html `
            <div class="todo__item closed" id="todo_${item.id}">
                <label class="todo__item__label" for="todo_input_${item.id}">
                    <input class="todo__item__checkbox" type="checkbox" id="todo_input_${item.id}"${item.completed ? " checked" : ""}>
                    ${item.text}
                    <button class="todo__item__button button--red"><i class="fas fa-trash-alt"></i></button>
                </label>
            </div>`;
        let element = temp.firstElementChild;
        if (item.completed) {
            this._completedLst.appendChild(element);
        } else {
            this._pendingLst.appendChild(element);
        }
        element.querySelector(".todo__item__checkbox").addEventListener("click", (e) => {
            this._itemInputClick(e, item.id);
        });
        element.querySelector(".todo__item__button").addEventListener("click", (e) => {
            this._itemDeleteClick(e, item.id);
        });
        setTimeout(() => {
            element.classList.remove("closed");
        }, 1);
    },

    _removeListItem(item) {
        const listItem = document.getElementById(`todo_${item.id}`);
        listItem.classList.add("closed");
        setTimeout(() => {
            listItem.remove();
        }, 1000);
    },

    _itemInputClick(e, id) {
        e.stopPropagation();
        const chb = document.getElementById(`todo_input_${id}`);

        const index = this._dataBase.findIndex((item) => item.id == id);
        if (index > -1) {
            this._dataBase[index].completed = chb.checked;
            storage.setItemObject(this._storageKey, this._dataBase);
            this._removeListItem(this._dataBase[index]);
            this._addListItem(this._dataBase[index]);
            this._refreshHtml();
        }
    },

    _itemDeleteClick(e, id) {
        e.stopPropagation();

        const index = this._dataBase.findIndex((item) => item.id == id);

        if (index > -1) {
            this._removeListItem(this._dataBase[index]);
            this._dataBase.splice(index, 1);
            storage.setItemObject(this._storageKey, this._dataBase);
            this._refreshHtml();
        }
    },

    _addButtonClick(e) {
        e.stopPropagation();

        if (this._addInput.value.trim()) {
            const id = Math.round(Math.random() * 9999999).toString().padStart(7, "0");
            const item = {
                id: id,
                text: this._addInput.value,
                completed: false
            };

            this._dataBase.push(item);
            storage.setItemObject(this._storageKey, this._dataBase);
            this._addListItem(item);
            this._addInput.value = "";
            this._refreshHtml();
        }
    },

    toggleComplete() {
        this._hideComplete = !this._hideComplete;
        this._refreshHtml();
    },

    clearAll() {
        this._dataBase.forEach((item) => {
            this._removeListItem(item);
        });
        this._dataBase = [];
        storage.setItemObject(this._storageKey, this._dataBase);
        this._refreshHtml();
    },
}