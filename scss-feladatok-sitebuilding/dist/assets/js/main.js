const menuButton = document.querySelector('.nav__toggler');
const menuItems = document.querySelector('.nav__items');

menuButton.addEventListener('click', (e) => {
  e.stopPropagation();

  menuItems.classList.toggle('visible');
});
