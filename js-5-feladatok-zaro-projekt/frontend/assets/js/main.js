import Users from './users.js';
import { DataTable, DataColumn } from './datatable.js';
import Messages from './messages.js';
import Localization from './localization.js';

let langCode = 'hu';
const users = new Users();
const dataTable = new DataTable();
const localization = new Localization();

const main = document.querySelector('main');

const updateLocalizedItems = () => {
  if (dataTable.columns) {
    dataTable.columns[1].title = localization.translate('Name');
    dataTable.columns[2].title = localization.translate('Email');
    dataTable.columns[3].title = localization.translate('Address');
    dataTable.refreshColumnTitles();
  }

  document.querySelector('.navigation__left h3').innerText = localization.translate('NavTitle');
  document.querySelector('header h1').innerText = localization.translate('MainTitle');
};

const selectLanguage = async (code) => {
  const lang = localization.languages.get(code);
  const dropdownValue = document.querySelector('.language_dropdown .dropdown__value');
  dropdownValue.innerHTML = `<div class="dropdown__value" data-value="${lang.code}"><img src="${lang.flagUrl}" alt="Flag"> <span>${lang.name}</span> <i class='fas fa-angle-down'></i></div>`;
  await localization.load(code);
  langCode = code;
};

const configureLanguages = () => {
  const dropdown = document.querySelector('.language_dropdown');
  const dropdownItems = dropdown.querySelector('.dropdown__items');

  dropdownItems.innerHTML = '';

  localization.languages.forEach((value, key) => {
    const option = document.createElement('div');
    option.innerHTML = `<div class="dropdown__item" data-value="${key}"><img src="${value.flagUrl}" alt="Flag"> <span>${value.name}</span></div>`;
    option.addEventListener('click', () => {
      selectLanguage(key)
        .then(() => updateLocalizedItems());
    });
    dropdownItems.appendChild(option);
  });

  selectLanguage(langCode);
};

// #region configure dataTable
const validationErrorHtml = (validationErrors) => {
  const popup = document.createElement('div');
  const title = document.createElement('h4');
  title.innerText = localization.translate('ValidationErrors');
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

  return popup.innerHTML;
};

const configureDatatable = () => {
  dataTable.columns = [
    new DataColumn('ID', 'id', '', null, '', true),
    new DataColumn(localization.translate('Name'), 'name', 'text', (value) => Users.validateName(value, localization)),
    new DataColumn(localization.translate('Email'), 'emailAddress', 'email', (value) => Users.validateEmail(value, localization)),
    new DataColumn(localization.translate('Address'), 'address', 'text', (value) => Users.validateAddress(value, localization)),
  ];
  dataTable.idFieldName = 'id';
  dataTable.readonly = false;

  dataTable.createRecordCallback = async (record) => {
    try {
      const ret = await users.create(record);
      Messages.showSuccess(localization.translate('UserCreated'));
      return ret;
    } catch (error) {
      Messages.showError(error);
      return null;
    }
  };

  dataTable.updateRecordCallback = async (record) => {
    try {
      const ret = await users.update(record);
      Messages.showSuccess(localization.translate('UserModified'));
      return ret;
    } catch (error) {
      Messages.showError(error);
      return null;
    }
  };

  dataTable.deleteRecordCallback = async (record) => {
    try {
      const ret = await users.delete(record);
      Messages.showSuccess(localization.translate('UserDeleted'));
      return ret;
    } catch (error) {
      Messages.showError(error);
      return null;
    }
  };

  dataTable.rowValidationCallback = (validationErrors = new Map()) => {
    Messages.showError(validationErrorHtml(validationErrors));
  };
};

// #endregion

localization.load(langCode)
  .then(() => {
    configureLanguages();
    return Promise.resolve();
  })
  .then(() => {
    configureDatatable();
    return users.load();
  })
  .then(() => {
    main.innerHTML = '';
    main.appendChild(dataTable.getHtmlNode(users.list));
    updateLocalizedItems();
  })
  .catch((error) => {
    Messages.showError(error);
  });
