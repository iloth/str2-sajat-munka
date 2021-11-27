import Users from './users.js';
import { DataTable, DataColumn } from './datatable.js';

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
  const ret = await users.create(record);
  return ret;
};

dataTable.updateRecordCallback = async (record) => {
  const ret = await users.update(record);
  return ret;
};

dataTable.deleteRecordCallback = async (record) => { 
  const ret = await users.delete(record);
  return ret;
};

dataTable.rowValidationCallback = (validationErrors = new Map()) => {
  const popup = document.querySelector('.popup--error');

  const title = document.createElement('h4');
  title.innerText = 'Validation Error(s)';
  popup.appendChild(title);

  const ulFields = document.createElement('ul');
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

  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.innerHTML = '';
  }, 5000);
};

users.load()
  .then(() => {
    main.innerHTML = '';
    main.appendChild(dataTable.getHtmlNode(users.list));
  });
