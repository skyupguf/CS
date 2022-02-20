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

/*  코드  */
const countLinkedGraph = (edges) => {
    const size = edges.reduce((a, [v1, v2]) => a = Math.max(a, v1, v2), 0) + 1;
    const matrix = Array.from({length: size}, () => new Array(size).fill(0));
    edges.forEach(([v1, v2]) => {matrix[v1][v2] = matrix[v2][v1] = 1});

    let graph = 0;
    const visited = {};
    for (let row=0; row<matrix.length; row++) {
        if (!visited[row]) {
            BFS(matrix, visited, row);
            // DFS(matrix, visited, row)
            graph++;
        }
    }
    return graph;
}

function BFS(matrix, visited, vertex) {

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
        3-1. 현재 정점과 인접한 
        3-2. 
        3-3. 
        3-3. 


    1. edges에 연결된 정점간의 간선을 표시하기 위해 인접행렬을 생성한다.
        1-1. 인접행렬을 생성하기 위해 가장 큰 정점을 알아야 하므로 그래프의 전체 사이즈를 edges를 루프하여 구한다.
        1-2. 가장 큰 정점 + 1이 전체 사이즈 이므로 해당 수 만큼 이차원 배열을 이중루프를 이용해 간선에 0을 채워 생성한다.
        1-3. edges를 루프하면서 무향 그래프이므로 두 정점의 인덱스를 바꿔가면서 1을 할당해 인접행렬을 완성한다.

    2. 인접행렬을 탐색하면서 간선이 연속으로 이어진 정점을 판별해 카운트를 해야한다.
        2-1. for문으로 0부터 size까지 루프를 한다.
        2-2. 한번 그래프를 탐색할 때 모든 정점을 탐색하기 때문에 간선으로 연결되어 있는 정점은 모두 탐색한다.
        2-3. 따라서, visited에 방문처리가 되어있을 경우 정점을 중복 탐색해 버리기 때문에 탐색진입조건을 설정한다.
        2-4. BFS/DFS 탐색을 위한 함수모듈을 호출하고 graph를 누적한다.

    3. BFS함수를 함수모듈을 구현한다.
        3-1. BFS탐색을 위해 queue를 src를 배열에 포함해 선언하고 시작정점을 방문처리 해준다.
        3-2. while루프로 queue가 빈 배열이 될 때까지 루프하고 루프할 row가 될 정점을 queue에서 꺼내서 루프한다.
        3-3. for루프에서 row에 간선이 존재하는 col을 큐에 push하고 해당 정점은 방문처리한다.
        3-4. 간선이 이어진 정점은 전부 큐에 들어오게 되고 아닌 정점들만 남으므로 해당 그래프를 탐색할 수 있다.
    
    4. DFS함수를 함수모듈을 구현한다.
        4-1. 탐색할 시작정점 row를 row변수에 할당하고 방문처리한다.
        4-2. for문으로 루프하면서 col에 1이 존재하고 방문처리가 되어있지 않을 경우 재귀호출한다.
    
    5. 정점루프가 size와 같아지면 루프를 종료하고 찾은 그래프의 개수를 리턴한다.

    시간복잡도
    정점 탐색은 방문처리로 중복하지 않기 때문에, 인접행렬 생성으로 소요되는 O(N^2)이 최대 시간복잡도이다.
*/
    let graph = 0
    const visited = {};

    const size = edges.reduce((a, [v1, v2]) => a = Math.max(a, v1, v2), 0) + 1;
    const matrix = Array.from({length: size}, () => new Array(size).fill(0));
    
    edges.forEach(([v1, v2]) => { matrix[v1][v2] = matrix[v2][v1] = 1 });
    for (let vertex=0; vertex<size; vertex++) {

        if (!visited[vertex]) {
            useBfs(matrix, vertex, visited), graph++;
         // useDfs(matrix, vertex, visited), graph++;
        }
    }
    return graph;

function useBfs(matrix, src, visited) {
    const queue = [src];
    visited[src] = true;

    while (queue.length) {
        let row = matrix[queue.shift()];

        for (let col=0; col<row.length; col++) {
            if (row[col] && !visited[col]) {
                queue.push(col), visited[col] = true;
            }
        }
    }
}

function useDfs(matrix, src, visited) {
    let row = matrix[src];
    visited[src] = true;

    for (let col=0; col<row.length; col++) {
        if (row[col] && !visited[col]) {
            useDfs(matrix, col, visited);
        }
    }
}


//  인접리스트 코드
const countLinkedVertex = (edges) => {
    let graph = 0;
    const visited = {};

    const list = {};
    const size = edges.reduce((a, [v1, v2]) => {
        list[v1] = {}, list[v2] = {};
        return a = Math.max(a, v1, v2);
    }, 0) + 1;

    edges.forEach(([v1, v2]) => {list[v1][v2] = list[v2][v1] = 1});
    for (let node=0; node<size; node++) {
        
        if (!visited[node]) {
            useBfs(list, node, visited), graph++;
          //useDfs(list, node, visited), graph++;
        }
    }
    return graph;
}

function useBfs(list, src, visited) {
    const queue = [src];
    visited[src] = true;

    while (queue.length) {
        let vertex = queue.shift();

        for (let adjVertex in list[vertex]) {
            if (!visited[adjVertex]) {
                queue.push(adjVertex), visited[adjVertex] = true;
            }
        }
    }
}

function useDfs(list, src, visited) {
    visited[src] = true;

    for (let adjVertex in list[src]) {
        if (!visited[adjVertex]) {
            useDfs(list, adjVertex, visited);
        }
    }
}
/*
    풀이
    1. 인접행렬 코드와 크게 다르지 않으며, 행렬을 리스트로 구현하면 된다.
    
    시간복잡도
    하나의 정점 V와 인접한 정점들을 간선 E라고 하면 V + E만큼을 정확히 순회한다.
*/