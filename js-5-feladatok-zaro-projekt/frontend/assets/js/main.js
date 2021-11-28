import Users from './users.js';
import { DataTable, DataColumn } from './datatable.js';
import Messages from './messages.js';

const users = new Users();
const dataTable = new DataTable();
const main = document.querySelector('main');

dataTable.columns = [
  new DataColumn('ID', 'id', '', null, '', true),
  new DataColumn('Name', 'name', 'text', (value) => Users.validateName(value)),
  new DataColumn('Email', 'emailAddress', 'email', (value) => Users.validateEmail(value)),
  new DataColumn('Address', 'address', 'text', (value) => Users.validateAddress(value)),
];
dataTable.idFieldName = 'id';
dataTable.readonly = false;

dataTable.createRecordCallback = async (record) => {
  try {
    const ret = await users.create(record);
    Messages.showSuccess('User is created.');
    return ret;
  } catch (error) {
    Messages.showError(error);
    return null;
  }
};

dataTable.updateRecordCallback = async (record) => {
  try {
    const ret = await users.update(record);
    Messages.showSuccess('User is modified.');
    return ret;
  } catch (error) {
    Messages.showError(error);
    return null;
  }
};

dataTable.deleteRecordCallback = async (record) => {
  try {
    const ret = await users.delete(record);
    Messages.showSuccess('User is deleted.');
    return ret;
  } catch (error) {
    Messages.showError(error);
    return null;
  }
};

dataTable.rowValidationCallback = (validationErrors = new Map()) => {
  const popup = document.createElement('div');
  const title = document.createElement('h4');
  title.innerText = 'Validation Error(s):';
  popup.appendChild(title);

  const ulFields = document.createElement('ul');
  ulFields.classList.add('validation_errors');
  validationErrors.forEach((value, key) => {
    const liFieldName = document.createElement('li');
    liFieldName.innerText = dataTable.columns.find((column) => column.fieldName === key).title;
    ulFields.appendChild(liFieldName);

    const liErrors = document.createElement('li');
    const ulErrors = document.createElement('ul');
    if (Array.isArray(value)) {
      value.forEach((error) => {
        const liError = document.createElement('li');
        liError.innerText = error;
        ulErrors.appendChild(liError);
      });
    } else {
      const liError = document.createElement('li');
      liError.innerText = value;
      ulErrors.appendChild(liError);
    }

    liErrors.appendChild(ulErrors);
    ulFields.appendChild(liErrors);
  });
  popup.appendChild(ulFields);

  Messages.showError(popup.innerHTML);
};

users.load()
  .then(() => {
    main.innerHTML = '';
    main.appendChild(dataTable.getHtmlNode(users.list));
  })
  .catch((error) => {
    Messages.showError(error);
  });
