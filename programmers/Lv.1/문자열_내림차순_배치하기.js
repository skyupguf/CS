//  문제요약
//  1. 알파벳 대소문자로 이루어진 길이 1이상의 문자열 s가 입력으로 주어진다.
//  2. s를 대문자가 소문자보다 작은 것으로 간주해서 내림차순으로 정렬하는 함수를 작성하라.

//  코드#1
const sortLorUAlpha = (s) => {
    return s.split('').sort().reverse().join('');
}
/*
    풀이#1
    1. 배열 정렬 메소드인 sort를 사용하기 위해 split으로 나눠서 오름차순 정렬을 한다.
    2. 유니코드에 맞춰 대문자 알파벳, 소문자 알파벳 순으로 정렬된다, 이를 reverse메소드로 뒤집고 join해서 리턴한다.
*/

//  코드#2
const sortLorUAlpha = (s) => {
    return s.split('').sort((a, b) => a < b ? 1 : -1).join('');
}
/*
    풀이#2
    1. sort메소드만 활용해서 내림차순으로 구현도 가능하다.
    2. 파라미터 b를 기준으로 b가 더 크면 앞 인덱스로 이동하도록 1값을 아닐 경우 -1값을 리턴하면 된다.

    시간복잡도
    두 코드 전부 sort를 활용한 O(NlogN)보다 커질 수 없다.
*/
