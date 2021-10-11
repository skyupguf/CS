//  문제요약
//  1. JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열이다.
//  2. 문자열 s의 길이는 1이상이고 알파벳과 공백으로 이뤄져 있으며, 공백은 여러 문자열일 수 있다.
//  3. 첫 문자가 알파벳이 아닐 경우 이어지는 문자는 소문자다.
//  4. 문자열 s가 입력 될 때, s를 JadenCase로 바꾼 문자열을 리턴하라.
//  5. s = "3people unFollowed me", return "3people Unfollowed Me"
//  6. s = "for the last week", return "For The Last Week"

//  코드
const convertToJadenCase = (s) => {
    return s.toLowerCase().split(' ').map(el => {
        if(el) el = el.replace(el[0], el[0].toUpperCase());
        return el;
    }).join(' ');
}
/*
    풀이
    1. 공백을 기준으로 하나의 문자열이기 때문에 모든 문자열을 소문자화하고 배열로 나눈다.
    2. 각 요소에서 가장 앞의 문자만 대문자로 변환하여 요소에 재할당한다.
    3. 루프를 종료하고 문자열로 다시 붙여서 리턴한다.
    
    에러핸들링
    1. 테스트케이스에 공백문자가 연속으로 올 수 있는 경우가 존재해 공백일 경우 예외처리 한다.

    시간복잡도
    루프와 메소드가 이중루프로 수행되는게 아니기 때문에 최대 O(N)을 넘지 못한다.
*/
