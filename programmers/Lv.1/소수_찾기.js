//  문제요약
//  1. 1부터 입력받은 숫자 n까지의 소수의 개수 찾기

//  코드#1
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
    return count+1;
}
/*
    풀이#1
    1. 1부터 n까지 각각 소수인지 판별하기 위해 완전탐색, 소수는 2를 제외한 홀수이기 때문에 연산을 절반으로 줄일 수 있다.
    2. 소수를 판별하는 함수도 마찬가지로 홀수로만 나눠지는 수를 판별하면 되므로 3부터 2씩 누적하여 이중반복도 절반으로 줄인다.
    3. 제외한 소수 2를 추가해서 리턴한다.

    시간복잡도#1
    n은 수의 절반인 n/2만 순회, 이중루프는 sqrt(n)/2, 따라서 (n/2) * (sqrt(n)/2)
    시간복잡도로 표현하면 O(n * sqrt(n))
*/

//  코드#2
const countPrimeNum = (n) => {
    const primeArr = Array(n+1).fill(1).fill(0, 0, 2);
    for(let i=2; i<=n; i++) {
        if(primeArr[i]) {
            for(let j=i*i; j<=n; j+=i) primeArr[j] = 0;
        }
    }
    return primeArr.filter(e => e === 1).length;
}
/*
    풀이#2
    1. 소수의 배수는 전부 약수가 존재하므로 소수가 아닌 원리를 활용한다.
    2. 방문처리를 위해 n의 수 까지 배열을 만들고 0~2를 제외 모든 요소를 1로 만든다.
    3. 방문처리를 위해 홀수만 체크할 수 없으니 2부터 n까지 전부 순회한다.
    4. 소수체크를 위한 이중루프는 배열에서 소수의 배수가 아닌 1인 경우만 들어가도록 조건을 만든다.
    5. 이중루프의 인덱스는 해당 소수의 배수로 증가하도록 하고 배수에 해당하는 배열을 0으로 치환한다.
    6. 배열에서 1의 개수만 세고 리턴한다.

    시간복잡도#2
    n까지 순회하면서 i의 배수인 경우만 이중루프를 순회 O(n*logn)
    2의 배수며 3의 배수인 경우 2의 배수에서 이미 방문처리 되어 제외하고 순회 O(nlog(logn))
*/
