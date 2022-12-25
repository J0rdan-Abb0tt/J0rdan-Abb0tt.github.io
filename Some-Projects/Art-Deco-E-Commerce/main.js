let counter = document.querySelector('.counter');
let counterNumber = 0;

counterNumber = JSON.parse(localStorage.getItem('basket')).length;
counter.textContent = counterNumber;