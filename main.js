// Код букмарклета: (да, оно требует jquery, да, мы настолько обленились :D)
// javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://code.jquery.com/jquery-1.10.1.min.js';document.body.appendChild(document.createElement('script')).src='https://gist.github.com/vladkorotnev/6460898/raw';})();

var iteration = 0;  // ограничение на количество фото
var limitation= 0; // итерация текущая
var fb = undefined; // тут будет фастбокс

// фн САС -- основная функция обработки фотогратативов, с нее все и началось
var sas = function() {
  if(window.location.href != $('#myprofile')[0].href) { // если мы не на своем профиле
   fb.hide(); // прячем фастбокс
    showFastBox('Error','Перейдите на свою страницу профиля и попробуйте снова'); // ошибку пишем
    return; // и убиваемсо ап стену
  }
  if(iteration == limitation) { // все фотки уже проделали
    fb.hide(); // прячем фастбокс
    showFastBox('vkDephotify', 'Фотографии скрыты успешно'); // пишем уведомление
    return; // убиваемсо
  }
  try { // попытка -- не пытка
    $('.profile_photo_hide')[0].click(); // кликаем на крестик у первой фотки
  } catch(e) {
    console.log('DEPH ERROR '+e); // ну ошибка, ну в логи ее
    fb.hide(); // прячем фастбокс
    showFastBox('vkDephotify Error','Ошибка произошла на фотографии '+iteration.toString()+'<br>'+e.toString()); // ошибку пишем
    return; // убиваемсо
  } //try
  iteration = iteration + 1; // следующая итерация цикла
  setTimeout(sas, 500); // через 500 миллисекунд (может можно и меньше, не пробовал)
}//сас

// фн dephotify -- получает параметр и передает управление САСу
var dephotify = function() {
  var input = $('#depho_amt').val(); // получить значение поля с ID=depho_amt
    firstBox.hide(); // ТОЛЬКО ПОТОМ спрятать фастбокс с полем, иначе будет эпик фейл
  if(isNaN(parseInt(input))) {  // если не цифра, то и ну его нафик
   showFastBox('Неверный ввод', 'Надо ввести число!');
   return;
  }
  limitation = parseInt(input); // парсим цифру в переменную ограничения
  sas(); // запускаем сас
  fb = showFastBox('vkDephotify by vladkorotnev, 2013','Идет скрытие фотографий, подождите...'); // делаем фастбокс
  fb.removeButtons(); // отбираем у него кнопки
  fb.showProgress(); // показываем пиликалку прогресса
  $('.box_x_button')[0].style.display="none"; // выпиливаем крестик закрытия
}//dephotify

var firstBox = undefined; // тут будет первый фастбокс для ввода

//фн main -- точка входа, где юзер введет данные
var main = function() {
  // создаем первый фастбокс с заголовком dephotify, текстом, кнопкой скрыть на окей и ее функцией, кнопкой отменить
  firstBox = showFastBox('vkDephotify','Сколько фотографий убрать из панельки?','Скрыть', function() { dephotify(); }, 'Отменить');
  // прифигачиваем к тексту фастбокса поле для ввода
  firstBox.bodyNode.innerHTML =  firstBox.bodyNode.innerHTML + "<br><input type=\"text\" id=\"depho_amt\" placeholder=\"Количество, например 10\" value=\"10\">";
}//main

// после всего этого, то есть как скрипт загрузится, запускаем точку входа!
main();


// by Akasaka, 2013
// Да-да, прямо таки мастер реверсинга ВК, столько всего написал :D
