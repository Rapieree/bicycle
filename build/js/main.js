'use strict';

var mainFunc = function () {
  // Меню
  var menuButton = document.querySelector('.site-nav__button');
  var menu = document.querySelector('.site-nav');
  var menuNavLinks = menu.querySelectorAll('.site-nav__list a');
  var menuButtonCloseClass = 'site-nav__button--close';
  var menuButtonOpenClass = 'site-nav__button--open';
  var menuButtonNojsClass = 'site-nav__button--nojs';
  var menuCloseClass = 'site-nav--close';
  var menuOpenClass = 'site-nav--open';
  var menuNojsClass = 'site-nav--nojs';

  var bodyScrollHiddenClass = 'page__body--scroll-hidden';
  var bodyVisibilityHiddenClass = 'page__body--visibility-hidden';

  // Заблокировать скролл страницы
  function bodyScrollHidden(flag) {
    if (flag) {
      document.body.classList.add(bodyScrollHiddenClass);
    } else {
      document.body.classList.remove(bodyScrollHiddenClass);
    }
  }

  // скрыть/показать элементы кроме элементов с явно установленным свойством видимости
  // чтобы скрыть/показать доступность и фокус
  function hiddenAllExpectVisible(flag) {
    if (flag) {
      document.body.classList.add(bodyVisibilityHiddenClass);
    } else {
      document.body.classList.remove(bodyVisibilityHiddenClass);
    }
  }

  // Открыть / закрыть меню
  function setMenuOpening(flag) {
    if (menuButton.classList.contains(menuButtonNojsClass) && menu.classList.contains(menuNojsClass)) {
      menuButton.classList.remove(menuButtonNojsClass);
      menu.classList.remove(menuNojsClass);
      menuButton.classList.add(menuButtonCloseClass);
      menu.classList.add(menuCloseClass);
    } else if (flag) {
      menuButton.classList.remove(menuButtonCloseClass);
      menu.classList.remove(menuCloseClass);
      menuButton.classList.add(menuButtonOpenClass);
      menu.classList.add(menuOpenClass);
      hiddenAllExpectVisible(true);
      bodyScrollHidden(true);
    } else {
      menuButton.classList.remove(menuButtonOpenClass);
      menu.classList.remove(menuOpenClass);
      menuButton.classList.add(menuButtonCloseClass);
      menu.classList.add(menuCloseClass);
      hiddenAllExpectVisible(false);
      bodyScrollHidden(false);
    }
  }

  // При нажатии ссылки закрыть меню и перейти по якорю
  function onMenuNavLinkClick(evt) {
    setMenuOpening(false);
    evt.removeEventListener(onMenuNavLinkClick);
  }

  // Кнопка открытия/закрытия меню
  function onMenuButtonClick() {
    if (menuButton.classList.contains(menuButtonCloseClass) && menu.classList.contains(menuCloseClass)) {
      setMenuOpening(true);
    } else if (menuButton.classList.contains(menuButtonOpenClass) && menu.classList.contains(menuOpenClass)) {
      setMenuOpening(false);
    }
  }

  // При нажатии Escape закрыть меню, снять прослушивание с ссылок
  function onMenuEscapeKeyDown(evt) {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      setMenuOpening(false);
      menuNavLinks.forEach(function (link) {
        link.removeEventListener(onMenuNavLinkClick);
      });
      document.removeEventListener('keydown', onMenuEscapeKeyDown);
    }
  }

  function menuInitialization() {
    if (menuButton && menu !== null) {
      setMenuOpening(false);
      menuButton.addEventListener('click', onMenuButtonClick);

      document.addEventListener('keydown', onMenuEscapeKeyDown);

      if (menuNavLinks !== null) {
        menuNavLinks.forEach(function (link) {
          link.addEventListener('click', onMenuNavLinkClick);
        });
      }
    }
  }

  menuInitialization();

  // Карта

  var mapTemplate = document.querySelector('#map-frame-template').content;
  var mapFrameField = document.querySelector('.map__frame');

  function mapInitialization() {
    if (mapTemplate && mapFrameField !== null) {
      mapFrameField.textContent = '';
      mapFrameField.appendChild(mapTemplate);
    }
  }

  mapInitialization();

  // Валидация номера телефона

  var feedbackPhone = document.querySelector('#feedback-phone');
  var maskValue = '+{7} (000) 000-00-00';

  var feedbackMaskOptions = {
    mask: maskValue,
  };

  /* global IMask*/
  // eslint-disable-next-line new-cap
  var feedbackPhoneMask = IMask(feedbackPhone, feedbackMaskOptions);

  feedbackPhoneMask();
};


mainFunc();
