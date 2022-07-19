/*
//  문제요약  //
    주어진 배열의 중간 요소를 삭제하여 리턴하라.

    1. 추가공간 없이 구현해야 한다.
    2. push, pop, empty만 존재하는 스택구조이다.

    3. stack = [1, 2, 3, 4, 5] => output [1, 2, 4, 5]
        stack = [1, 2, 3, 4, 5, 6] => output [1, 2, 4, 5, 6]


//  접근방법  //
    인자로 전달되는 배열에서 slice나 splice와 같은 Array.prototype을 활용할 수 없으며 추가 공간도 사용할 수 없다.
    따라서, 단순 루프로 요소를 이전할 공간이 없으므로 재귀를 활용해야 한다.

    재귀로 구현하기 위해 basecase와 탈출조건을 구해야 한다.
    이 문제는 분할정복이 필요하지 않으므로 추출하려는 중간값에 도달하면 값을 추출하고 탈출시키면 된다.
    
    중간값은 배열길이/2를 했을 때, 홀수일 경우 반올리해야 한다.
    해당 길이에 도달했을 때, 요소를 제거하고 함수를 탈출 하도록 설계한다.
*/

/*  코드  */
const removeMidElement = (arr, fix) => {
    if (arr.length === fix) {
        arr.pop();
        return;
    }
    const store = arr.pop();
    removeMidElement(arr, fix);
    arr.push(store);
}

const removeMidStack = (arr) => {
    const mid = Math.ceil(arr.length/2);
    removeMidElement(arr, mid);
    return arr;
}
/*
    1. 배열의 중간요소를 제거하기 위해 배열의 중간길이와 원래길이가 필요하다.
    2. 배열이 fix에 도달했을 때 해당위치의 요소를 pop해야하며 함수의 탈출 조건이 된다.
    3. fix에 도달할 때 까지 마지막 요소를 pop하여 저장해 둔다.
*/
