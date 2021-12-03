const countComponent = (edges) => {
    let count = 0;
    const visited = {};
    const maxNode = Math.max(...edges.flat());
    const adjList = makeAdjacencyList(edges, maxNode);
    
    for(let node=0; node<=maxNode; node++) {
        if(!visited[node]) {
            useBfs(adjList, node, visited); // 1. 인접리스트 사용
            //useBfs(adjMatrix, node, visited); // 2. 인접행렬 사용
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
//  인접리스트로 너비우선 탐색
function useBfs(adjList, node, visited) {
    const queue = [node];
    visited[node] = true;
    while(queue.length > 0) {
        const c = queue.shift();
        for(let i=0; i<adjList[c].length; i++) {
            if(!visited[adjList[c][i]]) {
                queue.push(adjList[c][i]);
                visited[adjList[c][i]] = true;
            }
        }
    }
}
//  인접행렬로 너비우선 탐색
function useBfs(adjMatrix, node, visited) {
    const queue = [node];
    visited[node] = true;
    while(queue.length > 0) {
        const c = queue.shift();
        for(let i=0; i<adjMatrix[c].length; i++) {
            if([adjMatrix[c][i]] === 1 && !visited[i]) {
                queue.push(i);
                visited[i] = true;
            }
        }
    }
}