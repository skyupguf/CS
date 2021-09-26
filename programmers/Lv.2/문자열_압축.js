//  문제요약
//  1. 입력인자 s는 알파벳 소문자이며 1~1,000 길이를 갖는다. 그리고 이 문자열을 다음과 같이 압축한다.
//  2. 문자열 하나의 단위를 s1이라 한다면 "aabbaccc"의 경우 s1으로 압축하면 "2a2ba3c" 가 된다.
//  3. "ababcdcdababcdcd"의 경우는 s1으로 압축하면 비효율적이므로 s2로 하면 "2ab2cd2ab2cd"가 되며 s8로 하면 "2ababcdcd"가 된다.
//  4. 위 처럼 입력으로 s가 주어졌을 때 가장 압축력이 높은 방법으로 압축했을 경우 문자의 길이를 리턴하라.
//  5. "abcabcdede"면 s2일 경우 "abcabc2de" s3일 경우 "2abcdede" 가 되어 더 압축력이 높다.
//  6. s = "abcabcabcabcdededededede" ==s6=> "2abcabc2dedded", return 14 
//  7. s = "xababcdcdababcdcd", return 17 모든 문자가 적용되어야 하므로 x는 중복이 없어 s1만 가능하다.

//  코드
const makeCompressedStr = (s) => {

}
/*
풀이
1. 가장 앞의 문자와 뒤의 문자를 문자를 하나씩 추가하면서 추가한 문자 길이만큼 비교해 나간다.
a bcabcabcabcdededededede 0 s1
ab cabcabcabcdededededede 0 s2
abc abcabcabcdededededede 1 s3
abca bcabcabcdededededede 0 s4
abcab cabcabcdededededede 0 s5
abcabc abcabcdededededede 1 s6
abcabca bcabcdededededede 0 s7
abcabcab cabcdededededede 0 s8
abcabcabc abcdededededede 0 s9
abcabcabca bcdededededede 0 s10
abcabcabcab cdededededede 0 s11
abcabcabcabc dededededede 0 s12
2. 가장 앞부턴 비교해나갈 수 있는데 위 예시처럼 de가 6문자로 중복되는걸 어떻게 판단할 것인가


*/