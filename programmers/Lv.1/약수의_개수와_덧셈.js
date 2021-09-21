// 문제요약
// 1. 1 ≤ left ≤ right ≤ 1,000, left부터 right까지 약수개수가 짝수면 덧셈누적, 홀수면 뺄셈누적 한다.

//  코드
const accumulateInputNum = (left, right) => {
    let sum = 0;
    for(let i=left; i<=right; i++) {
        i % Math.sqrt(i) === 0 ? sum -= i : sum += i
    }
    return sum;
}
/*
    풀이
    1. 약수의 개수가 홀수일 경우, 중복 약수가 존재한다 ex) 2*2 = 4, 3*3 = 9
    2. 중복약수가 존재한다는 것은 제곱근이 정수인 경우이다.
    3. 특정 수 나머지 나누기 특정수 제곱근이 나누어 떨어지면 약수의 개수는 홀수다.

    시간복잡도
    O(N)
*/