import Ajax from './ajax.js';
class Users {
  #urlData;
  #urlList;
  #urlItem;
  list;
  map = new Map();

  constructor(lang) {
    this.#urlData = 'http://localhost:3000/users';
    this.#urlList = this.#urlData;
    this.#urlItem = this.#urlData + '/[id]'
  }
  
  async load() {
    this.list = await Ajax.getJson(this.#urlList);
    this.map.clear();
    this.list.forEach((user) => {
      this.map.set(user.id, user);
    });
  }
  
  async get(id) {
    return await Ajax.getJson(this.#urlItem.replace('[id]', id));
  }
  
  async create(user) {
    delete user.id;
    const resp = await Ajax.postJson(this.#urlData, user);
    return await resp.json();
  }
  
  async update(user) {
    const resp = await Ajax.putJson(this.#urlItem.replace('[id]', user.id), user);
    return await resp.json();
  }

  async delete(user) {
    const resp = await Ajax.delete(this.#urlItem.replace('[id]', user.id));
    return await resp.json();
  }

  static validateName(value = '', localization) {
    const ret = [];

    if (!value || value.toString().trim() === '')
      ret.push(localization.translate('NameRequired'));

    if (!value.match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/))
      ret.push(localization.translate('NameRegex'));

    return ret.length == 0 ? null : ret;
  }

  static validateEmail(value, localization) {
    const ret = [];

    if (!value || value.toString().trim() === '')
      ret.push(localization.translate('EmailRequired'));

    if (!value.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[\w]{2,3}$/))
      ret.push(localization.translate('EmailRegex'));

    return ret.length == 0 ? null : ret;
    }

  static validateAddress(value, localization) {
    const ret = [];
    
    if (!value || value.toString().trim() === '')
      ret.push(localization.translate('AddressRequired'));

    if (!value.match(/^[\d]+\s[\w\s]+$/))
      ret.push(localization.translate('AddressRegex'));

    return ret.length == 0 ? null : ret;
  }
}

export default Users;