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
    });
  });

  function sliceTitle() {
    [].forEach.call(titles, function (item) {
      if (item.textContent.length > 49) {
        var str = "".concat(item.textContent.slice(0, 50), "...");
        item.textContent = str;
      }
    });
  }

  sliceTitle();

  function showConfirm() {
    confirm.style.display = 'block';
    var counter = 100;
    var id = setInterval(frame, 10);

    function frame() {
      if (counter === 10) {
        clearInterval(id);
        confirm.style.display = 'none';
      } else {
        counter--;
        confirm.style.transform = "translateY(-".concat(counter, "px)");
        confirm.style.opacity = '.' + counter;
      }
    }
  }

  function calcTotal() {
    var prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
    var total = 0;
    [].forEach.call(prices, function (item) {
      total += +item.textContent;
    });
    totalCost.textContent = total;
  }

  function removeItems(removeBtn) {
    if (cartWrapper.querySelector('.goods__item')) {
      removeBtn.addEventListener('click', function () {
        badge.innerHTML = --countItems;
        cartWrapper.querySelector('.goods__item').remove();
        calcTotal();

        if (countItems === 0) {
          cartWrapper.innerHTML = "<div class=\"empty\">\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u0430</div>";
        }
      });
    }
  }
});