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