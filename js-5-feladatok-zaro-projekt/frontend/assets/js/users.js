import Ajax from './ajax.js';

class Users {
  #urlData;
  #urlList;
  #urlItem;
  list;
  map = new Map();
  
  constructor() {
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

  static validateName(value = '') {
    if (!value || value.toString().trim() === '')
      return ['is required'];

    if (!value.match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/))
      return ['must be full name with proper case']
  }

  static validateEmail(value) {
    if (!value || value.toString().trim() === '')
      return ['Email is required'];

    if (!value.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[\w]{2,3}$/))
      return ['must be valid email address (fe: yourname@comapny.com)']
  }

  static validateAddress(value) {
    if (!value || value.toString().trim() === '')
      return ['Address is required'];

    if (!value.match(/^[\d]+\s[\w\s]+$/))
      return ['must be valid address (fe: 0 Main Street)']
  }
}

export default Users;