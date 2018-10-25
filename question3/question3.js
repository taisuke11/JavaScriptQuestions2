'use strict';
console.log ('questison3');
//お店の情報
class Store {
  constructor (stockDrink, serviceConditionNumber, price) {
    this.stockDrink = stockDrink;
    this.serviceConditionNumber = serviceConditionNumber;
    this.price = price;
  }
  //売った本数(在庫切れの可能性がある為)と合計金額(この際に在庫を減らし、買えた本数を返す。金額は表示だけ)
  SelledDrinks (wantBuyDrinks) {
    var buyDrinks = wantBuyDrinks;
    if (this.stockDrink < wantBuyDrinks) {
      buyDrinks = this.stockDrink;
      this.stockDrink = 0;
    } else {
      this.stockDrink -= buyDrinks;
    }
    console.log ('購入希望本数：' + String (wantBuyDrinks) + '本');
    console.log ('買えた本数：' + String (buyDrinks) + '本');
    console.log ('金額：' + String (buyDrinks * this.price) + '円');
    return buyDrinks;
  }
  //サービスドリンクによる空瓶の数を求める(この際に在庫を減らし、空瓶の数を返す)
  NumberOfEmptyBottlesByServiceDrink (emptyBottles) {
    var serviceDrinks = 0;
    if (emptyBottles >= this.serviceConditionNumber) {
      serviceDrinks = Math.floor (emptyBottles / this.serviceConditionNumber);
      if (serviceDrinks > this.stockDrink) {
        serviceDrinks = this.stockDrink;
        this.stockDrink = 0;
      } else {
        this.stockDrink -= serviceDrinks;
      }
      emptyBottles = emptyBottles % this.serviceConditionNumber + serviceDrinks;
    }
    console.log ('サービス本数：' + String (serviceDrinks) + '本');
    console.log ('現在の在庫：' + String (this.stockDrink) + '本');
    return emptyBottles;
  }
}
//買った本数の配列が必要
let wantBuyDrinks = [1, 3, 20, 2, 60, 100];

//空瓶の本数
var AStoreEmptyBottles = 0;
var BStoreEmptyBottles = 0;

//店舗ごとのお店の情報を設定する
let AStore = new Store (100, 3, 200);
let BStore = new Store (200, 4, 100);
for (let number of wantBuyDrinks) {
  //処理として纏める
  console.log ('A店');
  AStoreEmptyBottles += AStore.SelledDrinks (number);
  AStoreEmptyBottles = AStore.NumberOfEmptyBottlesByServiceDrink (
    AStoreEmptyBottles
  );
  console.log ('B店');
  BStoreEmptyBottles += BStore.SelledDrinks (number);
  BStoreEmptyBottles = BStore.NumberOfEmptyBottlesByServiceDrink (
    BStoreEmptyBottles
  );
}
