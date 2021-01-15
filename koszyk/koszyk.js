import products from './products.js';

const shoppingList = document.querySelector('.shop-items__list');

products.forEach(({photoUrl, description}) => shoppingList.appendChild(createProductItem(photoUrl, description)));

function createProductItem(productPhotol, productDescription) {
    const productWrapper = document.createElement('li');
    const photo = createProductPhoto(productPhotol);
    const description = createProductDescription(productDescription);
    const button = createProductButton();
    productWrapper.appendChild(photo);
    productWrapper.appendChild(description);
    productWrapper.appendChild(button);
    productWrapper.className = 'list__item'
    return productWrapper;

}

function createProductButton() {
    const button = document.createElement('button');
    button.textContent = 'Add';
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
    source.className = 'item__photo-source';
    fallback.className = 'item__photo-img';
    source.srcset = url;
    fallback.src = url;
    fallback.alt = 'Product photo';
    photoWrapper.appendChild(source);
    photoWrapper.appendChild(fallback);
    photoWrapper.className = 'item__photo'
    return photoWrapper;
}