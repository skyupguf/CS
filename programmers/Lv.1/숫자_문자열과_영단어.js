//  문제요약
//  1. 숫자의 일부가 소문자 영문으로 들어오는 문자열 s는 1~50 길이를 갖는다.
//  2. 영문은 0~9 가 존재하며 s가 "zero" 또는 "0"으로 시작하는 경우는 존재하지 않는다.
//  3. return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어진다.
//  4. s = "one4seveneight", return 1478 / s = "23four5six7", return 234567 / s = "123", return 123
//  5. 정확성 테스트의 제한시간은 10초 안에 수행되어야 한다.

//  코드#1
const convertNumber = (s) => {
    let complete = '', str = '';
    const n = {zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};
    
    for(let el of s) {
        !isNaN(el) ? complete += el : str += el;
        if(n[str] || n[str] === 0) complete += n[str], str = ''; 
    }
    return Number(complete);
}
/*
    풀이#1
    1. 문자열을 어떻게 쪼갤지가 문제의 솔루션
    2. 객체 n에 문자열키와 숫자 룩업 테이블을 생성한다.
    3. s를 루프하면서 s가 숫자인지 판별해서 분기 숫자면 complete에 누적 아닐 경우 str에 누적
    4. 누적된 str이 룩업테이블에 존재하거나 0일 경우 값을 complete에 누적하고 str에 빈문자를 할당한다.

    시간복잡도
    O(N)
*/

//  코드#2
const convertNumber = (s) => {
    let complete = s, num;
    const n = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    n.forEach((el, i) => { num = complete.split(el), complete = num.join(i) });
    return Number(complete);
}
/*
    풀이#2
    1. s의 문자를 루프할 필요가 없다, s의 영문만 찾으면 되기 때문에 n의 변수에 영문숫자를 배열로 할당한다.
    2. s 문자열을 complete 변수에 할당한다, num 변수를 선언한다.
    3. n을 루프하면서 n의 각 원소를 기준으로 complete에서 split하면 해당문자는 사라지고 해당문자 기준으로 ['s', 's'] 쪼개진다.
    4. 원소가 존재하지 않으면 [원래문자]가 되고 인덱스 i로 num.join(i)를 하면 인덱스 수로 치환된다.
    5. 1zero2zero3 일 경우 ['1', '2', '3'] 이 되며 0으로 조인하면 '10203' 이 된다.

    시간복잡도#2
    문자열 s 를 루프할 필요없이 n 루프하면 연산이 종료된다.
*/