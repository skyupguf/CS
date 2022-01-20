/*
//  문제요약  //
    아래 조건을 만족하는 그래프를 인접행렬로 구현되도록 함수를 작성하라

    1. edges배열이 입력으로 주어지며 배열의 원소는 다음과 같다.
        1-1. 0번째 원소 : 간선이 시작되는 정점
        1-2. 1번째 원소 : 간선이 도착하는 정점
        1-3. 간선의 방향을 표현하는 문자열, 'undirected'(무향), 'directed'(방향)
    
    2. 테스트 케이스
        edges = [                           result = [
            [0, 3, "directed"],                 [0, 0, 1, 1],
            [0, 2, "directed"],                 [0, 0, 0, 1],
            [1, 3, "directed"],                 [0, 1, 0, 0],
            [2, 1, "directed"]                  [0, 0, 0, 0]
        ]                                   ]
*/

/*  코드  */
const createAdjMatrix = (edges) => {
    const size = edges.reduce((a, [src, dst]) => a = Math.max(a, src, dst), 0) + 1;
    const matrix = Array.from({length: size}, () => new Array(size).fill(0));

	edges.forEach(([src, dst, edge]) => {
        matrix[src][dst] = 1;    
        if (edge === 'undirected') matrix[dst][src] = 1;
    });
    return matrix;
}
/*
//  접근방법  //
    존재하는 최대 정점의 크기가 인접행렬의 최대 인덱스가 되므로 edges배열에서 가장 큰 정점을 찾아야 한다.
    가장 큰 정점을 찾으면 +1을 한 값이 전체 행렬크기가 된다.
    행렬을 생성하고 edges의 간선과 방향을 확인해 조건에 맞는 인접행렬을 구성하면 된다.


//  수도코드  //
    1. 행렬을 만들기 위해 전체 행렬크기를 알아야 한다.
        1-1. edges를 reduce로 루프하면서 acc를 0으로 초기화 한다.
        1-2. acc, src, dst 중 가장 큰 수를 찾고 + 1해 size변수에 할당한다.

    2. Array.from을 이용해 전체 row의 개수가 size이면서 row의 길이가 size인 행렬을 matrix에 할당한다.

    3. edges간선을 루프하면서 각 노드에 해당하는 인덱스에 1을 할당하고 undirected면 반대로도 할당해 matrix를 리턴한다.

    
//  시간복잡도  //
    행렬을 생성해야 하므로 O(N^2)의 시간복잡도가 소요된다.
*/
