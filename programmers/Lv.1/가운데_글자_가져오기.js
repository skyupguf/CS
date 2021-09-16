// 문제요약
// 1. 길이가 1~100이하인 문자열 s의 가운데 문자열을 리턴한다.
// 2. "abcde"면	"c", "qwer"면 "we"

// 풀이
// 1. 중간 인덱스 i = (s.length-1)/2 홀수면 그대로, 짝수면 반올림한 i와 i-1
// 2. 나머지 나누기로 홀, 짝 분기를 주고 인덱스 i를 적용해서 리턴한다.
const extractMiddleStr = (s) => {
    const i = Math.round(s.length-1 / 2);
    return s.length % 2 === 0 ? s[i-1]+s[i] : s[i];
}
