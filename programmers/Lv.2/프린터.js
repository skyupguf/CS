//  문제요약
//  1. 길이가 1~100 사이인 priorities배열에 1~9 사이의 원소들이 존재한다.
//  2. 원소를 차례대로 꺼내서 인쇄대기에 들어가는데 만일 중요도가 높은 원소가 뒤에 존재하면 꺼낸 원소를 가장 뒤로 미룬다.
//  3. location은 선택한 원소의 인덱스를 나타내며 location에 위치한 원소가 몇 번째로 인쇄 되는지 구하라.
//  4. priorities = [1, 1, 9, 1, 1, 1], location = 0, return 5

//  코드#1
const findOrderOfDoc = (priorities, location) => {
    const order = [] 
    let max = Math.max(...priorities), i = location;

    while(priorities.length > 0) {
        let check = priorities.shift();
        
        if(i === 0) {
            if(check < max) priorities.push(check), i = priorities.length-1;
            else return order.length+1;
        } else {
            check < max ? priorities.push(check) 
                : order.push(check), max = Math.max(...priorities);
            i--;
        }
    }
}
/*
    풀이#1
    1. priorities에서 최대값을 구해 max변수에 할당한다.
    2. order변수를 선언하고 프린트된 원소를 삽입할 배열을 할당한다.
    3. 원소가 반드시 리턴되기 때문에 while문을 조건없이 순회한다.
    4. priorities배열에서 가장 앞의 요소를 shift해 check변수에 할당한다.
    5. while문이 한 번 순회할 때 배열이 원소가 하나 앞으로 이동하기 때문에 location-1을 한다.
    6. location이 0이거나 location에 해당하는 인덱스가 0에 도달하고 max와 check를 비교한다.
    7. max보다 작을 경우 priorities에 check를 push하고 location을 priorities.length-1으로 변경한다.
    8. max와 같을 경우 곧바로 order.length+1을 리턴한다.
    9. location이 0이 아닐 경우 check < max를 하고 true일 경우 priorities에 check를 push한다.
    10. 아닐경우 order배열에 check를 push하고  max값을 남은 priorities에서 다시 구한다.
    11. 그리고 location-1을 해 location을 갱신한다.

    시간복잡도
    while문 안의 메소드들이 priorities while루프마다 수행되지 않기 때문에 O(N^2)이 될 수 없다. O(N)
    다만 Math.max를 원소 하나가 order로 push될 때 마다 발생하기 때문에 이를 개선하면 연산 수를 더 줄일 수 있을 것 같다.
*/

//  코드#2
function solution(priorities, location) {
    var arr = priorities.map((priority, index) => {
        return {
            index: index, priority: priority
        };
    });

    var queue = [];

    while(arr.length > 0) {
        var firstEle = arr.shift();
        var hasHighPriority = arr.some(ele => ele.priority > firstEle.priority);
        if (hasHighPriority) {
            arr.push(firstEle);
        } else {
            queue.push(firstEle);
        }
    }

    return queue.findIndex(queueEle => queueEle.index === location) + 1;
}