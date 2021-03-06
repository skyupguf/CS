//  문제요약
//  1. 8000000000이하의 양의 정수 n의 각 자리 수를 내림차순으로 재배치

//  코드
const descendingDigits = (n) => {
    return Number(`${n}`.split('').sort((a, b) => b - a).join(''));
}
/*
    풀이
    1. 수를 문자열로 변환하고 sort메소드를 활용하기 위해 split으로 배열화 한다.
    2. 내림차순 정렬 이후 다시 문자열과 숫자화 하여 리턴한다.

    시간복잡도
    문자열이 된 n만큼을 정렬 O(NlogN)
*/
