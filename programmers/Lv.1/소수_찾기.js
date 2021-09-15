// 풀이#1
const isPrime = (num) => {
    for(let i=3; i<=Math.sqrt(num); i+=2) {
        if(num % i === 0) return false;
    }
    return true;
}

const countPrimeNum = (n) => {
    let count = 0;
    for(let i=3; i<=n; i+=2) {
        if(isPrime(i)) count++
    }
    return count;
}
// 풀이#2

/*
문제요약
1. 1부터 입력받은 숫자 n까지의 소수의 개수 찾기

풀이#1
1. 1부터 n까지 각각 소수인지 판별하기 위해 완전탐색, 소수는 2를 제외한 홀수이기 때문에 연산을 절반으로 줄일 수 있다.
2. 소수를 판별하는 함수도 마찬가지로 홀수로만 나눠지는 수를 판별하면 되므로 3부터 2씩 누적하여 이중반복도 절반으로 줄인다.
3. 제외한 소수 2를 추가해서 리턴한다.

시간복잡도#1
n과 n의 이중반복을 절반씩만 순회해 연산의 절반이 줄지만 시간 복잡도가 O(n^2)으로 증가하는건 바뀌지 않는다.
*/