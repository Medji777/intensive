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
                showConfirm();
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

                calcTotal();
                removeItems(removeBtn);
            }
        );
    });

    function sliceTitle() {
        [].forEach.call(titles,function(item){
            if (item.textContent.length > 49) {
                const str = `${item.textContent.slice(0, 50)}...`;
                item.textContent = str;
            }
        });
    }
    sliceTitle();

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);
        function frame() {
            if (counter === 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            }
            else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            }

        }
    }

    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        [].forEach.call(prices,function(item) {
            total += +item.textContent;
        });
        totalCost.textContent = total;
    }

    function removeItems(removeBtn) {
        if(cartWrapper.querySelector('.goods__item')){
            removeBtn.addEventListener('click', () => {
                badge.innerHTML = --countItems;

                cartWrapper.querySelector('.goods__item').remove();
                calcTotal();
                if (countItems === 0) {
                    cartWrapper.innerHTML = `<div class="empty">Ваша корзина пока пуста</div>`;
                }
            });
        }
    }

});