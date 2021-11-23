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
        return (this.checkVertex(src) && this.checkVertex(dst)) ? 
        this.list[src].indexOf(dst) : -2;
	}

	connectEdge(vertex1, vertex2) {
		if (this.checkEdge(vertex1, vertex2) === -1) this.list[vertex1].push(vertex2);
		if (this.checkEdge(vertex2, vertex1) === -1) this.list[vertex2].push(vertex1);
	}

	cutOffEdge(vertex1, vertex2) {
        const index1 = this.checkEdge(vertex1, vertex2);
        const index2 = this.checkEdge(vertex2, vertex1);

        index1 < 0 ? vertex1 : this.list[vertex1].splice(index1, 1);
        index2 < 0 ? vertex2 : this.list[vertex2].splice(index2, 1);
	}

	deleteVertex(vertex) {
        if (!this.checkVertex(vertex)) return;
        
        for (let key in this.list) {
            if (this.checkEdge(vertex, key) >= 0) this.cutOffEdge(vertex, key);
        }
        delete this.list[vertex];
	}
}
/*
    풀이
    1. 모든 정점이 키로 저장되어야 하기 때문에 list에 빈 Object 할당해 선언한다.

    2. list에 정점을 추가 시 존재여부를 먼저 체크해야하므로 checkVertex()를 먼저 구현한다.
    
    3. addVertex()는 checkVertex()로 list를 체크하고 정점과 빈 배열을 키-값으로 할당한다.
    
    4. checkEdge()도 connectEdge()보다 먼저 구현되어야 간선체크가 된다.
        4-1. 간선을 이을 두 정점이 존재하는지 checkVertex()로 탐색한다. 
        4-2. vertex가 존재 시 incdexOf로 인덱스를 리턴하고 아닐 경우 바로 -2를 리턴한다.
    
    5. connectEdge()로 간선을 추가 시 checkEdge()로 -1이 리턴되면 간선을 추가한다.
        5-1. 무방향 그래프이기 때문에 정점을 바꿔서도 호출해야 한다. 방향이면 한번만
    
    6. cutOffEdge()는 checkEdge() 에서 예외처리가 되어있어 리턴 값을 활용하면 된다.
        6-1. 무방향 구현이기 때문에 두 정점의 key를 바꾸면서 인접 정점의 인덱스를 가져온다.
        6-2. 인접정점의 인덱스가 0이상이면 splice로 인접정점을 제거한다.
    
    7. deleteVertex()의 경우 단순히 정점만 지워야 하는게 아닌 간선이 모두 제거 되어야 한다.
        7-1. 간선을 제거하기전 checkEdge()를 호출할 때 checkVertex()도 호출된다.
        7-2. 따라서, 만일 정점을 먼저 제거하면 간선체크가 불가능해 간선이 남게된다.
        7-3. list를 루프하면서 해당키를 인접정점으로 가진 간선을 모두 제거한다.
        7-4. list에서 정점을 제거한다.

    리팩토링
    1. connectEdge(), cutOffEdge(), deleteVertex() 모두 checkEdge()를 호출하는데 반복적으로 cehckVertex()를 사용한다.
    2. checkEdge()에 checkVertex(src) checkVertex(dst) 를 추가해 세 메서드에서 반복사용을 제거한다.
*/