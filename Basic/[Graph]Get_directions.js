//  문제요약
//  1. 인접행렬 matrix, 시작정점 from, 도착정점 to가 입력으로 주어진다.
//  2. from 노드부터 to 노드까지 간선이 이어져 있는지 확인하는 함수를 구현하라
//  3. matrix = [
//       [0, 1, 0, 0],
// 	     [0, 0, 1, 0],
// 	   	 [0, 0, 0, 1],
// 	   	 [0, 1, 0, 0]
//     ], from = 0, to = 2, return true

//  코드
const checkValidEdge = (matrix, from, to) => {
    const visited = [];
    const adjMatrix = JSON.parse(JSON.stringify(matrix));
    const fixedRow = adjMatrix[from];
    
    for (let col=0; col<fixedRow.length; col++) {
        let edge = fixedRow[col];
        
        if (edge) {
            if (col === to) return true;
            visited.push(col);
            
            let index = 0;
            while (visited.length) {
                let curVertex = visited[visited.length-1];
                edge = adjMatrix[curVertex][index];
                adjMatrix[curVertex][index] = 0;

                if (edge) {
                    if(index === to) return true;
                    visited.push(index), index = -1;
                
                } else if (index === adjMatrix[curVertex].length - 1) visited.pop(), index = -1;
                index++;
            }
        }      
    }
    return false;
}
/*
    풀이
    1. 시작 정점인 from의 진출 차수만큼 탐색이 이루어져야 한다.
        1-1. matrix[from][i]가 1인 경우를 고정해 놓고 탐색하며, 루프가 종료되도 없을 경우 false 다.
        1-2. 
    
    2. 
*/