let addBasketButtons = document.getElementsByClassName('add-to-basket');
let counter = document.querySelector('.counter');
let counterNumber = 0;
let basketArray = [];

// if basket doesn't exist, create basket
if (localStorage.getItem('basket') == null) {
    localStorage.setItem('basket', JSON.stringify(basketArray));
}

// basket counter
counterNumber = JSON.parse(localStorage.getItem('basket')).length;
counter.textContent = counterNumber;

// buttons
for (let i = 0; i < addBasketButtons.length; i++) {
    // find current button iteration clicked from loop array
    let currentButton = addBasketButtons[i];
    currentButton.addEventListener('click', buttonClicked);
}

function buttonClicked(event) {

    // find grandparent (div) of button clicked and gather info
    let button = event.target.parentElement.parentElement;

    let name = button.getElementsByClassName('card-title')[0].innerText;
    let image = button.getElementsByClassName('product-image')[0].src;
    let price = button.getElementsByClassName('card-price')[0].innerText;

    // set the items you'll append into 1 variable
    let newProduct = {image, name, price};

    // assign current basket array
    let oldProduct = JSON.parse(localStorage.getItem("basket"));
    // check if the array already includes the cliked item or not
    if (! oldProduct.some(product => product.name == newProduct.name)) {
        // if not, then add otherwise alert already there
        oldProduct.push(newProduct);
    } else {
        alert('This item is already in your basket!');
    }

    // set the item back into the local storage basket array
    localStorage.setItem("basket", JSON.stringify(oldProduct));

    // update basket counter based on length of basket array in storage
    counterNumber = JSON.parse(localStorage.getItem('basket')).length;
    counter.textContent = counterNumber;
}