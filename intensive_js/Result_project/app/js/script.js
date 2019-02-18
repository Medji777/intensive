window.addEventListener('DOMContentLoaded', () => {

    const   cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');
    let countItems = cartWrapper.querySelectorAll('.goods__item').length;

    const openCart = () => {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    };

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    [].forEach.call(goodsBtn, (btn, i) => {
        btn.addEventListener('click', () => {
                let item = products[i].cloneNode(true),
                    trigger = item.querySelector('button'),
                    removeBtn = document.createElement('div'),
                    empty = cartWrapper.querySelector('.empty');

                trigger.remove();
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times';
                cartWrapper.appendChild(item);
                item.appendChild(removeBtn);

                if (empty) {
                    empty.remove();
                }

                if (item) {
                    badge.innerHTML = ++countItems;
                }

                removeBtn.addEventListener('click', () => {
                    badge.innerHTML = --countItems;

                    item.remove();
                    if (countItems === 0) {
                        cartWrapper.innerHTML = `<div class="empty">Ваша корзина пока пуста</div>`;
                    }
                });

            }
        );
    });
});