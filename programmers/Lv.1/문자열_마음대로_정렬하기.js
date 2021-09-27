//  문제요약
//  1. 문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 각 문자열의 인덱스 n번째 문자를 기준으로 오름차순 정렬한다. 
//  2. strings가 ["sun", "bed", "car"]이고 n이 1이면 각 단어의 인덱스 1의 문자 "u", "e", "a"로 strings로 정렬한다.
//  3. ["abce", "abcd", "cdx"],	n = 2일 경우 사전식 정렬로	["abcd", "abce", "cdx"] 가 된다.

//  코드
const sortToChar = (strings, n) => {
    return strings.sort().sort((a, b) => {
        return a[n] < b[n] ? -1 : 1;
    });
}
/*
    풀이
    1. sort메소드로 사전식 정렬을 미리 수행한다.
    2. 문자열의 n번째를 sort의 대소비교를 활용, 오른쪽 값이 더 크면 -1 반대면 1 리턴

    시간복잡도
    sort메소드의 알고리즘은 O(n log(n))의 시간복잡도로 짜여져 있다, 이는 퀵, 힙, 머지 소트의 알고리즘을 사용한다.
*/
