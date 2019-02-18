"use strict";

window.addEventListener('DOMContentLoaded', function () {
  var cartWrapper = document.querySelector('.cart__wrapper'),
      cart = document.querySelector('.cart'),
      close = document.querySelector('.cart__close'),
      open = document.querySelector('#cart'),
      goodsBtn = document.querySelectorAll('.goods__btn'),
      products = document.querySelectorAll('.goods__item'),
      confirm = document.querySelector('.confirm'),
      badge = document.querySelector('.nav__badge'),
      totalCost = document.querySelector('.cart__total > span'),
      titles = document.querySelectorAll('.goods__title');
  var countItems = cartWrapper.querySelectorAll('.goods__item').length;

  var openCart = function openCart() {
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  var closeCart = function closeCart() {
    cart.style.display = 'none';
    document.body.style.overflow = '';
  };

  open.addEventListener('click', openCart);
  close.addEventListener('click', closeCart);
  [].forEach.call(goodsBtn, function (btn, i) {
    btn.addEventListener('click', function () {
      var item = products[i].cloneNode(true),
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

      removeBtn.addEventListener('click', function () {
        badge.innerHTML = --countItems;
        item.remove();

        if (countItems === 0) {
          cartWrapper.innerHTML = "<div class=\"empty\">\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u0430</div>";
        }
      });
    });
  });
});