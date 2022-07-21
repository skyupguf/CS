/*
//  문제요약  //
    1부터 N까지 1씩 증가하는 수열이 무작위로 저장된 큐를 빈 스택을 이용하여 새로운 큐에 오름차순정렬하고자 할 때 가능여부를 리턴하라.

    1. 각 자료구조는 해당 메서드만 사용가능하다. ex) 큐는 pop메서드를 사용할 수 없다.
    
    2. 아웃풋 예시
        a. q = [1, 2, 3] => [1, 2, 3] output true
        b. q = [2, 1, 3] => [1, 2, 3] output true
        c. q = [3, 1, 2] => [1, 2, 3] output true
        d. q = [3, 2, 1] => [1, 2, 3] output true
        e. q = [2, 3, 1] => [1, 3, 2] output false
        f. q = [1, 3, 2, 4, 5] => [1, 2, 3, 4, 5] output true
        g. q = [1, 4, 5, 3, 2] => [1, 2, 3, 5, 4] output false


//  접근방법  //
    스택은 뒤에서 pop으로 추출된 요소가 큐에 삽입되므로 기본적으로 내림차순을 유지해야 한다.
    새 큐를 오름차순을 만들기 위해 1이 스택에 삽입되기전 까지 스택의 모든 요소들은 새로운 큐에 삽입될 수 없다.
    
    1이 삽입되고 나면 다음 수는 2가 되고 이후엔 3이 된다. 이를 now라는 변수로 놓고 큐에 삽입이 될 경우 1씩 누적한다.
    now가 stack에 없는데 stack길이가 2이상에 내림차순이 아니면 오름차순 정렬에 실패한다. ex) [4, 5], 1이 이후에 나와도 5가 먼저 pop된다.
    
    위 조건을 q가 빈 큐가 될 때까지 반복하여 false가 리턴되는 상황을 조건으로 찾아내고
    q가 비게 될 경우 루프가 종료되면 검증을 통해 true가 리턴되도록 한다.
*/

/*  코드  */
const checkSortedSeq = (arr) => {
    let now = 1;
    const stack = [arr.shift()], queue = [];

    while (arr.length) {
        if (stack[stack.length-1] === now) queue.push(stack.pop()), now++
        else if (stack[stack.length-1] < arr[0]) return false;
        else stack.push(arr.shift());
    }
    while (stack.length) queue.push(stack.pop()), now++;
    if (queue[queue.length-1] !== now-1) return false;
    return true;
}
/*
    1. now변수를 선언하고 1을 할당해 새 큐에 오름차순 정렬할 수를 찾는 역할을 한다.
    2. stack변수에 arr[0]를 삽입해 할당하고 최종 정렬될 큐인 queue변수에 빈 배열을 할당한다.
    3. arr의 모든 요소를 shift할 때까지 요소를 탐색해야 하므로 while문을 활용한다.
    
    4. 조건에 따라 stack과 queue에 데이터가 이동하는 메커니즘을 설계한다.
        4-1. 최우선으로 now는 확인이 되면 queue에 삽입되어야 하므로 stack의 마지막 요소에 now가 존재하는지 확인하고 누적한다.
        4-2. stack에 데이터가 now보다 클 경우 내림차순이 아니면 정렬은 불가능하므로 스택의 마지막요소 < arr[0]면 false를 리턴한다.
        4-3. 위의 모든 경우에 해당되지 않으면 stack에 arr[0]를 push하여 정렬작업을 계속한다.
    
    5. arr이 빈 큐가 되면 stack에 남아있는 모든 요소들을 queue에 push하고 now를 1씩 누적한다.
    6. 완성된 now가 queue의 마지막 요소와 동일한지 검증을 한다.
*/
/*
//  문제요약  //
    이번엔 정수가 수열이 아닌 무작위로 나열된 큐일 경우로 정렬여부를 판단하라.
    
    1. 아웃풋 예시
        a. q = [4, 1, 5, 6, 7] => [1, 4, 5, 6, 7] output true
        b. q = [4, 1, 7, 6, 5] => [1, 4, 5, 6, 7] output true
        c. q = [4, 1, 6, 3, 2] => [1, 4, 2, 3, 6] output false


//  접근방법  //
    가장 앞의 수가 1로 고정되어 있지 않으므로 now변수는 필요하지 않으며, 요소간 대소비교를 통해 오름차순 요소를 찾아야 한다.
    큐에서 shift를 통해 가장 앞의 요소를 추출하고 스택에 추가한다고 생각해보자.
    스택이 비어있으면 첫 요소는 삽입되고 두 번째 요소부터는 먼저 삽입된 요소보다 작아야 내림차순 정렬이 된다.
    이를 토대로 조건을 구성해보면
    1. stack.length === 0 이면 q[0]를 stack에 삽입한다.
    2. stack[stack.length-1] > q[0] 이면, 스택에 push한다.
    3. stack[stack.length-1] < q[0] 이면, q[0]보다 큰 요소가 존재할 때까지 pop하여 새 큐에 push하고 q[0]를 스택에 push한다.
    4. q가 전부 비었을 경우 stack의 모든 요소를 새 큐에 push한다.

    그렇다면 정렬의 가능여부는 어떻게 따져야 하나?
    위 조건에 따라 새 큐에 데이터가 삽입되어 있는 경우는 스택에 있는 요소값보다 무조건 작은 경우이다.
    이 때, 새로운 값을 스택에 삽입하려 할 때 이 값이 스택의 마지막 요소보다 작고 새 큐의 마지막 요소보다도 작으면 정렬불가가 되는 것이다.
    q = [7, 8, 5] => 
    q = [8, 5], stack = [7],    s = []
    q = [5],    stack = [8],    s = [7]
    q = [],     stack = [8, 5], s = [7] 정렬불가

    q = [5, 8, 7] => 
    q = [8, 7], stack = [5],    s = []
    q = [7],    stack = [8],    s = [5]
    q = [],     stack = [8, 7], s = [5]
    q = [],     stack = [],     s = [5, 7, 8] 정렬가능

    따라서, 큐에서 추출한 값을 스택의 마지막 요소와 새로운 큐의 마지막요소와 비교하는 것이 핵심이다.
*/

/*  코드  */
const checkSortable = (arr) => {
    let store;
    const stack = [arr.shift()], queue = [];
    
    while (arr.length) {
        store = arr.shift();

        if (queue[queue.length-1] > store) return false;
        while (stack[stack.length-1] < store) queue.push(stack.pop());
        if (!stack.length || stack[stack.length-1] >= store) stack.push(store);
    }
    while (stack.length) queue.push(stack.pop());
    return true;
}
/*
    1. store변수를 선언한다. arr의 가장 앞 요소를 추출해 스택과 새 큐의 요소와 비교할 역할을 한다.
    2. stack 변수를 선언하고 arr에서 shift한 요소를 삽입한 배열을 할당한다. 새 큐인 queue 배열도 선언한다.

    3. arr의 모든 요소가 제거될 때까지 루프한다.
        3-1. 선언해둔 store변수에 arr.shift로 arr[0]를 할당한다.
        3-2. stack에서의 작업전 queue에 데이터가 존재할 경우 마지막 요소가 store보다 크면 정렬이 불가하므로 바로 false를 리턴한다.
        3-3. 정렬이 가능하면 stack의 마지막 요소와 store를 비교한다.
            a. store가 더 클 경우 stack의 요소가 store이상이 되거나 stack이 빌 때 까지 queue에 push한다.
            b. store가 작거나 같을 경우 또는 stack이 비어있을 경우 stack에 store를 push한다.
        3-4. arr이 빈 공간이 되었다면 3-2에서 걸리지 않았으므로 정렬이 가능하다는 것을 알 수 있다.
    
    4. queue를 완성하지 않아도 판단이 가능하지만, queue를 완성시키고자 한다면 stack에 남아있는 요소를 순차로 pop하여 queue에 push한다.
*/
//  복잡도  //
//  arr의 모든 요소를 최소한 한 번은 순회하면서 shift로 추출하므로 때문에 O(N)의 시간 복잡도가 소요되며
//  arr의 모든 값을 옮겨 닮을 queue 공간이 필요하므로 O(N)의 추가공간이 필요하다.