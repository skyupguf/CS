const countComponent = (edges) => {
    let count = 0;
    const maxNode = Math.max(...edges.flat());
    const visited = new Array(maxNode).fill(false);
    const adjMatrix = makeAdjacencyMatrix(edges, maxNode);

    for(let node=0; node<=maxNode; node++) {
        if(!visited[node]) {
            useDfs(adjList, node, visited); // 1. 인접리스트 사용
            //useDfs(adjMatrix, node, visited); // 2. 인접행렬 사용
            count++;
        }
    }
    return count;
}
//  1. 인접리스트 생성
function makeAdjacencyList(edges, maxNode) {
    const adjList = {};
    for(let i=0; i<=maxNode; i++) {
        adjList[i] = [];
    }
    edges.forEach(el => {
        adjList[el[0]].push(el[1]);
        adjList[el[1]].push(el[0]);
    });
    return adjList;
}
//  2. 인접행렬 생성
function makeAdjacencyMatrix(edges, maxNode) {
    const matrix = [];
    for(let i=0; i<=maxNode; i++) {
        matrix.push(new Array(maxNode).fill(0));
    }
    edges.forEach(el => {
        matrix[el[0]][el[1]] = 1;
        matrix[el[1]][el[0]] = 1;
    });
    return matrix;
}
//  인접리스트로 깊이우선 탐색
function useDfs(adjList, node, visited) {
    visited[node] = true;
    for(let i=0; i<adjList[node].length; i++) {
        if(!visited[adjList[node][i]]) {
            useDfs(adjList, adjList[node][i], visited);
        }
    }
}
//  인접행렬로 깊이우선 탐색
function useDfs(adjMatrix, node, visited) {
    visited[node] = true;
    for(let i=0; i<adjMatrix[node].length; i++) {
        if(adjMatrix[node][i] === 1 && !visited[i]) {
            useDfs(adjMatrix, i, visited);
        }
    }
}
