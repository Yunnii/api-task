Исходный кусок кода https://gist.github.com/verkholantsev/4d14ce053b009dac1225

 * Использование глобальных переменных,
 * используются одни и теже переменные i, которая изменяется внутри коллбека и снаружи
  в конце callback -   i=2;j=2
 * не человекочитаемые + не значимые названия переменных
 * for in - может захватить свойства из прототипа (getOwnProperty)
 * в момент вызова коллбека - request = requests[3]  для всех вызовов - нужно обернуть
   в самовызывающуюся функцию

 ``
    for (var i = 0; i < 3; i++) {
      var request = requests[i];

      var callback = function (error, result) {
         responses[request] =
 ``
