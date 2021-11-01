//  문제요약
//  1. weight이 100,000 이하인 배낭에 이차원 배열 items의 원소가 [무게, 가치] 인 물건을 담으려 한다.
//  2. 배낭에 담을 수 있는 여러 item들 중 weight 한도내에서 최대가치가 되도록 함수를 작성하라.
//  3. weight = 50, items = [[10, 60], [20, 100], [30, 120]], return 220
//  4. weight = 10, items = [[5, 10], [4, 40], [6, 30], [3, 50]], return 90
//  5. weight = 40, items = [[40, 10], [50, 100], [10, 30]], return 30

//  코드
const combKnapsack = (weight, items) => {
    const DP = new Array(items.length+1).fill([]);

    for(let i=0; i<=items.length; i++) {
        for(let j=0; j<=weight; j++) {
            
            if(i === 0 || j === 0) DP[i][j] = 0;
            if(items[i][0] > j) DP[i][j] = DP[i-1][j];
            else DP[i][j] = Math.max(DP[i-1][j], DP[i-1][j-items[i-1][0]] + items[i-1][1]);
        }
    }
    return DP[items.length][weight];
}
/*
풀이
1. 무게 한도 내에서 가능한 모든 조합을 수행해 보고 가장 가치가 높은 경우를 리턴한다.
2. 모든 조합을 시험해 봐야 하기 때문에 처음 방문한 위치를 기록해 두면 재 탐색을 할 필요가 없다.
3. DP를 위해 방문내용을 기록하기 위해 무게, 가치의 원소를 넣을 이차원 배열을 만든다.
4. items의 가치를 판단하기 위해 전체 루프를 한다.
*/