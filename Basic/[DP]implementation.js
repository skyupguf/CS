//  divide & conquer code
const getFiboNum = (n) => {
    if (n <= 1) return n;
    return getFiboNum(n-1) + getFiboNum(n-2);
}

//  memoization code
const getFiboNum = (n, m = []) => {
    return n <= 1 ? n : m[n] ? m[n]
    : m[n] = getFiboNum(n-1, m) + getFiboNum(n-2, m);
}

//  memoization sliding window code
const calFibo = (n, m) => {
    const sum = m[0] + m[1];
    return n === 2 ? sum : calFibo(n-1, [m[1], sum]);
}    
const getFiboNum = (n) => n <= 1 ? n : calFibo(n, [0, 1]);

// tabulation code
const getFiboToTab = (n) => {
    const fibo = [0, 1, 1];

    for (let i=fibo.length; i<=n; i++) {
        fibo[i] = fibo[i-1] + fibo[i-2];
    }
    return fibo[n];
}

//  tabulation closer code
