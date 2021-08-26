// 문제요약
// 1. 길이가 1~100인 숫자배열 d와 1~10,000,000이하의 자연수 budget이 있다.
// 2. 숫자 배열 d의 요소들을 조합해서 더한 값은 sum이다.
// 3. sum <= budget 일 때, d의 요소 몇개를 더해서 budget의 근사치에 가장 가까운지 알아내라.
// 4. d = [1,3,2,5,4], budget =	9, return 3 / d = [2,2,3,3], budget = 10, return 4

//  코드
const countElForCondition = (d, budget) => {
    let sum = 0, count = 0; 
    d.sort((a, b) => a - b);
    for(let i=0; i<d.length; i++) {
        sum += d[i];
        if(sum > budget) break;
        count++;
    }
    return count;
}
/*
풀이
1. 작은 수가 올 수록 더 많은 요소를 budget에 맞출 수 있으므로 d를 오름차순 정렬한다.
2. 앞에 작은 수 부터 누적하면 뒤에 어떤 수의 조합이 오든 작은 수의 누적이 더 많은 요소를 포함한다.
3. d배열의 요소를 루프로 순회하면서 sum에 누적하고 budget보다 같거나 작을 때까지 누적 수만 큼 카운트

시간복잡도
break로 중간에 탈출은 하나 최대 한번의 순회가 기본이므로 O(N) 
*/