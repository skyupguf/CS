// 문제요약
// 1. 정수가 담긴 배열 arr과 정수 divisor를 입려받는다.
// 2. divisor로 나누어 떨어지는 요소만 배열에 담아 오름차순으로 리턴하고 없을 경우 [-1]을 리턴한다.

//  코드
const makeMultipleOfDivisor = (arr, divisor) => {
    const result = arr.filter(e => e % divisor === 0);
    return result.length !== 0 ? result.sort((a, b) => a - b) : [-1];
}
/*
    풀이
    1. divisor로 모든 요소와 연산해야 하므로 루프를 사용해야 한다.
    2. filter 메소드로 divisor로 나눠지는 요소만 배열에 담고 길이가 0일 경우 -1을 담아 리턴
    3. 0이 아닐 경우 오름차순 정렬을 하고 리턴한다.

    시간복잡도
    sort 메소드와 filter가 사용되었고 최대인 filter의 O(n)의 시간복잡도를 따른다.
*/
