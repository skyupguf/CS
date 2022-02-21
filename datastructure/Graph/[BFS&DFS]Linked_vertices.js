/*
//  문제요약  //
    2차원 배열 edges에 존재하는 셀은 인접관계인 두 정점을 나타낸다.
    edges의 모든 정점을 간선으로 이어 그래프를 완성했을 때 간선으로 연결된 그래프의 개수를 구하는 함수를 작성하라.

    1. edges 배열의 정점의 간선들은 무향이며 각 edges를 순회하며 모든 정점을 이으면 아래와 같다.
        edges = [[0, 1], [1, 2], [3, 4]] => 0 - 1 - 2, 3 - 4 총 2개의 그래프가 완성된다.

    2. 테스트 케이스
        2-1. edges = [[0, 1], [2, 3], [3, 4], [3, 5]], return 2
        2-2. edges = [[0, 1], [2, 3], [4, 5]], return 3
    
    3. 추가로 인접행렬과 인접리스트로 BFS, DFS를 모두 구현해 본다.
*/

/*  인접행렬 코드  */
const countLinkedMatrix = (edges) => {
    const size = edges.reduce((a, [v1, v2]) => a = Math.max(a, v1, v2), 0) + 1;
    const matrix = Array.from({length: size}, () => new Array(size).fill(0));
    edges.forEach(([v1, v2]) => {matrix[v1][v2] = matrix[v2][v1] = 1});

    let graph = 0;
    const visited = {};
    for (let row=0; row<matrix.length; row++) {
        if (!visited[row]) {
            matrixBfs(matrix, visited, row);
            // matrixDfs(matrix, visited, row)
            graph++;
        }
    }
    return graph;
}

function matrixBfs(matrix, visited, vertex) {
    const queue = [vertex];

    for (let i=0; i<queue.length; i++) {
        visited[queue[i]] = true;
        
        let row = matrix[queue[i]];
        for (let col=0; col<row.length; col++) {
            if (row[col] && !visited[col]) queue.push(row[col]);
        }
    }
}

function matrixDfs(matrix, visited, vertex) {
    visited[vertex] = true;

    let row = matrix[vertex];
    for (let col=0; col<row.length; col++) {
        if (row[col] && !visited[col]) matrixDfs(matrix, visited, col);
    }
}
/*
//  접근방법  //
    간선의 여부를 담은 edges배열은 정점의 크기순으로 정렬되어 있지 않기 때문에 순차적으로 탐색할 수 없으므로 간접관계를 
    일차원적인 루프로 탐색할 경우 규칙적인 코드구현이 불가능에 가깝다. 따라서, 정점을 순서대로 탐색할 수 있도록 행렬이나
    리스트를 활용하여 접근한다.

    인접행렬이나 리스트로 각 정점의 간선을 표시하면 정점을 순서대로 방문하여 간선의 여부를 판단할 수 있기 때문에 간접으로
    연결된 정점간의 관계를 전체탐색을 통해 규칙적인 코드로 구할 수 있다.


//  수도코드  //
    1. 입력으로 주어지는 edges의 정점의 개수를 파악해야 인접행렬을 생성할 수 있다.
        1-1. size변수를 선언하고 edges를 루프하면서 가장 큰 정점을 찾은 후 +1을 누적한다.
        1-2. size를 이용해 인접행렬을 이중루프로 생성하고 matrix변수에 할당한다. 
        1-3. 무방향 그래프이기 때문에 edges에 존재하는 정점을 인덱스로 하여 양 방향에 1을 할당한다.

    2. 인접행렬을 루프하면서 연결된 정점들이 존재하는 곳 까지 탐색해 카운트를 누적한다.
        2-1. 연결된 간선이 존재하지 않을 때 까지 카운트를 누적할 graph 변수를 선언해 0을 할당한다.
        2-2. 한 번 방문한 정점을 재 방문하지 않도록 하는 방문처리 빈 객체 visited를 선언한다.
        2-3. matrix의 0번째 row를 시작으로 루프하면서 모든 정점의 간선을 방문하지 않았다면 방문해서 간선을 체크한다.
        2-4. 연결된 정점의 경우 하나의 그래프가 되므로 재 방문을 할 필요가 없기 때문에 visited에 우선 정점을 체크한다.
        2-5. 방문하지 않은 정점일 겨우 BFS 모듈함수로 만들어 matrix, row, visited를 인자로 전달해 구현한다.

    3. BFS를 활용해 인접행렬을 탐색한다.
        3-1. 현재 정점과 간선이 존재하는 정점을 탐색할 queue를 선언해 인자로 받은 vertex를 삽입하고 visited에 방문처리한다.
        3-2. 간선이 존재하지 않을 때 까지 탐색해야 하므로 queue를 루프하면서 matrix[vertex]의 간선을 체크해 queue에 삽입한다.
        3-3. 이 때, visited에서 방문체크를 해 방문하지 않은 정점만 queue에 삽입한다.
        3-4. 루프가 종료되면 객체인 visited에서 방문처리가 되기 때문에 리턴을 할 필요는 없다.
    
    4. DFS를 활용해 인접행렬을 탐색한다.
        4-1. BFS와 달리 간선이 존재할 경우 해당 정점으로 바로 이동해야하기 때문에 재귀호출을 이용한다.
        4-2. 마찬가지로 visited의 결과만 있으면 되기 때문에 리턴값은 필요하지 않다.
        4-3. row를 모두 루프해 더 이상 간선이 없으면 호출된 함수 이전으로 백트래킹하여 탐색을 계속한다.
    
    5. 간선이 더 이상 이어지지 않을 경우 BFS 또는 DFS의 함수를 종료하고 graph를 누적한다.

    시간복잡도
    정점 탐색은 방문처리로 중복하지 않기 때문에, 인접행렬 생성으로 소요되는 O(N^2)이 최대 시간복잡도이다.
*/

/*  인접리스트 코드 */
const countLinkedList = (edges) => {
    const list = {};
    const size = edges.reduce((a, [v1, v2]) => {
        list[v1] = {}, list[v2] = {};
        return a = Math.max(a, v1, v2);
    }, 0) + 1;
    edges.forEach(([v1, v2]) => {list[v1][v2] = list[v2][v1] = 1});

    let graph = 0;
    const visited = {};
    for (let vertex=0; vertex<size; vertex++) {
        if (!visited[vertex]) {
            listBfs(list, visited, vertex);
            // listDfs(list, visited, vertex)
            graph++;
        }
    }
    return graph;
}

function listBfs(list, visited, vertex) {
    const queue = [vertex];

    for (let i=0; i<queue.length; i++) {
        visited[queue[i]] = true;
        
        let adjList = list[queue[i]];
        for (let node in adjList) {
            if (!visited[node]) queue.push(node);
        }
    }
}

function listDfs(list, visited, vertex) {
    visited[vertex] = true;
        
    for (let node in list[vertex]) {
        if (!visited[node]) listDfs(list, visited, node);
    }
}
/*
//  접근방법  //
    인접리스트는 탐색할 정점을 키로 인접한 정점들을 키-값으로 할당한 자료구조이다.
    따라서 인접정점을 찾기 위해 객체를 루프하면서 해당 정점의 간선을 확인하는 방법을 제외하고 행렬코드와 크게 다르지 않다.


//  수도코드  //
    1. 인접리스트를 생성하고 edges를 루프하면서 인접리스트의 정점 키와 전체 크기를 구하고 간선을 할당한다.
        1-1. list 변수를 선언하고 빈 객체를 할당한다.
        1-2. edges를 루프하면서 각 정점들을 list의 키로 {}를 값으로 할당하고 전체 사이즈를 구한다.
        1-3. edges를 루프하면서 탐색중인 정점과 인접한 정점을 키-값으로 list에 할당한다.
    
    2. 리스트 자료구조를 사용하는 것 외에 모든 로직은 인접행렬과 동일하다.
        2-1. 객체 자료구조에 맞게 루프와 조건문을 활용해 BFS, DFS 모듈함수를 구현한다.
*/
