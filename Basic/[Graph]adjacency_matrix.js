//  문제요약
//  1. 비가중치 그래프를 인접행렬로 구현하라.
//  2. 멤버변수 : 빈배열이 할당된 matrix
//  3. 메서드
//		3-1. 정점을 추가할 수 있어야 한다.
//		3-2. 정점을 삭제할 수 있어야 한다.
// 		3-3. 정점의 존재를 확인할 수 있어야 한다.
// 		3-4. 간선을 추가할 수 있어야 한다.
// 		3-5. 간선을 삭제할 수 있어야 한다.
//		3-6. 간선의 존재를 확인할 수 있어야 한다.

//  코드
class AdjacencyMatrix {
	constructor() {
		this.matrix = [];
	}

	addVertex(num) {
		if (typeof(num) !== 'number') return new Error('추가할 정점의 개수를 입력하세요');

		const length = this.matrix.length;
		const newRows = Array.from({length: num}, () => new Array(length + num).fill(0));
		this.matrix = this.matrix.map(row => [...row, ...new Array(num).fill(0)]);
		this.matrix = [...this.matrix, ...newRows];
	}

	deleteVertex(num) {
		if (typeof(num) !== 'number') return new Error('제거할 정점의 개수를 입력하세요');
		this.matrix = this.matrix.slice(0, -num).map(row => row.slice(0, -num));
	}

	checkVertex(vertex) {
		return !!this.matrix[vertex];
	}

	connectEdge(src, dst) {
		const range = this.matrix.length;
		if (src >= 0 && dst >= 0 && src < range && dst < range) {
			this.matrix[src][dst] = 1;
			return;	
		}
		return new Error('존재하지 않는 정점입니다');
	}

	cutOffEdge(src, dst) {
		const range = this.matrix.length;
		if (src >= 0 && dst >= 0 && src < range && dst < range) {
			this.matrix[src][dst] = 0;
			return;
		}
		return new Error('존재하지 않는 정점입니다');
	}

	checkEdge(src, dst) {
		return this.matrix[src][dst] === 1;
	}
}
/*
	풀이
	1. 인접행렬이 할당될 멤버변수 this.matrix를 빈배열로 선언한다.
	
	2. addVertex(num) 메서드는 입력받은 num개 만큼의 정점을 생성해야 한다.
		2-1. num이 숫자가 아닌 경우 에러처리한다.
		2-2. 정점이 추가될 때 마다 2차원 배열이기 때문에 전체 원소의 개수는 n^2이 된다.
		2-3. 우선 각 row의 원소를 num만큼 증가시키고 증가된 row의 길이만큼 num개의 row를 만들어 matrix에 삽입한다.
	
	3. deleteVertex(num)은 입력받은 num개 만큼의 정점을 삭제해야 한다.
		3-1. num이 숫자가 아닌 경우 에러처리한다.
		3-2. matrix에서 num만큼의 행을 제거하고 남은 각 행마다 num만큼을 원소를 제거한다.
	
	4. connectEdge(src, dst)는 해당 인덱스에 원소 1을 할당해 간선을 추가한다.
		4-1. 정점을 가리키는 값이 아니거나 범위를 벗어난 경우 에러처리한다.
		4-2. matrix[src][dst]에 1을 할당해 간선을 추가한다.
	
	5. cutOffEdge(src, dst)는 해당 인덱스에 원소 0을 할당해 간선을 삭제한다.
		5-1. 마찬가지로 에러처리를 하고 해당 인덱스에 0을 할당한다.
	
	6. checkVertex(vertex)는 matrix.length-1이하일 경우 true, checkEdge(src, dst)는 1값인지 아닌지 boolean으로 리턴

	에러핸들링
	1. 행렬길이로 존재확인으로 하면 음수값 입력시 true가 리턴됨 낫연산자를 두번 사용해서 boolean으로 변형한다.
	2. connectEdge와 cutOffEdge에서 undefined 에러처리를 안함, 조건을 덜쓰기 위해 오히려 참일 땍 값할당, 나머지 에러처리한다.
*/