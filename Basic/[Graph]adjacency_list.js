//  문제요약
//  1. 비가중치 그래프를 인접리스트로 구현하라
//  2. 멤버변수 : 정점과 간선을 담을 수 있는 Object
//  3. 메서드
//		3-1. 정점을 추가할 수 있어야 한다.
// 		3-2. 정점의 존재를 확인할 수 있어야 한다.
// 		3-3. 간선을 추가할 수 있어야 한다.
//		3-4. 간선의 존재를 확인할 수 있어야 한다.
// 		3-5. 간선을 삭제할 수 있어야 한다.
//		3-6. 정점을 삭제할 수 있어야 한다.
//  4. 무향으로도 구현해 보자.

//  코드
class AdjacencyList {
	constructor() {
		this.list = {};
	}

    checkVertex(vertex) {
		return !!this.vertices[vertex];
	}

	addVertex(vertex) {
        this.checkVertex(vertex) ? vertex : this.list[vertex] = [];
	}

    checkEdge(src, dst) {
		return this.checkVertex(src) ? this.list[src].indexOf(dst) : false;
	}

	connectEdge(vertex1, vertex2) {
		if (!this.checkVertex(vertex1) || !this.checkVertex(vertex2)) return;
		if (this.checkEdge(vertex1, vertex2) === -1) this.list[vertex1].push(vertex2);
		if (this.checkEdge(vertex2, vertex1) === -1) this.list[vertex2].push(vertex1);
	}

	cutOffEdge(vertex1, vertex2) {
		if (!this.checkVertex(vertex1) || !this.checkVertex(vertex2)) return;

        let index1 = this.checkEdge(vertex1, vertex2);
        let index2 = this.checkEdge(vertex2, vertex1);

        index1 === -1 ? vertex1 : this.list[vertex1].splice(index1, 1);
        index2 === -1 ? vertex2 : this.list[vertex2].splice(index2, 1);
	}

	deleteVertex(vertex) {
        for (let key in this.list) {
            if(this.checkEdge(vertex, key) !== -1) this.cutOffEdge(vertex, key);
        }
		if (this.checkVertex(vertex)) delete this.list[vertex];
	}
}
/*
    풀이
    1. 
*/