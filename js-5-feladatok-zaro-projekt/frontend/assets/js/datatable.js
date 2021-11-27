/* eslint-disable */
class DataTable {
  idFieldName = '';
  columns = [];
  readonly = false;
  customClasses = [];
  
  rowValidationCallback = null;
  createRecordCallback = null;
  updateRecordCallback = null;
  deleteRecordCallback = null;

  #tableNode;
  #dataLength;
  #defaultData = {};

  constructor() {
  }

  getHtmlNode(dataRows = []) {
    this.#tableNode = document.createElement('div');
    this.#tableNode.classList.add('datatable', ...this.customClasses);
    
    this.#tableNode.appendChild(this.#getHeaderNode());

    if (!this.readonly) {
      this.columns.forEach((column) => {
        this.#defaultData[column.fieldName] = column.defaultValue;
      });
      this.#tableNode.appendChild(this.#getDataRowNode(this.#defaultData, -1, false, true));
    }
    
    dataRows.forEach((item, index) => {
      this.#tableNode.appendChild(this.#getDataRowNode(item, index, true));
    })
    
    this.#dataLength = dataRows.length;

    return this.#tableNode;
  }

  //#region Display rows

  #getHeaderNode() {
    const header = document.createElement('div');
    header.classList.add('datatable__tr', 'datatable__tr--head');
    this.columns.forEach((column) => {
      const td = document.createElement('div');
      td.classList.add('datatable__td');
      td.innerText = column.title;
      header.appendChild(td);
    });

    if (!this.readonly) {
      //buttons
      const td = document.createElement('div');
      td.classList.add('datatable__td');
      header.appendChild(td);
    }
    return header;
  }

  #getDataRowNode(data, index, read = true, add = false) {
    const id = this.idFieldName ? data[this.idFieldName] : index;
    const row = document.createElement( read ? 'div' : 'form');
    row.classList.add('datatable__tr', 'datatable__tr--' + (read ? 'read' : (add ? 'add' : 'edit')));
    row.dataset.id = id;
    row.dataset.orig = JSON.stringify(data);

    this.columns.forEach((column) => {
      const td = document.createElement('div');
      td.classList.add('datatable__td');
      if (read || column.readonly) {        
        td.appendChild(document.createTextNode(data[column.fieldName]));
      }
      if (!read) {
        td.appendChild(this.#getColumnEditorNode(column, data[column.fieldName]));
      }
      row.appendChild(td);
    });

    if (!this.readonly) {
      //buttons
      const td = document.createElement('div');
      td.classList.add('datatable__td');
      let buttons;
      if (read) {
        buttons = this.#getReadRowButtons(id);
      } else if (add) {
        buttons = this.#getAddRowButtons(id);
        row.addEventListener('submit', (e) => {
          e.preventDefault();
          this.#addButtonClick(id);
        });
      } else {
        buttons = this.#getEditRowButtons(id);
        row.addEventListener('submit', (e) => {
          e.preventDefault();
          this.#saveButtonClick(id);
        });
      }
      buttons.forEach(element => {
        td.appendChild(element);
      });
      row.appendChild(td);
    }

    return row;
  }

  #getColumnEditorNode(column, value) {
    if (column.readonly) {
      column.editorType = 'hidden';
    }

    switch(column.editorType) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'date':
      case 'hidden':
        const input = document.createElement('input');
        input.type = column.editorType;
        input.name = column.fieldName;
        input.value = value;
        if (column.validatorFunction) {
          input.addEventListener('keyup', (e) => { this.#validateField(e.target.value, column); });
        }
        return input;
      default:
        throw new Error(`Error in column "${column.fieldName}": Unknown editor type ("${column.editorType}").`)
    }

  }

  //#endregion

  //#region Display Buttons

  #getReadRowButtons(id) {
    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = '<i class="far fa-edit"></i>';
    btnEdit.classList.add('datatable__btn', 'datatable__btn--edit');
    btnEdit.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.#editButtonClick(id);
    });

    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
    btnDelete.classList.add('datatable__btn', 'datatable__btn--delete');
    btnDelete.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.#deleteButtonClick(id);
    });

    return [btnEdit, btnDelete];
  }

  #getEditRowButtons(id) {
    const btnCancel = document.createElement('button');
    btnCancel.type = 'button';
    btnCancel.innerHTML = '<i class="far fa-times-circle"></i>';
    btnCancel.classList.add('datatable__btn', 'datatable__btn--cancel');
    btnCancel.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.#cancelButtonClick(id);
    });

    const btnSave = document.createElement('button');
    btnSave.type = 'submit';
    btnSave.innerHTML = '<i class="far fa-save"></i>';
    btnSave.classList.add('datatable__btn', 'datatable__btn--save');
    // btnSave.addEventListener('click', (e) => {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   this.#saveButtonClick(id);
    // });

    return [btnCancel, btnSave];
  }

  #getAddRowButtons(id) {
    const btnUndo = document.createElement('button');
    btnUndo.type = 'button';
    btnUndo.innerHTML = '<i class="fas fa-undo-alt"></i>';
    btnUndo.classList.add('datatable__btn', 'datatable__btn--undo');
    btnUndo.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.#undoButtonClick(id);
    });

    const btnSave = document.createElement('button');
    btnSave.type = 'submit';
    btnSave.innerHTML = '<i class="far fa-save"></i>';
    btnSave.classList.add('datatable__btn', 'datatable__btn--add');
    // btnSave.addEventListener('click', (e) => {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   this.#addButtonClick(id);
    // });

    return [btnUndo, btnSave];
  }

  #toggleEditButtons(visible) {
    const buttons = this.#tableNode.querySelectorAll('.datatable__btn--edit, .datatable__btn--delete');
    buttons.forEach((button) => {
      button.style.visibility = visible ? 'visible' : 'hidden';
    });
  }

  //#endregion

  //#region Button Handlers
 
  #editButtonClick(id) {
    const row = this.#tableNode.querySelector(`.datatable__tr--read[data-id="${id}"]`);
    const data = JSON.parse(row.dataset.orig);
    const form = this.#getDataRowNode(data, id, false);
    this.#tableNode.insertBefore(form, row);
    row.remove();
    this.#toggleEditButtons(false);
  }

  async #deleteButtonClick(id) {
    const row = this.#tableNode.querySelector(`.datatable__tr--read[data-id="${id}"]`);
    const data = JSON.parse(row.dataset.orig);
    await this.deleteRecordCallback(data);
    row.remove();
  }

  #undoButtonClick(id) {
    const form = this.#tableNode.querySelector('.datatable__tr--add');
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input.type != 'button') {
        input.value = this.#defaultData[input.name];
      }
    });
  }

  async #addButtonClick() {
    let data = this.#getFormData('.datatable__tr--add');
    const validationResult = this.#validateRow(data);
    if (validationResult === null || validationResult === true || validationResult.length === 0 || validationResult.size === 0) {
      const ret = await this.createRecordCallback(data);
      data = ret ? ret : data;
      
      const newRow = this.#getDataRowNode(data, this.idFieldName ? data[this.idFieldName] : this.#dataLength++, true);
      const firstRow = this.#tableNode.querySelector('.datatable__tr--read');
      if (firstRow) {
        this.#tableNode.insertBefore(newRow, firstRow);
      } else {
        this.#tableNode.appendChild(newRow);
      }
    }
  }

  #cancelButtonClick(id) {
    const form = this.#tableNode.querySelector(`.datatable__tr[data-id="${id}"]`);
    const data = JSON.parse(form.dataset.orig);
    const row = this.#getDataRowNode(data, id, true);
    this.#tableNode.insertBefore(row, form);
    form.remove();
    
    this.#toggleEditButtons(true);
  }

  async #saveButtonClick(id) {
    let data = this.#getFormData('.datatable__tr--edit');
    const validationResult = this.#validateRow(data);
    if (validationResult === null || validationResult === true || validationResult.length === 0 || validationResult.size === 0) {
      const ret = await this.updateRecordCallback(data);
      data = ret ? ret : data;

      const form = this.#tableNode.querySelector(`.datatable__tr--edit[data-id="${id}"]`);
      console.log(id);
      const row = this.#getDataRowNode(data, id, true);
      this.#tableNode.insertBefore(row, form);
      form.remove();
      
      this.#toggleEditButtons(true);
    } 
  }

  //#endregion

  //#region Validation

  #getFormData(selector) {
    const data = {};
    const form = this.#tableNode.querySelector(selector);
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input.type != 'button') {
        data[input.name] = input.value;
      }
    });
    if (this.idFieldName) {
      data[this.idFieldName] = form.dataset.id;
    }
    return data;
  }

  #validateField(value, column) {
    if (column.validatorFunction) {
      const ret = column.validatorFunction(value);
      if (ret === true || ret === null || ret === undefined) {
        return null;
      } else if (ret === false) {
        return 'invalid';
      } else if (Array.isArray(ret)) {
        return ret;
      } else {
        return ret.toString();
      }
    } else {
      return null;
    }
}

  #validateRow(data) {
    const result = new Map();
    this.columns.forEach((column) => {
      const res = this.#validateField(data[column.fieldName], column);
      if (res) {
        result.set(column.fieldName, res);
      }
    }, []);

    if (this.rowValidationCallback && result.size > 0) {
      this.rowValidationCallback(result);
    }

    return result;
  }

  //#endregion
}

class DataColumn {
  title;
  fieldName;
  editorType;
  validatorFunction;
  defaultValue;
  readonly;

  constructor(title, fieldName, editorType = 'text', validatorFunction = null, defaultValue = '', readonly = false) {
    this.title = title;
    this.fieldName = fieldName;
    this.editorType = editorType;
    this.validatorFunction = validatorFunction; 
    this.defaultValue = defaultValue;
    this.readonly = readonly;

    if (this.fieldName === null || this.fieldName === '' ) {
      throw new Error('DataColumn.fieldName can not be null or empty!');
    }

    if (this.title === null || this.title === '' ) {
      this.title = this.fieldName;
    }
  }
}

export { DataTable, DataColumn };