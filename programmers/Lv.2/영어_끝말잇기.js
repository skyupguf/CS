//  문제요약
//  1. n은 2~10 사이의 자연수, words는 문자열이 들어있는 배열로 n~100의 길이를 가진다.
//  2. words안의 모든 문자들은 알파벳 소문자이며 2~50의 길이를 가진다.
//  3. n의 순서대로 words안의 단어들이 배정될 때 잘못된 끝말잇기를 한 n과 몇번째 라운드 인지 [n, round] 를 구하라.
//  4. 결과는 3가지의 경우가 존재 1 모두성공, 2 끝말잇기 실패 3 앞에서 나온 단어
//  5. 모두 성공의 경우 [0, 0]을 리턴하고 나머지 경우는 [n, round] 리턴
//  6. n = 3, words = ["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"], return [3, 3]

//  코드
const findWrongAnswer = (n, words) => {
    const visited = [];
    let num = 0, round = 0;
    
    for(let i=1; i<words.length; i++) {
        let w1 = words[i-1], w2 = words[i];
        visited.push(w1);
        
        if(w1[w1.length-1] !== w2[0] || visited.includes(w2)) {
            num = (i+1) % n || n;
            round = Math.ceil((i+1)/n);
            break;
        }
    }
    return [num, round];
}
/*
    풀이
    1. 끝말잇기 실패시 인덱스를 할당할 변수 num, 라운드 횟수 round를 선언하고 0을 할당한다.
    2. 앞에서 나온 단어를 체크하기 위해 visited 배열을 하나 선언한다.
    3. words를 루프하면서 인덱스 i = 1 부터 순회, 0부터 순회하면 i+1이 undefined가 될 수 있다.
    4. i-1과 i의 각 문자를 w1, w2변수에 각각 할당하고 w1은 visited에 push한다.
    5. w1과 w2의 뒤와 앞 문자 비교 / w2가 visited에 있는지 or조건으로 체크한다.
    6. num에는 i+1을 n으로 나눈 나머지를 할당, round에는 i+1을 n으로 나눈 몫을 할당한다.
    7. if조건문에 들어온 경우 break로 루프를 종료한다.
    8. [num, round]를 리턴한다.

    에러핸들링
    1. n으로 나머지 나누기를 했을 때 나머지가 없는 경우 0이 할당되어 버리므로 num = (i+1) % n || n 수정
    2. round가 4.11111 이면 5번째 라운드이므로 올림을 해야하기 때문에 Math.ceil을 사용한다.

    시간복잡도
    words의 각 문자로 visited를 탐색하나 visited는 words를 끝까지 탐색하지 않는 이상 N^2이 될 수 없으므로 O(N)
*/
