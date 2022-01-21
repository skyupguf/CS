/*

*/
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
    const stack = [from];
    const adjMatrix = JSON.parse(JSON.stringify(matrix));
    
    let index = 0;
    while (stack.length) {
        let vertex = stack[stack.length-1];
        let edge = adjMatrix[vertex][index];
        adjMatrix[vertex][index] = 0;

        if (edge) {
            if(index === to) return true;
            stack.push(index), index = -1;
                
        } else if (index === adjMatrix[vertex].length - 1) {
            stack.pop(), index = -1;
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

//  리팩토링1(재귀)
const checkValidRoute = (matrix, from, to) => {
    const visited = {};

    function useDfs(src) {
        if (src === to) return true;
        visited[src] = true;
        
        let check;
        for (let v=0; v<matrix[src].length; v++) {
            let edge = matrix[src][v];
            if (edge && !visited[v]) check = useDfs(v);
        }
        return check ? true : false;
    }
    return useDfs(from);
}
/*
    풀이
    1. 처음 코드는 row재탐색과 행렬복사로 시간 복잡도가 크게 증가한다.
        1-1. while문은 중간에 탐색이 완료되지 않은 row로 돌아왔을 때 다시 0부터 재탐색하는 반복을 한다.
        1-2. 방문한 정점에 0을 할당하기 위해 인접행렬을 복사하는데 걸리는 소요시간이 크다.
    
    2. 방문처리할 visited를 object를 할당해 선언하고 재귀호출을 위한 내부함수 useDfs를 선언한다.
        2-1. 재귀호출이 됐을 때 탈출조건인 src === to 는 함수안 최상단에 배치하고 시작정점 src를 visited에 true로 방문처리한다.
        2-2. 재귀호출된 리턴값을 할당할 check변수를 빈 상태로 선언하고 src노드인 row를 루프한다.
        2-3. 간선이 존재하는지 확인하고 방문처리가 되어있지 않을 경우 check에 src를 간선이 존재하는 정점으로 재귀호출하며 할당한다.
        2-4. check가 undefined거나 false면 false를 아닐경우 true를 리턴한다.

    시간복잡도
    앞선 코드처럼 인접행렬을 복사하지도 생성하지도 않으며, 인접행렬의 row를 index=0부터 재탐색하지도 않는다.
    row를 전부 순회하고 false일 경우 최악인 경우 O(N^2)이므로 처음 코드보다 효율적이다.
*/

//  리팩토링2(큐)
const checkValidRoute = (matrix, from, to) => {
    const queue = [from];
    const visit = new Array(matrix.length).fill(false);
    visit[from] = true;
  
    while (queue.length) {
        const row = queue.shift();
        if (row === to) return true;
  
        for (let col=0; col<matrix[row].length; col++) {
            
            if (matrix[row][col] && !visit[col]) {
                queue.push(col);
                visit[col] = true;
            }
        }
    }
    return false;
}
/*
    풀이
    1. stack으로 인덱스 초기화를 없애기 위해 재귀를 활용했다면 큐로는 단순루프로도 구현이 가능하다.
        1-1. 큐를 활용하는 주 원리는 정점 row를 탐색할 때, 간선을 만날 때 마다 해당 row로 이동했다 다시 돌아오지 않는 것이다.
        1-2. 탐색중인 정점의 row에 존재하는 간선을 먼저 모두 큐에 할당하고 먼저 들어온 정점부터 간선 탐색을 한다.
        1-3. 시작정점 from의 간선을 시작으로 하면 몇 번째 정점과 연결된 간선을 먼저 탐색하든지 크게 상관이 없기 때문이다.
        1-4. 즉, 리팩토링1의 경우가 DFS(깊이우선탐색)라면 큐를 이용한 탐색은 BFS(넓이우선탐색)인 것이다.
    
    2. 큐를 선언하고 시작정점을 push한다, 그리고 방문처리 배열을 생성한다.
        2-1. 큐의 작업처리가 완료되면 루프를 종료해야 하므로 시작정점인 from을 push한다.
        2-2. 다만 스택과 달리 아직 방문하지 않은 정점을 큐에 push하기 때문에 정점을 방문처리할 배열 visit을 생성한다.
        2-3. visit은 각 정점의 수 만큼 원소를 생성하고 false를 할당한 후 시작정점인 visit[from]만 true로 변경한다.
    
    3. while루프는 스택구현과 크게 다르지 않고 방문처리만 설정해 준다.
        3-1. 현재 탐색할 row를 큐에서 꺼내고 우선 to와 비교해서 같으면 true를 리턴시킨다.
        3-2. row를 루프하면서 간선1이 존재하고 방문처리가 false인 정점일 때의 col을 큐에 push한다.
        3-3. 큐에 추가된 정점은 visit에서 마찬가지로 true로 방문처리를 해 재방문 또는 자기루프가 되지 않도록 한다.
    
    시간복잡도
    재귀구현과 다르지 않고 to의 위치에 따라, 탐색 속도가 달라진다.
*/