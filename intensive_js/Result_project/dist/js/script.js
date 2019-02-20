window.addEventListener('DOMContentLoaded', () => {

const loadContent = async (url,callback) => {
     await fetch(url)
        .then(data=>data.json())
        .then(data=>createElement(data.goods))
        .catch(error=>error);

    callback();
};
loadContent('../js/db.json',()=>{
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
            if (item.textContent.length > 70) {
                const str = `${item.textContent.slice(0, 71)}...`;
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

function createElement(data){
    const goodsWrapper = document.querySelector('.goods__wrapper');
    [].forEach.call(data,(n)=>{
        let card = document.createElement('div');
        card.classList.add('goods__item');
        let str = '';
         str += `
            <img class="goods__img" src="${n.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                       ${n.title}
                </div>
                <div class="goods__price">
                    <span>${n.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
        `;
        card.innerHTML = str;
        goodsWrapper.appendChild(card);
    })
}

});