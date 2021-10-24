//  문제요약
//  1. price는 1 ≤ price ≤ 2,500 사이의 자연수이다.
//  2. 처음 가지고 있던 금액 money : 1 ≤ money ≤ 1,000,000,000 사이의 자연수이다.
//  3. 이용 횟수 count : 1 ≤ count ≤ 2,500 사이의 자연수이다.
//  4. N번 째 이용시 이용료의 N배가 될 때 count번이 될 때 가진 금액에서 얼마나 부족한지 리턴하는 함수를 작성하라.
//  5. price = 3, money = 20, count = 4, return 10

//  코드
const calLackOfMoney = (price, money, count) => {
    let total = 0;
    for(let i=1; i<=count; i++) total += (price*i);
    return total < money ? 0 : total - money;
}
/*
풀이
1. 한번 루프가 될 때 price만큼 증가하고 count만 큼 루프가 된후 money - 지불비용 을 리턴하면 된다.
2. 구구단과 같은 문제인데 루프 
*/