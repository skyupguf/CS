//  문제요약
//  1. price는 1 ≤ price ≤ 2,500 사이의 자연수이다.
//  2. 처음 가지고 있던 금액 money : 1 ≤ money ≤ 1,000,000,000 사이의 자연수이다.
//  3. 이용 횟수 count : 1 ≤ count ≤ 2,500 사이의 자연수이다.
//  4. N번 째 이용시 이용료의 N배가 될 때 count번이 될 때 가진 금액에서 얼마나 부족한지 리턴하는 함수를 작성하라.
//  5. price = 3, money = 20, count = 4, return 10

//  코드#1
const calLackOfMoney = (price, money, count) => {
    let total = 0;
    for(let i=1; i<=count; i++) total += (price*i);
    return total < money ? 0 : total - money;
}
/*
    풀이#1
    1. 한번 루프가 될 때 price가 배로 증가해 누적되어야 한다. count만 큼 루프가 된후 money - 지불비용 을 리턴하면 된다.
    2. price가 한바퀴 돌 때 마다 배가 되어야 하므로 i를 1로 설정하고 count까지 순회 시키면서 total에 price * i 를 누적한다.
    3. total 비용이 money를 넘어서면 total-money를 리턴하고 아니면 0을 리턴한다.
*/

//  코드#2
const calLackOfMoney = (price, money, count) => {
    const cost = price * count * (count+1) / 2 - money;
    return cost < 0 ? 0 : cost;
}
/*
    풀이#2
    1. 가우스 공식을 활용해 상수연산을 할 수 있다.
    2. price가 3이고 count가 4일 경우 의 배수이기 때문에 마지막 배수인 12를 제외하고 각항을 뒤집어서 더한다.
    3.     3, 6, 9, 12 이렇게 되면 12가 기존 카운터 보다 하나 더 추가되고 이 12를 모두 더한 수에 2를 나누면 배수의 총합이 된다.
       12, 9, 6, 3
    4. 총합을 2로 나누고 money를 차감할 때 cost가 양수면 cost를 아니면 0을 리턴한다.

    시간복잡도
    코드#1 의 경우 루프를 이용했기 때문에 O(N), 코드#2는 상수연산에서 종료되므로 O(1) 이 된다.
*/