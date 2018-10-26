'use strict';
//お店の情報
//在庫管理なので、意味合い的に考えて
//空き瓶の変数は敢えてStoreの方で含んでいません。
class Store {
  constructor (shopName, stockDrink, serviceConditionNumber, price) {
    this.stockDrink = stockDrink;
    this.serviceConditionNumber = serviceConditionNumber;
    this.price = price;
    this.shopName = shopName;
  }

  //幾つジュースを買うかを求める。この際に在庫を減らす。
  //また、在庫によっては空瓶(＝買えた数)が足りない時がある。
  EmptyBottlesByBuyDrinks (wantBuyDrinks, emptyBottles) {
    var buyDrinks = wantBuyDrinks;
    if (this.stockDrink < wantBuyDrinks) {
      buyDrinks = this.stockDrink;
      this.stockDrink = 0;
    } else {
      this.stockDrink -= buyDrinks;
    }
    console.log (this.shopName);
    console.log ('購入希望本数：' + String (wantBuyDrinks) + '本');
    console.log ('買えた本数：' + String (buyDrinks) + '本');
    console.log ('金額：' + String (buyDrinks * this.price) + '円');
    emptyBottles += buyDrinks;
    return emptyBottles;
  }

  //サービスによる空瓶の数を求める。この際に在庫を減らす。
  //また、在庫によってはサービスできない場合もある
  EmptyBottlesByServiceDrinks (emptyBottles) {
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
    return emptyBottles;
  }

  //空き瓶によるジュースをもらえるサービスが出来るかどうかの判定
  //サービスによって手に入った空き瓶(ジュース)を使って
  //更に空き瓶(ジュース)を手に入れる事を判定するために用意した関数
  CanWeService (emptyBottles) {
    if (emptyBottles < this.serviceConditionNumber) {
      return false;
    }
    return true;
  }
  //現在の在庫
  CurrentInventory () {
    console.log ('現在の在庫：' + String (this.stockDrink) + '本');
  }
}

let wantBuyDrinks = [1, 3, 20, 2, 60, 100];

//店舗ごとのお店の情報を設定する
let Stores = [new Store ('A店', 100, 3, 200), new Store ('B店', 200, 4, 100)];
var storeEmptyBottles = [0, 0];
for (let number of wantBuyDrinks) {
  for (let i of [0, 1]) {
    //買ってから、サービスする本数を決めるので
    //3本で1本を交換だから購入希望は4本だけど
    //3本買った方がお得だから、3本しか買わないという事はしない。
    storeEmptyBottles[i] = Stores[i].EmptyBottlesByBuyDrinks (
      number,
      storeEmptyBottles[i]
    );
    //サービスによって手に入った空き瓶(ジュース)を使って
    //更に空き瓶(ジュース)を手に入れる事を想定しています。
    while (true) {
      storeEmptyBottles[i] = Stores[i].EmptyBottlesByServiceDrinks (
        storeEmptyBottles[i]
      );
      if (!Stores[i].CanWeService (storeEmptyBottles[i])) {
        break;
      }
    }
    Stores[i].CurrentInventory ();
  }
}
