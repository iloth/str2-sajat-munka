class Messages {
  static #showMessage(text, type) {
    const messages = document.querySelector('.messages');
    
    const message = document.createElement('div');
    message.classList.add('message', `message--${type}`);

    const button = document.createElement('button');
    button.classList.add('message__close');
    button.innerHTML = '<i class="far fa-window-close"></i>';
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      message.classList.add('message--closing');
      setTimeout(() => {
        message.remove();
      }, 1000);
    });

    const body = document.createElement('div');
    body.classList.add('message__body');
    body.innerHTML = text;

    message.appendChild(button);
    message.appendChild(body);
    messages.appendChild(message);

    setTimeout(() => {
      message.classList.add('message--closing');
      setTimeout(() => {
        message.remove();
      }, 1000);
    }, 5000);

  }

  static showError(text) {
    Messages.#showMessage(text, 'error');
  }
  static showSuccess(text) {
    Messages.#showMessage(text, 'success');
  }
  static showInfo(text) {
    Messages.#showMessage(text, 'info');
  }
}

export default Messages;