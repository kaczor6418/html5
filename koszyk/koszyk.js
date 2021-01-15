import products from './products.js';

const shoppingList = document.querySelector('.shop-items__list');

products.forEach(({photoUrl, description}) => shoppingList.appendChild(createProductItem(photoUrl, description)));

function createProductItem(productPhotol, productDescription) {
    const productWrapper = document.createElement('li');
    const photo = createProductPhoto(productPhotol);
    const description = createProductDescription(productDescription);
    const button = createProductButton();
    productWrapper.appendChild(button);
    productWrapper.appendChild(description);
    productWrapper.appendChild(photo);
    return productWrapper;

}

function createProductButton() {
    const button = document.createElement('butotn');
    button.textContent = 'Add product';
    button.addEventListener('click', () => (console.log('Run add animation')));
    return button;
}

function createProductDescription(text) {
    const description = document.createElement('p');
    description.textContent = text;
    return description;
}

function createProductPhoto(url) {
    const photoWrapper = document.createElement('picture');
    const source = document.createElement('source');
    const fallback = document.createElement('img');
    source.srcset = url;
    fallback.src = url;
    fallback.alt = 'Product photo';
    photoWrapper.appendChild(fallback);
    photoWrapper.appendChild(source);
    return photoWrapper;
}