/*
//  문제요약  //
    두 정점을 잇는 경로(인접, 간접)가 인접행렬 adjMatrix에 존재하는지 여부를 boolean으로 리턴하는 함수를 작성하라.

    1. 인자로 전달되는 입력은 아래와 같다.
        1-1. 그래프를 구현한 인접행렬 adjMatrix
        1-2. 시작정점 from, 도착정점 to, 두 정점은 0이상의 정수
    
    2. 테스트 케이스
        adjMatrix = [           
            [0, 1, 0, 0],       from = 0, to = 2 return true    // 정점 0은 0 -> 1 -> 2 로 연결된 방향그래프 이다.
            [0, 0, 1, 0],       from = 0, to = 3 return true    // 정점 0은 0 -> 1 -> 2 -> 3 으로 연결된 방향그래프 이다.
            [0, 0, 0, 1],       from = 3, to = 0 return false   // 정점 3은 3 -> 1 -> 2 -> 3 의 방향, 순환그래프 이다.
            [0, 1, 0, 0]
        ]
*/

/*  코드  */
const checkDirections = (adjMatrix, from, to) => {
    const queue = [from];
    const visited = {};

}
/*
//  접근방법  //
    인접관계는 정점을 인덱스로하는 adjMatrix에서 바로 찾을 수 있다. 문제는 간선이 간접적으로 연결된 경로를 찾는 것이다.
    만일 관계가 간접이라면 출발 정점부터 간선이 연결된 정점을 하나씩 확인해야 한다.

    예를 들어, 그래프가 0 -> 1 -> 2 -> 3 으로 이뤄져 있을 때 출발점이 0이고 도착점이 3일 경우 모든 정점을 탐색해야 한다.
    이 때 그래프를 연결된 간선위주로 먼저 탐색하면 DFS를 현재 정점과의 인접정점을 먼저 탐색하려면 BFS를 사용한다.
    또한, 그래프는 자기순환이나 무방향 간선으로 인한 재방문이 일어날 수 있기 때문에 방문처리를 활용해야 한다.


//  수도코드  //
    1. 우선 경로탐색에 유리한 BFS순회로 코드를 구현한다.
        1-1. 현재 탐색중인 정점을 시작점으로 하기위해 큐를 선언하고 from을 삽입한다.
        1-2. 한 번 탐색해 큐에 삽입한 정점을 재탐색하지 않도록 방문처리를 위한 객체를 선언한다.
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