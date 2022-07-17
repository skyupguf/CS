/*
//  문제요약  //
    다음 두 가지  방식으로 스택을 반전시켜라.

    1. 추가공간을 사용하지 않고 스택을 반전시켜야 한다.
    2. 재귀를 통해서 스택을 반전시켜야 한다.
    3. stack = [1, 2, 3, 4, 5] => output [5, 4, 3, 2, 1]


//  접근방법1  //
    처음과 끝 인덱스부터 인덱스를 하나씩 늘리고 줄여가면서 값을 교환하면된다.
*/

/*  코드  */
const reverseStack = (arr) => {
    const limit = arr.length / 2;
    for (let start=0; start<limit; start++) {
        let end = arr.length - 1 - start;
        [ arr[start], arr[end] ] = [ arr[end], arr[start] ];
    }
    return arr;
}
/*
    1. 홀수개나 짝수개나 절반으로 나눠지는 인덱스 이전까지만 루프를 하면된다.
    2. 시작점은 0부터 루프로 증가시키고 끝점은 시작점을 빼서 구하면 된다.
    3. 해당위치의 값을 교환하고 루프를 종료하면 arr을 리턴한다.
*/

//  시간복잡도  //
//  어떤 배열이든 절반만 루프하면 돤다. O(N/2)

/*
//  접근방법2  //
    재귀를 활용해 구현해야 한다.
    효율적이진 않지만 재귀로 루프를 대신해서 구현하는 논리를 익혀보자.
    가장 뒤의 요소를 가장 앞에 두어야 하므로 추가 배열공간이 필요하다.

    추가배열 공간에 스택의 후위 요소를 pop하고 push한 후 재귀호출을 반복한다.
*/

/*  코드  */
const reculsiveR_stack = (arr, stack = []) => {
    if (!arr.length) return;
    stack.push(arr.pop());
    reculsiveR_stack(arr, stack);
    return stack;
}
/*
    1. 추가공간 stack을 인자에 추가하낟.
    2. arr이 빈 배열이면 탈출조건으로 return한다.
    3. arr의 후위요소를 pop해 stack에 push한다.
    4. 재귀로 남은 arr과 갱신된 stack을 같이 재귀호출한다.
    5. 완성된 stack값을 리턴한다.
*/

//  시간복잡도  //
//  추가공간을 두고 루프를 하면서 반전시키는 것과 다를게 없다. 다만 함수를 추가 호출하기 때문에 루프보다 비효율적임을 알 수 있다.