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
//整数かどうかを判別する
//負の整数については考慮しないものとする
function isIntNumber (value) {
  value = String (value);
  if (/^\d+$/.test (value)) return Number (value);
  return -1;
}

var drinks = 0;
while (true) {
  var needDrinks = window.prompt ('必要な本数を入力してください');
  drinks = isIntNumber (needDrinks);
  if (drinks < 0) {
    console.log ('正の整数を入力してください');
  } else {
    break;
  }
}
var tempDrinks = 0;
var buyDrinks = drinks;
//必要な本数から１づつ減らし、最小の買う本数を求める
while (true && needDrinks > 2) {
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
console.log ('本数:' + String (needDrinks) + '本');
console.log ('金額合計:' + String (buyDrinks * 100) + '円');
