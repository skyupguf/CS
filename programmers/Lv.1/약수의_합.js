//  문제요약
//  1. 정수 0~3000이하의 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수

//  코드
const sumOfdivisor = (n) => {
    let sum = 0;
    for(let i=1; i<=Math.sqrt(n); i++) {
        if(n % i === 0) i === n/i ? sum += i : sum += (i+n/i);
    }
    return sum;
}
/*
    풀이
    1. 모든 약수의 합을 구해야 하므로 정확한 수를 알아야 한다.
    2. 루프를 이용해 끝까지 순회하는게 가장 기본적
    3. 약수이기 때문에 제곱근 이하에서 나누어 떨어지는 수는 제곱근 이상에서 존재 sqrt로 연산을 적게 수행 시킨다.
    4. 낮은 수에서 약수를 찾고 해당 약수와의 곱으로 n이 만들어지는 짝을 찾아 sum에 누적한다.

    에러 핸들링
    1, 4, 9와 같이 약수 중 동일한 수가 나오는 경우 중복으로 누적되지 않도록 한다.

    시간 복잡도
    정확히 수의 제곱근 만큼 만 연산이 되므로 O(sqrt(n))
*/
