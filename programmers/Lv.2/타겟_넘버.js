//  문제요약
//  1. numbers는 1~50의 자연수가 담긴 배열, target은 1~1000의 자연수 중 하나이다.
//  2. numbers의 모든 요소를 더하거나 빼서 주어진 target을 만들 수 있는 경우의 수를 반환하라
//  3. numbers = [1, 1, 1, 1, 1], target = 3
//  4. -1+1+1+1+1 = 3, 1-1+1+1+1 = 3, 1+1-1+1+1 = 3, 1+1+1-1+1 = 3, 1+1+1+1-1 = 3, return 5

//  코드
const countNumberOfCase = (numbers, target) => {
    let count = 0;
    useDfs(0, 0);

    function useDfs(i, sum) {
        if(i === numbers.length) {
            if(sum === target) count++;
            return;
        }
        useDfs(i+1, sum + numbers[i]);
        useDfs(i+1, sum - numbers[i]);
    }
    return count;
}
/* 
    풀이
    1. numbers = [3, 5, 6, 1], target = 1 일 때 branch 수
    + 3 + 5 + 6 + 1 
                - 1
            - 6 + 1
            - 6 - 1 count
        - 5 + 6 + 1
        - 5 + 6 - 1
        - 5 - 6 + 1
        - 5 - 6 - 1
    - 3 + 5 + 6 + 1
                - 1
            - 6 + 1
            - 6 - 1
        - 5 + 6 + 1
        - 5 + 6 - 1
        - 5 - 6 + 1
        - 5 - 6 - 1
    2. 모든 경우를 완전탐색해야 하므로 DFS를 활용한다.
    3. 4개의 수는 모두 연산되어야 하므로 인덱스가 numbers.length와 동일해 질 때 하나의 branch가 완료된다.
    4. branch가 완료되고 target과 수가 같으면 count를 한다.
    5. DFS의 경우 stack을 활용한 재귀호출, 백트래킹으로 재귀호출하는 두 가지 모두 상정해야 한다.
    ex) + 3 + 5 + 6 + 1 
                    - 1
    6. 우선 +로 sum 누적을 재귀호출 하고 백트래킹으로 -를 하나 씩 변경하면서 sum을 구한다.
    7. 풀이 예제를 기준으로 재귀호출이 되는 순서
        7-1. 우선 모든 sum+ 호출이 스택에 누적 i=4가 되면 branch완성
        7-2. 최상단 스택 제거되고 i=3일 때로 백트래킹해서 i=4 sum- 호출
        7-3. i=3일 경우 모두 탐색이 끝났으면 스태제거, i=2일 때 sum- 호출
        7-4. 다시 i=3일 경우 sum+와 sum-를 각각 탐색

    시간복잡도
    +와 -가 numbers의 모든 수에서 번갈아 사용된다, 2 * 2 ... * n = 2^n
*/