//  문제요약
//  1. edges배열의 인자는 3개이며 다음과 같다.
//      1-1. 0번째 간선이 시작 되는 정점(0이상 정수)
//      1-2. 1번째 간선이 도착 하는 정점(0이상 정수)
//      1-3. 방향표시 문자열('undirected' 무향, 'directed' 방향)
//  2. 위 배열인자를 통해 인접행렬을 완성하라.
//  3. edges = [
//         [0, 3, "directed"],
//         [0, 2, "directed"],
//         [1, 3, "directed"],
//         [2, 1, "directed"]
//     ]
//     return  [
//         [0, 0, 1, 1],
//         [0, 0, 0, 1],
//         [0, 1, 0, 0],
//         [0, 0, 0, 0]
//     ]

//  코드
const createAdjMatrix = (edges) => {
    const size = edges.reduce((a, [src, dst]) => a = Math.max(a, src, dst), 0) + 1;
    const matrix = Array.from({length: size}, () => new Array(size).fill(0));

	edges.forEach(([src, dst, edge]) => {
        matrix[src][dst] = 1        
        if (edge === 'undirected') matrix[dst][src] = 1;
    });
    return matrix;
}
/*
    풀이
    1. 자료구조 인접행렬 구현이 아닌 정해진 노드 수 만큼만 행렬을 생성하면 되기 때문에 가장 큰 노드를 찾는다.
        1-1. edges를 reduce로 루프하면서 acc를 0으로 초기화 한다.
        1-2. acc, src, dst 중 가장 큰 수를 찾고 + 1해 size변수에 할당한다.

    2. Array.from을 이용해 전체 row의 개수가 size이면서 row의 길이가 size인 행렬을 matrix에 할당한다.

    3. edges간선을 루프하면서 각 노드에 해당하는 인덱스에 1을 할당하고 undirected면 반대로도 할당해 matrix를 리턴한다.

    시간복잡도
    행렬을 생성해야 하므로 O(N^2)의 시간복잡도가 소요된다.
*/
