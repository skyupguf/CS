//  문제요약
//  1. 선행 스킬들이 순서가 나열된 1 ~ 26 길이의 문자열인 skill이 입력으로 주어진다.
//  2. 1 ~ 20 길이의 배열인 skill_trees의 각 원소는 스킬을 배우는 순서가 나열된 문자열 2 ~ 26사이 문자열이며 중복은 없다.
//  3. 모든 문자열은 대문자알파벳일 경우 skill 문자열대로 완성될 수 있는 스킬트리의 개수를 리턴하라.
//  4. skill = "CBD", skill_trees = ["BACDE", "CBADF", "AECB", "BDA"], return 2

//  코드
const countPossibleSkillTree = (skill, skill_trees) => {
    return skill_trees.filter(e => {
        let now = 0
        
        for(let i=0; i<e.length; i++) {
            let j = skill.indexOf(e[i]);
            
            if(j === -1) continue;
            if(j === now) now++;
            else return false;
        } 
        return true;
    }).length;
}
/*
    풀이
    1. 중간에 어떤 문자가 끼어있던 문자열 skill의 순서가 지켜지면 알맞는 원소다.
    2. skill_trees를 루프하면서 각 원소의 문자열을 루프, 문자열이 skill의 인덱스 몇 번째에 존재하는지 확인
    3. -1은 그냥 무시, -1이 아닌 경우 이전 문자 인덱스와 현재 문자 인덱스의 크기를 비교 크면 루프를 계속 진행
    4. 더 작을 시 루프 종료, 원소 문자열을 모두 루프할 경우 cnt+1
    5. 루프가 종료되면 cnt를 리턴한다

    에러핸들링
    1. 스킬트리 인덱스에서 처음 탐색할 때 무조건 인덱스는 0이 와야 하므로 현재 스킬을 담을 새로운 idx변수 선언한다.
    2. 현재 스킬의 인덱스와 idx변수가 일치하지 않으면 break, false 를 한다.

    리팩토링
    1. 현재 스킬과 선행스킬을 비교하고 현재스킬을 선행변수에 할당할 필요가 없다.
    2. 스킬 인덱스는 반드시 0 -> 1 -> 2 순으로 와야하기 때문에 처음 인덱스는 무조건 0이므로 now변수에 0으로 할당한다.
    3. 만일 현재스킬을 indexOf로 찾을 경우 -1을 제외하고 now와 같지 않으면 무조건 false다.
    4. 현재 스킬이 now와 같으면 now++ 를 하고 다음 스킬을 비교해 보면된다.
    5. boolean을 체크할 변수도 필요가 없다, 만일 스킬 순서가 안맞으면 바로 false를 리턴하고 루프가 다 돌 경우 true를 리턴한다.

    시간복잡도
    모든 스킬트리가 정상일 경우 O(N^2) 을 연산한다.
*/