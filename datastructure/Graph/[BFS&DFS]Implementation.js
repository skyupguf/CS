//  문제요약
//  1. BFS와 DFS로 그래프를 탐색하는 자료구조를 구현하라.
//  2. 인접리스트와 인접행렬로 모두 구현해보기
//  3. 멤버변수 : 인접리스트의 경우 정점의 간선을 할당할 Object, 행렬의 경우 인접행렬을 생성할 Array
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
        if (!this.checkVertex(src) || !this.checkVertex(dst)) return;
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

        function useDfs(src, list) {
            visited[src] = true;
            console.log(`traversal sequence : ${src}`);

            for (let adjVertex in list[src]) {
                if (!visited[adjVertex]) useDfs(adjVertex, list);
            }
        }
        useDfs(src, this.list);
    }
}
/*
    풀이
    1. this.list에 {}를 할당해 인접리스트를 생성할 멤버변수를 선언한다.

    2. 정점과 간선을 체크하고 생성하는 메서드를 생성한다.
        2-1. checkVertex(vertex)로 인접리스트에 키-값이 존재하는지 확인하고 boolean으로 리턴한다.
        2-2. addVertex(vertex)로 checkVertex()로 정점이 존재하는지 확인하고 없을 경우 list에 키로 vertex를 값으로 {}를 할당한다.
        2-3. checkEdge(src, dst)로 정점이 되는 src가 list에서 dst를 값으로 가지는지 boolean으로 리턴한다.
        2-4. connectEdge(src, dst, weight)에서 두 정점의 존재를 확인하고 weight가 undefined면 list[src][dst] = 1을 할당한다.
    
    3. 간선과 정점을 삭제할 수 있어야 한다.
        3-1. deleteEdge(src, dst)에서 checkEdge로 간선이 존재하는지 확인하고 존재할 경우 delete list[src][dst]로 삭제한다.
        3-2. deleteVertex(vertex)에서 정점이 존재하는지 확인하고 list를 루프한다.
        3-3. vertex를 간선으로 가진 키에서 vertex값을 제거한다. 그리고 마지막으로 delete list[vertex] 정점삭제를 한다.
    
    4. BFS로 정점을 전체 순회한다.
        4-1. traverseToBfs(src)에서 우선 정점 src가 존재하는지 확인하고 queue를 선언하고 src를 push한 배열을 할당한다.
        4-2. 방문체크를 할 visited = {}를 선언하고 while루프를 큐가 빌 때 동안 루프하도록 조건설정을 한다.
        4-3. 루프안에서 큐의 가장 앞의 정점을 인출해 now변수에 할당하고 해당 정점이 방문처리를 한다.
        4-4. list[now]를 루프하면서 간선이 존재하는 모든 정점을 queue에 push한다.
        4-5. 위 과정을 queue가 빌 때 까지 반복한다.
    
    5. DFS로 정점을 전체 순회한다.
        5-1. traverseToDfs(src) 정점확인하고 visited = {} 로 방문처리한다.
        5-2. 내부함수를 useDfs를 선언해 인자로 src와 list를 전달받아 시작정점을 우선 방문처리 한다.
        5-3. 시작 정점을 list에서 루프하면서 방문처리되지 않은 정점을 만나면 해당 정점을 useDfs(해당정점, list) 재귀호출한다.
        5-4. useDfs를 호출할 때 this.list를 인자로 전달하지 않으면 내부함수는 this가 list를 가리키지 않으므로 찾을 수 없다.
    
    시간복잡도
    인접리스트는 BFS, DFS 전부 탐색되는 V + E 만큼의 시간복잡도를 가진다.
*/

//  인접행렬 코드
class AdjacencyMatrix {
    constructor() {
        this.matrix = [];
    }

    checkVertex(vertex) {
        return !!this.matrix[vertex];
    }

    addVertex(vertex) {
        if (this.checkVertex(vertex)) return;
        const size = this.matrix.length;
        this.matrix.forEach(row => { row.push(0) });
        this.matrix.push(new Array(size+1).fill(0));
    }

    checkEdge(src, dst) {
        return (this.checkVertex(src) && this.checkVertex(dst)) ?
        this.matrix[src][dst] : undefined;
    }

    connectEdge(src, dst, weight) {
        if (isNaN(this.checkEdge(src, dst))) return;
        this.matrix[src][dst] = weight ? weight : 1;
    }

    deleteEdge(src, dst) {
        if (isNaN(this.checkEdge(src, dst))) return;
        this.matrix[src][dst] = 0;
    }

    deleteVertex(vertex) {
        if (!this.checkVertex(vertex)) return;
        this.matrix.pop();
        this.matrix.forEach(row => { row.pop() });
    }

    traverseToBfs(src) {
        if (!this.checkVertex(src)) return;
        const queue = [src], visited = {};

        while (queue.length) {
            let now = queue.shift();
            let row = this.matrix[now];

            console.log(`traversal sequence : ${now}`);
            for (let col=0; col<row.length; col++) {

                if (row[col] && !visited[col]) {
                    queue.push(col), visited[col] = true;
                }
            }
        }
    }

    traverseToDfs(src) {
        if (!this.checkVertex(src)) return;
        const visited = {};

        function useDfs(src, matrix) {
            let row = matrix[src];
            visited[src] = true;
            console.log(`traversal sequence : ${src}`);
            
            for (let col=0; col<row.length; col++) {
                if (row[col] && !visited[col]) useDfs(col, matrix)
            }
        }
        useDfs(src, this.matrix);
    }
}
/*
    풀이
    1. 행렬을 할당할 멤버변수 this.matrix = []를 선언한다.

    2. 정점과 간선을 체크하고 추가할 수 있어야 한다.
        2-1. checkVertex(vertex)에서 정점에 해당하는 row가 존재하는지 matrix[vertex]로 확인하고 boolean을 리턴한다.
        2-2. addVertex(vertex)에서 정점 존재확인 후 matrix의 모든 row에 0을 push, size+1된 배열생성 후 matrix에 push한다.
        2-3. checkEdge(src, dst)는 행렬에서 없는 인덱스 탐색 시 에러가 출력되므로 정점확인 간선을 리턴한다.
        2-4. connectEdge(src, dst, weight) 를 인자로 받는다.
        2-5. checkEdge를 호출해 리턴이 숫자가 아니면 undefined를 리턴하고 weight가 존재하지 않으면 1을 간선으로 추가한다.
    
    3. 간선과 정점을 제거할 수 있어야 한다.
        3-1. deleteEdge(src, dst)도 간선확인 후 숫자일 경우 0을 할당한다.
        3-2. deleteVertex(vertex)는 정점확인 후 마지막 row를 제거하고 각 row의 마지막 col을 제거한다.
    
    4. BFS로 정점을 전체 순회한다.
        4-1. checkVertex(vertex)로 정점이 존재하는지 부터 확인하고 없으면 바로 리턴한다.
        4-2. 큐에 정점을 push하고 방문 객체를 를 변수에 할당한다.
        4-3. while문을 큐가 빌 때까지 루프하며 탐색할 현재 정점 now에 queue.shift()한다.
        4-4. now정점인 row를 루프하면서 간선이 존재하고 방문처리가 안된 col을 큐에 push하고 visited에 방문처리 한다.
    
    5. DFS로 정점을 전체 순회한다, mtarix[src]를 순회하는걸 제외하고 인접리스트와 구현이 동일하다.
*/