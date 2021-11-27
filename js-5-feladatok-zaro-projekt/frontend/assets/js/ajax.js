class Ajax {
  static async get(url = '') {
    const result = await fetch(url);
    return result;
  }

  static async getJson(url = '') {
    const result = await Ajax.get(url);
    const json = await result.json();
    return json;
  }

  static async postJson(url = '', data = {}) {
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await fetch(url, options);
    return result;
  }

  static async putJson(url = '', data = {}) {
    const options = {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await fetch(url, options);
    return result;
  }

  static async delete(url = '') {
    const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await fetch(url, options);
    return result;
  }


}

export default Ajax;
