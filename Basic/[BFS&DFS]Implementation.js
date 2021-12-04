class DirectedGraph {
    constructor() {
      this.edges = {};
    }
    // 정점 추가
    addVertex(vertex) {
      this.edges[vertex] = {};
    }
  
    // 간선 추가
    addEdge(originVertex, destVertex, weight) {
      if (weight === undefined) {
        weight = 0;
      }
      this.edges[originVertex][destVertex] = weight;
    }
  
    // BFS (너비 우선 탐색, 큐를 이용)
    traverseBFS(startVertex) {
      console.log(`BFS`);
      const queue = [];
      const visited = {};
      queue.push(startVertex);
  
      while (queue.length) {
        let vertex = queue.shift();
        if (!visited[vertex]) {
          visited[vertex] = true;
          console.log(`방문한 노드 : ${vertex}`);
          for (let adjacentVertex in this.edges[vertex]) {
            queue.push(adjacentVertex);
          }
        }
      }
      console.log(`----------------`);
    }
  
    // DFS
    traverseDFS(vertex) {
      const visited = {};
      this._traverseDFS(vertex, visited);
    }
    _traverseDFS(vertex, visited) {
      visited[vertex] = true;
      console.log(`방문한 노드 : ${vertex}`);
      for (let adjacentVertex in this.edges[vertex]) {
        if (!visited[adjacentVertex]) {
          this._traverseDFS(adjacentVertex, visited);
        }
      }
    }
  }