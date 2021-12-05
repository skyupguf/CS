//  문제요약
//  1. BFS와 DFS로 그래프를 탐색하는 자료구조를 구현하라.
//  2. 리스트와 행렬 둘 다 구현해보기
//  3. 멤버변수 : 리스트의 경우 정점의 간선을 할당할 Object, 행렬의 경우 행렬을 생성할 Array
//  4. 메서드
//      4-1. 정점의 존재여부를 체크한다.
//      4-2. 정점을 추가할 수 있어야 한다.
//      4-3. 간선의 존재여부를 체크한다.
//      4-4. 간선을 추가할 수 있어야 한다.
//      4-5. 정점을 제거할 수 있어야 한다.
//      4-6. 간선을 제거할 수 있어야 한다.
//      4-7. BFS로 정점을 탐색할 수 있어야 한다.
//      4-8. DFS로 정점을 탐색할 수 있어야 한다.

//  인접리스트 코드
class AdjacencyList {
    constructor() {
        this.list = {};
    }

    checkVertex(vertex) {
        return !!this.list[vertex];
    }

    addVertex(vertex) {
        this.checkVertex(vertex) ? vertex : this.list[vertex] = {};
    }

    checkEdge(src, dst) {
        return !!this.list[src][dst];
    }

    connectEdge(src, dst, weight) {
        if (!this.checkVertex(src) && !this.checkVertex(dst)) return;
        this.list[src][dst] = weight ? weight : 1;
    }

    deleteEdge(src, dst) {
        if (!this.checkEdge(src, dst)) return;
        delete this.list[src][dst];
    }

    deleteVertex(vertex) {
        if (!this.checkVertex(vertex)) return;
        for (let src in this.list) this.deleteEdge(src, vertex);
        delete this.list[vertex];
    }

    traverseToBfs(src) {
        if (!this.checkVertex(src)) return;
        const queue = [src], visited = {};

        while (queue.length) {
            let now = queue.shift();
            
            if (!visited[now]) {
                visited[now] = true;
                console.log(`traversal sequence : ${now}`);

                for (let adjVertex in this.list[now]) {
                    queue.push(adjVertex);
                }
            }
        }
    }

    traverseToDfs(src) {
        if (!this.checkVertex(src)) return;
        const visited = {};

        function useDfs(src) {
            visited[src] = true;
            console.log(`traversal sequence : ${src}`);

            for (let adjVertex in this.list[src]) {
                if (!visited[adjVertex]) Dfs(adjVertex);
            }
        }
        useDfs(src);
    }
}