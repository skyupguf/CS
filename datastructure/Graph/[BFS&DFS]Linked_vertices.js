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

}
/*
//  접근방법  //
    정점들의 묶음인 edges를 인접행렬 또는 인접리스트로 만들어 간선의 연결관계를 나타낼 수 있다.
    행렬과 리스트로 만든 이후 

    풀이
    1. 그래프 탐색과 관련된 변수와 인접행렬을 생성한다.
        1-1. 무향간선으로 연결된 정점세트를 카운트할 graph변수를 선언하고 0을 할당, 정점을 방문처리할 visited = {} 선언한다.
        1-2. 인접행렬 생성을 위해 size변수를 선언하고 edges를 reduce로 순회하면서 max + 1을 할당한다.
        1-3. row와 col을 size길이로 이차원 배열을 생성해 matrix 변수에 할당한다.
        1-4. edges를 루프하면서 row에 담긴 정점세트를 matrix에서 1을 할당해 간선을 연결해 인접행렬을 완성한다.
    
    2. 이제 전체 정점을 0부터 size까지 순회하면서 시작점으로 고정해 간선탐색을 한다.
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
    // let graph = 0
    // const visited = {};

    // const size = edges.reduce((a, [v1, v2]) => a = Math.max(a, v1, v2), 0) + 1;
    // const matrix = Array.from({length: size}, () => new Array(size).fill(0));
    
    // edges.forEach(([v1, v2]) => { matrix[v1][v2] = matrix[v2][v1] = 1 });
    // for (let vertex=0; vertex<size; vertex++) {

    //     if (!visited[vertex]) {
    //         useBfs(matrix, vertex, visited), graph++;
    //      // useDfs(matrix, vertex, visited), graph++;
    //     }
    // }
    // return graph;

// function useBfs(matrix, src, visited) {
//     const queue = [src];
//     visited[src] = true;

//     while (queue.length) {
//         let row = matrix[queue.shift()];

//         for (let col=0; col<row.length; col++) {
//             if (row[col] && !visited[col]) {
//                 queue.push(col), visited[col] = true;
//             }
//         }
//     }
// }

// function useDfs(matrix, src, visited) {
//     let row = matrix[src];
//     visited[src] = true;

//     for (let col=0; col<row.length; col++) {
//         if (row[col] && !visited[col]) {
//             useDfs(matrix, col, visited);
//         }
//     }
// }


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