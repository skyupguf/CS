const countComponent = (edges) => {
    let count = 0;
    const visited = {};
    const maxNode = Math.max(...edges.flat());
    //const visited = new Array(maxNode).fill(false);
    const adjList = makeAdjacencyList(edges, maxNode);
    //const adjMatrix = makeAdjacencyMatrix(edges, maxNode);
    for(let node=0; node<=maxNode; node++) {
        if(!visited[node]) {
            useBfs(adjList, node, visited); 
            //useDfs(adjList, node, visited);
            //useBfs(adjMatrix, node, visited); 
            //useDfs(adjMatrix, node, visited);
            count++;
        }
    }
    return count;
}

/////////////////* 1. 리스트 그래프 */////////////////
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
// 1-1. 넓이우선 접근
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
// 1-2. 깊이우선 접근
function useDfs(adjList, node, visited) {
    visited[node] = true;
    for(let i=0; i<adjList[node].length; i++) {
        if(!visited[adjList[node][i]]) {
            useDfs(adjList, adjList[node][i], visited);
        }
    }
}


//////////////////* 2. 행렬 그래프 *///////////////////
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
// 2-1. 넓이우선 접근
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
// 2-1. 깊이우선 접근
function useDfs(adjMatrix, node, visited) {
    visited[node] = true;
    for(let i=0; i<adjMatrix[node].length; i++) {
        if(adjMatrix[node][i] === 1 && !visited[i]) {
            useDfs(adjMatrix, i, visited);
        }
    }
}
