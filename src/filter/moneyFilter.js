//可以给个默认值0
export function toMoney(money = 0){
    // let newMoney = money;
    // if(newMoney){
    //     newMoney = newMoney.toFixed(2)
    // }else{
    //     newMoney = 0;
    //     newMoney = newMoney.toFixed(2);
    // }
    // return newMoney;

    //简洁写法
    return money.toFixed(2)
}