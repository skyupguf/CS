// 문제요약
// 1. 대소문자가 모두 포함된 문자열s에서 'p'와 'y'의 개수를 세고 같으면 true, 다르면 false를 리턴한다.
// 2. 예를 들어 s가 "pPoooyY"면 true를 "Pyy"라면 false를 return한다.

// 풀이
// 1. 대소문자를 따로 구분하는 연산은 불필요하니 하나로 통일한다.
// 2. p와 y 문자를 배열 기준으로 split하여 길이를 비교연산으로 리턴한다.
const compareWordCount = (s) => {
    s = s.toLowerCase();
    return s.split('p').length === s.split('y').length;
}
// 시간복잡도