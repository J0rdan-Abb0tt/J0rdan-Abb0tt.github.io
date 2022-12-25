let counter = document.querySelector('.counter');
let counterNumber = 0;

counterNumber = JSON.parse(localStorage.getItem('basket')).length;
counter.textContent = counterNumber;

let basket = JSON.parse(localStorage.getItem('basket'));
let gridContainer = document.getElementsByClassName('basket-grid-container')[0];

for (let i = 0; i < basket.length; i++) {
    gridContainer.innerHTML += `
        <div class="item">
            <p>${basket[i].name}</p>
            <img src="${basket[i].image}" alt="">
            <p id="price">£${basket[i].price}</p>
            <input type="number" value="1" id="quantity">
            <i class="fa-regular fa-square-minus"></i>
        </div>
    `;

    updateBasketTotal();
}

let quantityInputs = document.querySelectorAll('#quantity');

for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];

    input.addEventListener('change', function quantityChange(event) {
        let currentInput = event.target;

        if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	    }

        updateBasketTotal();
    });
}

function updateBasketTotal() {
    let total = 0;
    let items = gridContainer.children;

    for (let i = 0; i < items.length; i++) {
        let itemList = items[i];

        let priceEl = itemList.querySelector('#price');
        let quantityEl = itemList.querySelector('#quantity');

        let price = parseFloat(priceEl.innerText.replace('£', ''));
        let quantity = parseInt(quantityEl.value);

        total += (price * quantity);
        total = Math.round(total * 100) / 100;
    }

    document.getElementsByClassName('basket-total')[0].innerHTML = '£' + total;
}

let remove = document.getElementsByClassName('fa-square-minus');

for (let i = 0; i < remove.length; i++) {
    let removeButton = remove[i];
    removeButton.addEventListener('click', removeFunction);
}

function removeFunction(event) {
    let currentRemoveButton = event.target;
    let currentItem = currentRemoveButton.parentElement;

    document.getElementsByClassName('basket-grid-container')[0].removeChild(currentItem);

    removeData();
    updateBasketTotal();
}

function removeData() {
    // parse local storage string to object array
    let data = JSON.parse(localStorage.getItem('basket'));
    
    // find the product you clicked remove on using its name
    let found = data.find(product => product.name);

    // find iteration of product
    let iteration = data.indexOf(found);
    
    // remove 1 of whatever iteration the product is in the array
    data.splice(iteration, 1);

    
    // re-set updated basket array as string
    localStorage.setItem('basket', JSON.stringify(data));

    counterNumber = JSON.parse(localStorage.getItem('basket')).length;
    counter.textContent = counterNumber;
}