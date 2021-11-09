//  문제요약
//  1. 그래프에 존재하는 정점의 개수인 자연수 타입 num이 입력으로 주어진다.
//  2. edges는 간선에 대한 정보를 원소로 가지는 이차원 배열이다.
//  3. edges[i]는 number 타입을 요소로 갖는 배열로 길이는 3이며, edges[i][2]은 100이하의 양의 정수다.
//  4. edges[i] = [1, 2, 3]은 1번 정점에서 2번 정점으로 가는 방향의 거리가 3임을 의미한다.
//  5. 정점들은 서로 한방향 또는 양뱡향으로 연결되어 있다.(방향성 그래프)
//  6. 두 정점 간 경로가 존재하지 않는 경우, null로 표기하고 정점(vertex)간 최단 거리를 리턴하라.
//  7. num = 4, edges = [[1, 2, 6], [1, 4, 9], [2, 1, 8], [2, 3, 10], [3, 1, 3], [3, 4, 5], [4, 3, 4]];
//  8. 리턴되는 결과 [[0, 6, 13, 9], [8, 0, 10, 15], [3, 9, 0, 5], [7, 13, 4, 0]]
//  9. num = 4, edges = [[1, 2, 6], [1, 3, 2], [2, 3, 3], [3, 2, 2], [3, 4, 5], [4, 2, 1], [4, 3, 5]];
// 10. 리턴되는 결과 [[0, 4, 2, 7], [null, 0, 3, 8], [null, 2, 0, 5], [null, 1, 4, 0]];

//  코드
const createGraphMatrix = (num, edges) => {
    const matrix = [];
    for(let i=0; i<=num; i++) {
        matrix.push(new Array(num+1).fill(101));
        matrix[i][i] = 0;
    }
    edges.forEach(([src, dst, cost]) => {matrix[src][dst] = cost});
    return matrix;
}

const findShortestEdges = (num, edges) => {
    const graph = createGraphMatrix(num, edges);
    for(let way=1; way<=num; way++) {
        for(let src=1; src<=num; src++) for(let dst=1; dst<=num; dst++) {
            let waypointCost = graph[src][way] + graph[way][dst];
            if(waypointCost < graph[src][dst]) graph[src][dst] = waypointCost;
        }
    }
    const nulled = graph.map(row => row.map(col => col === 101 ? null : col));
    return nulled.slice(1).map(row => row.slice(1));
}
/*
    풀이
    1. 그래프를 인접행렬로 구성한다, num개의 노드가 필요하기 때문에 배열원소를 num만큼 존재하는 행렬로 만든다.
    2. 행렬은 DP를 활용하기 위해 자기 자신의 노드인 경우 i = j 거리가 0이므로 num까지 길이로 만든다.
    3. 원소배열의 길이도 행렬의 길이를 맞추기 위해 num까지 만들고 각 거리는 100을 넘지 못하기 때문에 101로 채운다.
    4. i = j인 경우는 거리가 존재하지 않는 자기노드 이기 때문에 0으로 전부 초기화해 준다.
    5. 출발노드와 도착노드, 간선의 거리비용이 담겨있는 edges를 루프하면서 각 노드가 만나는 위치에 비용을 할당한다.
    6. num개의 노드가 각 인덱스로 설정된 matrix는 DP역할을 수행할 수 있다.
    7. 완성된 행렬은 연결된 간선간의 가중치를 가지고 있지만 아직 최단 거리가 구해지지 않았다.
    8. 최단거리는 해당 간선이 존재하는 노드들 중 거쳐가는 노드의 간선의 합의 비용이 더 적을 경우 갱신한다.
    9. 따라서, src(출발)와 waypoint(경유)의 거리 + waypoint(경유) + dst(도착)의 비용을 구하기 위해 이중루프가 필요하다.
    10. 그리고 현재 간선거리의 비용인 src와 dst의 비용과 비교하기 위해 삼중루프를 통해 최소비용을 갱신한다.
    11. 최단거리 행렬이 완성되면 값이 101인 경우는 경로가 존재하지 않기 때문에 map을 활용해 101값을 전부 null로 치환한다.
    12. 마지막 값을 반환할 때 노드의 시작은 1부터기 때문에 인덱스 0번째의 row와 col을 전부 제거해서 리턴한다.

    에러핸들링
    1. row와 col이 모두 0일 때, 노드는 1부터 존재하므로 i=0일 때, 하나의 row를 모두 제거하고 map을 통해 각 row의 0번째를 제거한다.

    시간복잡도
    정점의 개수 V를 3중루프로 방문하고 연산하기 때문에 O(V^3)의 시간복잡도를 가진다.
*/