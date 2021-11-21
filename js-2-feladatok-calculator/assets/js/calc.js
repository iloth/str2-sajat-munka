// TODO && KNOWN ISSUES:
// - műveletek sorrendje
// - túl hosszú kifejezés nem látszik
// NICE TO HAVE:
// - history
// - Backspace
// - keypress

const calc = {
  main: document.querySelector('.calc__main'),
  input: document.querySelector('.calc__input'),

  init() {
    this.main.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onClick(e.target);
    });
  },

  onClick(target) {
    if (this.input.classList.contains('calc__input--result')) {
      this.input.value = '';
      this.input.classList.remove('calc__input--result');
    }

    if (target.classList.contains('calc__button--eq')) {
      this.input.value = this.eval(this.input.value);
      this.input.classList.add('calc__input--result');
    } else if (target.textContent === 'C') {
      this.input.value = '';
    } else if (target.classList.contains('calc__button--operation')) {
      if ('+-*/'.indexOf(this.input.value[this.input.value.length - 1]) > -1
          || this.input.value === '') {
        console.log('invalid');
      } else {
        this.input.value += target.textContent;
      }
    } else if (target.classList.contains('calc__button')) {
      this.input.value += target.textContent;
    }
  },

  eval(expression = '') {
    const expressionArray = this.getExpressionArray(expression);
    if (expressionArray.length < 3 || expressionArray.length % 2 !== 1) {
      return 0;
    }

    let result = Number.parseFloat(expressionArray[0]);
    for (let i = 1; i < expressionArray.length; i += 2) {
      switch (expressionArray[i]) {
        case '+':
          result += Number.parseFloat(expressionArray[i + 1]);
          break;
        case '-':
          result -= Number.parseFloat(expressionArray[i + 1]);
          break;
        case '*':
          result *= Number.parseFloat(expressionArray[i + 1]);
          break;
        case '/':
          result /= Number.parseFloat(expressionArray[i + 1]);
          break;
        default:
      }
    }

    return result;
  },

  getExpressionArray(expression) {
    const arr = [];
    let number = '';
    for (let char = 0; char < expression.length; char += 1) {
      if ('+-/*'.indexOf(expression[char]) > -1) {
        if (number !== '') {
          arr.push(number);
          number = '';
        }
        arr.push(expression[char]);
      } else if ('.0123456789'.indexOf(expression[char]) > -1) {
        number += expression[char];
      }
    }
    if (number !== '') {
      arr.push(number);
      number = '';
    }
    return arr;
  },
};

export default calc;
