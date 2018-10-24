'use strict';
//飲んだ本数を数える
function CountTheNumberOfDrinks (buyDrinks) {
  var emptyBottles = 0;
  var drinks = buyDrinks;

  emptyBottles = drinks;
  //空き瓶が2本以下になり交換できなくなったら、ループを終了する。
  do {
    var addDrinks = 0;
    addDrinks = Math.floor (emptyBottles / 3);
    drinks += addDrinks;
    emptyBottles = emptyBottles % 3 + addDrinks;
  } while (emptyBottles > 2);
  return drinks;
}

var needDrinks = window.prompt ('必要な本数を入力してください');
var drinks = Number (needDrinks);
var tempDrinks = 0;
var buyDrinks = Number (needDrinks);
//必要な本数から１づつ減らし、最小の買う本数を求める
while (true) {
  tempDrinks = CountTheNumberOfDrinks (Number (buyDrinks));
  if (tempDrinks >= needDrinks && needDrinks > 2) {
    drinks = tempDrinks;
    buyDrinks--;
  } else {
    //減らした本数を戻す
    buyDrinks++;
    break;
  }
}
console.log ('必要本数:' + String (needDrinks) + '本');
console.log ('購入した本数:' + String (buyDrinks) + '本');
console.log ('金額合計:' + String (buyDrinks * 100) + '円');
console.log ('飲める本数:' + String (drinks) + '本');
