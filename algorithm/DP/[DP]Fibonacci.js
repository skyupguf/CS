//  문제요약
//  1. 입력 n의 항에 존재하는 피보나치 수를 리턴하도록 함수를 다음 조건으로 작성하라.
//  2. 일반 분할정복을 이용한 재귀함수로 구현
//  3. Dynamic Programmig의 Memoization을 이용하여 구현
//  4. Dynamic Programmig의 Tabulation을 이용하여 구현

//  1. divide & conquer code
const getFiboNum = (n) => {
    if (n <= 1) return n;
    return getFiboNum(n-1) + getFiboNum(n-2);
}

//  2. memoization code
const getFiboNum = (n, m = []) => {
    return n <= 1 ? n : m[n] ? m[n]
    : m[n] = getFiboNum(n-1, m) + getFiboNum(n-2, m);
}

//  2-2. memoization sliding window code
const calFibo = (n, m) => {
    const sum = m[0] + m[1];
    return n === 2 ? sum : calFibo(n-1, [m[1], sum]);
}    
const getFiboNum = (n) => n <= 1 ? n : calFibo(n, [0, 1]);


// 3. tabulation code
const getFiboToTab = (n) => {
    if (n <= 1) return n;

    let fibo1 = 0, fibo2 = 1, sum;
    for (let i=2; i<=n; i++) {
        sum = fibo1 + fibo2;
        [ fibo1, fibo2 ] = [ fibo2, sum ];
    }
    return sum;
}

//  3-2. tabulation closer code
const getFiboTab = (n) => {
    const fibo = [0, 1, 1];

    return function (n) {
        for (let i=fibo.length; i<=n; i++) {
            fibo[i] = fibo[i-1] + fibo[i-2];
        }
        return fibo[n];
    }
}
