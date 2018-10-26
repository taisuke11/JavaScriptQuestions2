'use strict';
var emptyBottles = 0;
var drinks = 100;
console.log ('購入した本数:' + String (drinks));
emptyBottles = drinks;
//空き瓶が2本以下になり交換できなくなったら、ループを終了する。
do {
  var addDrinks = 0;
  addDrinks = Math.floor (emptyBottles / 3);
  drinks += addDrinks;
  emptyBottles = emptyBottles % 3 + addDrinks;
} while (emptyBottles > 2);
console.log ('飲める本数:' + String (drinks));
