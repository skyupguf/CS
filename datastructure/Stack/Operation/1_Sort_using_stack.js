/*
//  문제요약  //
    push와 pop메서드로 주어진 배열을 스택으로 정렬하라.

    1. 루프를 활용해 구현한다.
    
    2. 루프없이 재귀를 활용해 구현한다.

    3. stack = [8, 4, 3, 5, 1, 7]
        output => [1, 3, 4, 5, 7, 8]


//  접근방법1  //
    top위치의 값을 추출해서 순차비교로 루프한다.
    임시 변수를 추가해 비교할 요소를 추출하고 임시변수의 요소와 비교한다.
    1. [7, 1, 3, 4, 2] => []
    2. [7, 1, 3, 4] => [2]
    3. [7, 1, 3] => [2, 4]
    4. [7, 1, 4] => [2, 3]
    5. [7, 1] => [2, 3, 4]
    6. [7, 4, 3, 2] => [1]
    7. [] => [1, 2, 3, 4, 7]
*/

/*  코드  */
const sortUsingStack = (arr) => {
    const stack = [arr.pop()];

    while (arr.length) {
        let element = arr.pop();
        
        while (element) {
            if (stack[stack.length-1] > element) arr.push(stack.pop());
            else stack.push(element), element = 0;
        }
    }
    return stack;
}
/*
    1. arr배열의 마지막 요소를 pop해서 정렬을 위한 stack배열에 할당한다.

    2. arr이 빈 배열이 될 때까지 루프해야 하므로 while문을 활용한다.
        2-1. 비교할 arr요소를 pop하여 element변수를 선언해 할당한다.

    3. element는 stack에 존재하는 모든 요소를 뒤부터 차례대로 비교해야 한다.
        3-1. while문으로 element가 stack에 push될 때까지 루프 시킨다.
        3-2. stack의 마지막요소와 비교해 분기한다.
            a. 마지막요소 > element면 마지막 요소를 pop해 arr에 push한다.
            b. 반대일 경우 element를 stack에 push하고 루프를 종료하기 위해 element에 0을 할당한다.
    
    4. 루프가 종료되면 완성된 stack을 리턴한다.
*/
/*
//  접근방법2  //
    재귀가 작동하는 과정을 설계해보자.
    [7, 1, 3, 4, 2]의 스택이 존재하면 스택의 원리로 가장 앞의 요소와 그 다음 요소의 비교가 최소 단위가 된다.
    즉, basecase는 [7] 과 element = 1의 비교 삽입이 된다.
    따라서, 스택이 [7]이 남을 때가지 스택에 pop한 요소를 변수에 할당해 놓고 stack을 재귀호출한다.

    basecase에 도달하면 이제 두 수를 비교해 정렬을 해야한다.
    7 > 1 이므로 7을 pop하고 1을 할당해야 하므로 우선 7을 pop하여 변수에 할당해 놓고 1을 push해야한다.
    
    이런 비교요소가 하나라면 비교하고 바로 삽입하면 그만이지만 [1, 7] el = 3이면 3은 앞에 두 요소를 순차로 비교해야한다.
    따라서, 루프를 사용하지 않을 경우 비교를 위해 또 한번의 재귀가 필요하다. 
    만일 [3, 7] el = 1이면 빈 배열이 될 때까지 재귀해서 1을 가장 앞에 삽입해야 하므로 2번의 재귀호출이 또 필요한 것이다.
    
    따라서, stack을 basecase로 줄이는 재귀호출과 비교정렬을 위한 재귀호출을 할 두 가지 함수가 필요하다.
*/

/*  코드  */
const recursiveSort = (s, e) => {
    if (s.length === 0 || s[s.length-1] <= e) {
        s.push(e);
        return;

    } else {
        let bigger = s.pop();
        recursiveSort(s, e);
        s.push(bigger);
    }
}

const sortStack = (arr) => {
    const element = arr.pop();
    if (arr.length > 1) sortStack(arr);
    recursiveSort(arr, element);
    return arr;
}
/*
    1. arr의 요소는 배열길이가 1이 될 때까지 pop해야 한다.
        1-1. 변수 element를 선언하고 arr의 마지막 요소를 pop하여 할당한다.
        1-2. 배열길이가 1이 될 때 까지 sortStack(arr)을 재귀호출한다.
        1-3. basecase에 도달하면 현재 arr과 element를 비교 삽입할 함수 recursiveSort인자로 호출한다.

    2. 인자로 전달받은 s배열과 e요소를 정렬삽입할 basecase를 찾는다.
        2-1. 최초 전달되는 s배열의 요소는 1개로 e요소보다 작을 경우 바로 push가 가능하다.
        2-2. 만일 e요소가 더 클 경우 s를 pop하고 e를 push해야 하므로 빈배열이 될 수도 있다.
        2-3. 따라서, 위 두가지 모두 basecase에 해당되며 탈출조건이 된다.
    
    3. 위 조건에 해당되지 않는 경우 재귀호출로 basecase까지 도달해야 한다.
        3-1. 예를들어, s = [3, 7] e = 1 이면 1이 빈 배열의 가장 앞에 push되기 위해서 두 번의 재귀호출이 있어야 한다.
        3-2. 이 경우 요소 7을 pop하고 다시 3과 1을 비교해야 하므로 recursiveSort(s, e)로 재귀호출한다.
        3-3. 재귀호출값이 리턴된 값에서 pop을 해놓은 7을 push해준다.

    4. 리턴될 때 결과 값을 표시하고자 하면 arr을 리턴시켜준다.
*/
    
//  시간복잡도  //
//  루프와 재귀모두 이미 정렬된 배열이면 요소 하나당 모든 요소를 탐색 비교하게 된다. 따라서 O(N^2)의 복잡도가 된다.