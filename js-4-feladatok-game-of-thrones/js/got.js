/* eslint-disable no-param-reassign */
/* eslint-disable strict */

'use strict';

let mainList = [];
let filteredList = [];

const portraits = document.querySelector('.portraits');
const details = document.querySelector('.details');
const detailsPicture = document.querySelector('.details__picture img');
const detailsName = document.querySelector('.details__name');
const detailsHouse = document.querySelector('.details__house img');
const detailsBio = document.querySelector('.details__bio');

const clearDetails = () => {
  detailsPicture.src = '';
  detailsName.textContent = '';
  detailsHouse.src = '';
  detailsBio.textContent = '';

  details.style.display = 'none';
};

const refreshDetails = (person) => {
  clearDetails();

  if (person.picture) {
    detailsPicture.src = person.picture;
    detailsPicture.style.display = 'initial';
  } else {
    detailsPicture.src = '';
    detailsPicture.style.display = 'none';
  }
  detailsName.textContent = person.name;
  if (person.house) {
    detailsHouse.src = `./assets/houses/${person.house}.png`;
    detailsHouse.style.display = 'initial';
  } else {
    detailsHouse.src = '';
    detailsHouse.style.display = 'none';
  }

  detailsBio.textContent = person.bio;

  details.style.display = 'grid';
};

const portraitClick = (e) => {
  e.stopPropagation();

  const person = mainList.find((item) => item.name === e.currentTarget.dataset.id);
  refreshDetails(person);
};

const getList = async (url = '') => {
  const result = await fetch(url);
  mainList = await result.json();
};

const filterList = () => {
  const searchPattern = document.querySelector('#search_pattern');
  const pattern = searchPattern.value;
  const searchAlive = document.querySelector('input[name="search_alive"]:checked');
  const alive = searchAlive.value === '' ? null : searchAlive.value === 'true';

  console.log(`pattern: "${pattern}", alive: "${alive}"`);

  filteredList = mainList.filter((item = { name: '', dead: false }) => {
    let ret = true;
    if (pattern !== '') {
      ret = item.name.match(new RegExp(`${pattern}`, 'ig'));
    }

    if (ret && alive !== null) {
      if (item.dead === null || item.dead === undefined) {
        item.dead = false;
      }
      ret = item.dead !== alive;
    }

    return ret;
  });
};

const refreshList = () => {
  portraits.innerHTML = '';

  if (filteredList.length === 0) {
    const span = document.createElement('span');
    span.classList.add('not-found', 'error');
    span.textContent = 'No person found.';
    portraits.appendChild(span);
  } else {
    filteredList.forEach((item) => {
      const outerDiv = document.createElement('div');
      outerDiv.classList.add('portrait');
      outerDiv.dataset.id = item.name;

      const portrait = document.createElement('img');
      portrait.classList.add('portrait__image');
      portrait.src = item.portrait;

      const name = document.createElement('span');
      name.classList.add('portrait__name');
      name.textContent = item.name;

      outerDiv.appendChild(portrait);
      outerDiv.appendChild(name);

      outerDiv.addEventListener('click', (e) => { portraitClick(e); });
      portraits.appendChild(outerDiv);
    });
  }
};

// eslint-disable-next-line no-unused-vars
const search = (e) => {
  e.preventDefault();

  filterList();
  refreshList();
};

// page.load

getList('./json/got.json')
  .then(() => {
    filterList();
    refreshList();
  });
