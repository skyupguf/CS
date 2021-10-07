//  문제요약
//  1. 균형 괄호 : 문자열안의 '(' 의 개수와 ')' 의 개수가 같을 경우
//  2. 올바른 괄호 : '(', ')'의 짝이 모두 들어맞는 경우 ex) "(())()" => 균형, 올바른 / "(()))(" => 균형
//  3. 균형 괄호를 올바른 괄호로 변환하고 반환하라, 빈 문자열일 경우 그대로 반환한다.

//  코드
const solution = p => {
    if(p === '') return p;
    let open = 0;
    let close = 0;
    let check = true;
    let u = '';
    let v = '';
    for(let i=0; i<p.length; i++) {
        p[i] === '(' ? open++ : close++;
        if(close > open) check = false;
        if(open === close) {
            u = p.slice(0, i+1);
            v = p.slice(i+1, p.length);
            break;
        }
    }
    if(check && v === '') return u;
    else if(check) return u += solution(v);
    else {
        let w = '(' + solution(v) + ')';
        u = u.slice(1, u.length-1);
        for(let i=0; i<u.length; i++) {
            if(u[i] === '(') w += ')';
            else w += '(';
        }
        return w;
    }
}
 
/*
    형태
    A형 : 균형 형태(open과 close 괄호 갯수가 균등)
    B형 : 올바른 형태(A형이면서 open, close가 제대로 배치)

    풀이
    1. p가 빈문자열이면 바로반환
    2. '(', ')'일 때 두 조건을 open, close로 나눔
    3. close가 open보다 먼저 올 경우 B가 성립x, boolean으로 false값 설정
    4. count가 0이면 A를 충족, B가 충족되는지 검사해야 한다.
    5. open과 close의 값이 같아지면 A가 충족, u와 v를 각각 할당하고 break
    6. 먼저 리턴되는 순대로 조건설정
    7. u가 B를 충족하고 v가 빈문자열이면 바로 u를 리턴
    8. u가 B를 충족하지만 v가 문자열이면 v를 재귀호출해서 7번이 성립되도록 한다.
    9. u가 A가 성립된 경우 v를 재귀호출
*/