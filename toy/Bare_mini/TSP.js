//  문제요약
//  1. 외판원 문제(travelling salesman problem, 이하 TSP)는 아래와 같이 정의된다.
//  2. 여러 정점의 위치가 주어질 때 모든 정점을 단 한 번만 방문하는 최단 거리를 구해야 한다.
//  3. 출발과 도착의 정점들은 정해져 있지 않으며, 모든 정점을 반드시 한번씩 방문하는 경로 중 최단 거리를 리턴해야 한다.
//  4. 두 점 사이의 거리를 계산하는 함수 calDistance가 주어진다.
//  5. 입력 : places는 2차원 배열로 places[i]의 길이는 2이고 각 원소는 number 타입을 가지며, 좌표로 y, x로 표시가능하다.
//  6. places = [[0, 0], [1, 1], [1, 3], [2, 2]], return 423 // 방문 순서: [0, 0], [1, 1], [2, 2], [1, 3]
//  7. places = [[0, 0], [3, 3], [-3, 3], [2, 3], [1, 3]], return 940 // 방문 순서: [-3, 3], [1, 3], [2, 3], [3, 3], [0, 0]
//  8. TSP 처럼 모든 꼭지점을 한 번씩 지나는 경로를 해밀턴 경로(Hamiltonian path)라 한다.
//  9. TSP는 조합 최적화 문제의 일종으로 NP-hard라는 것이 증명되었으며 완전탐색(exhaustive search)으로만 해결이 가능하다.

//  코드
const calDistance = (p1, p2) => {
    const yDiffSquared = Math.pow(p2[0] - p1[0], 2);
    const xDiffSquared = Math.pow(p2[1] - p1[1], 2);
    const dist = Math.sqrt(yDiffSquared + xDiffSquared);
    return Math.floor(dist * 100);
}

const completeTSP = (places) => {
    let result = Number.MAX_SAFE_INTEGER;
    
    for(let i=0; i<places.length; i++) {
        let copied = JSON.parse(JSON.stringify(places));
        let start = copied.splice(i, 1).flat();
        let sDist = Number.MAX_SAFE_INTEGER, sumDist = 0;
        let j = -1, fixed = 0;

        while(copied.length) {
            j++;
            // let end = copied[j];
            sumDist += calDistance(start, end);
            // if(cDist < sDist) sDist = cDist, fixed = j;
            if(j === copied.length-1) {
                if(sumDist < sDist) sDist = sumDist;
                start = copied.splice(fixed, 1).flat(); 
                j = -1, sDist = Number.MAX_SAFE_INTEGER;
            }
        }
        if(sumDist < result) result = sumDist;
    }
    return result;
}

/*
풀이
1. places배열을 복사한 후 원소하나를 시작점으로 고정하고 나머지 원소들과 모두 거리를 측정한다.
2. 가장 짧은 거리를 시작점으로 교체하고 구한 거리는 합에 누적한다.
3. 각 시작점을 기준으로 거리를 전부 완전탐색해야 하므로 for문으로 places[i]를 전체 순회한다.
4. places를 복사하고 시작점으로 i번째를 잘라서 할당한다.
5. while문을 통해 복사한 배열 길이가 0이 될 때까지 순회한다.
6. 

3. places
2. 시작점을 가ㅈ
2. places[0]부터 visited변수에
*/