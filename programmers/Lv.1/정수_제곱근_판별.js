const findPositiveSqrt = (n) => {
    const sqrt = Math.sqrt(n);
    return sqrt - Math.floor(sqrt) === 0 ? (sqrt+1)**2 : -1;
}

/*
문제요약
1. n의 제곱근이 양의 정수인지 판단한다.
2. 양의 정수면 (제곱근+1)의 제곱을 리턴하고 아닐 경우 -1을 리턴한다.

풀이
1. n을 sqrt로 구한 제곱근x와 floor로 x의 제곱근을 제거한 수로 차감하여 0일 경우 양의 정수가 된다.
2. 분기로 각각 -1과 (x+1)^2를 리턴한다.
*/