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
const checkValidRoute = (matrix, from, to) => {
    const visited = [from];
    const adjMatrix = JSON.parse(JSON.stringify(matrix));
    
    let index = 0;
    while (visited.length) {
        let vertex = visited[visited.length-1];
        let edge = adjMatrix[vertex][index];
        adjMatrix[vertex][index] = 0;

        if (edge) {
            if(index === to) return true;
            visited.push(index), index = -1;
                
        } else if (index === adjMatrix[vertex].length - 1) {
            visited.pop(), index = -1;
        } 
        index++;
    }
    return false;
}
/*
    풀이
    1. 정점의 진출 차수 간선이 존재하는 순서대로 하나 씩 찾아 나가야 한다.
        1-1. 예를 들어, from이 3이면 행렬의row3의 0번째 2번째에 간선 1이 있으면 우선 0번째 정점인 행렬의row0으로 이동한다.
        1-2. 0번째 row에서 간선 1이 있는 인덱스의 row로 또 이동하는 도중 인덱스가 to면 바로 true를 리턴한다.
        1-3. matrix의 row를 전부 이동해도 to를 못찾으면 이전 row로 돌아가서 다음 간선 1을 찾아야 한다.
        1-4. to를 못찾은 경우 다시 row3으로 돌아오면 이제 2번째 간선 1이 to인지 확인하고 전부탐색이 끝나면 false를 리턴한다.
    
    2. 나중에 인접한 노드인 row를 먼저 전부 탐색해야 하므로 재귀 또는 스택을 활용한다.
        2-1. 먼저 시작정점인 row를 탐색하기 위해 stack에 from을 push한다.
        2-2. 루프는 불규칙이기 때문에 외부에서 인덱스를 선언하고 0을 할당해 while문으로 루프한다.
        2-3. 루프는 stack에 노드를 하나씩 쌓아서 탐색하기 때문에 stack이 비면 탈출하도록 한다.
    
    3. 스택의 노드를 가져와 간선을 찾고 간선이 이어진 노드를 다시 스택에 추가하여 탐색한다.
        3-1. 먼저 탐색할 정점을 스택배열의 마지막에서 가져오고 index를 증가하면서 해당 row를 탐색한다.
        3-2. row를 탐색할 때 탐색한 col을 다시 돌아와서 재방문하지 않도록 0을 할당한다.
        3-3. 간선이 존재하면 우선 해당 간선이 to일 경우 true를 리턴한다.
        3-4. to가 아닐 경우 해당 정점을 스택에 push하고 인덱스를 0으로 초기화 시킨다.
        3-5. 그럼 다시 스택에 추가된 정점의 row를 0번째 부터 탐색, 위를 반복한다.
    
    4. row를 전부 탐색해도 to를 발견하지 못하거나 간선이 없는 경우도 처리해야 한다.
        4-1. 스택에 추가한 정점의 row를 모두 탐색해도 to로 이어지는 간선이 없는 경우, 해당 정점 탐색을 완료해야 한다.
        4-2. 스택에서 해당 노드를 pop으로 제거하고 이전 정점을 row끝까지 다시 탐색해야 하므로 index를 초기화 한다.
        4-3. 앞서 탐색한 col은 전부 0을 할당했기 때문에 해당 간선의 정점을 재방문 하진 않는다.
    
    5. 정점을 모두 탐색해 스택의 길이가 0이 되도록 to가 없으면 루프를 종료하고 false를 리턴한다.

    에러핸들링
    1. 인자로 전달받은 matrix를 새로운 변수에 깊은복사하여 col을 0을 할당해도 원본이 변경되지 않도록 한다.

    시간복잡도
    JSON으로 복사를 한 행렬을 직접 복사로 구현할 경우 O(N^2)의 시간이 소요된다.
*/
