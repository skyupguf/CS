//  문제요약
//  1. 문자열 s는 알파벳 소문자로 이루어져 있으며 1,000,000이하의 길이이다.
//  2. 같은 알파벳이 2개 연속될 경우 제거해 나가면서 모두 제거 되면 1을 아닐 경우 0을 반환하라.
//  3. s = 'baabaa' b aa baa → bb aa → aa → '', return 1
//  4. s = 'cdcd' c dcd → cd cd → cdc d → cdcd, return 0

//  코드
function solution(s) {
    const stack = [];
    for(let el of s) {
        if(!stack.length || stack[stack.length-1] !== el) stack.push(el);
        else stack.pop();
    }
    return stack.length === 0 ? 1 : 0
}
/*
    풀이
    1. 문자열 길이가 백만이기 때문에 O(N) 초과의 시간 복잡도를 가지면 안된다.
    2. 문자열을 최대한 건드리지 않고 제거 하기위해 stack을 사용
    3. stack의 길이가 0이거나 stack의 마지막 문자열이 el과 다를 경우 el을 push
    4. el이 같을 경우 기존 stack의 마지막 문자열을 pop
    5. 모든 문자열이 제거 되어 stack.length가 0이면 1 아니면 0 리턴

    시간복잡도
    O(N)
*/