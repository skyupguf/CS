/*  
//  문제요약  //
    아래와 같은 조건들이 주어질 경우 웹 브라우저의 현재 페이지 이동 상태를 구하는 함수를 작성하라.

    1. [prev, page, next] 형태의 웹브라우저가 존재한다.

    2. 입력으로 웹브라우저 행동을 담은 배열 actions와 현재 페이지를 나타내는 start가 주어진다.
        2-1. start는 현재 페이지를 문자열로 나타내며 알파벳으로 표시된다.
        2-2. actions는 길이가 100이하인 배열로 새페이지인 알파벳, -1(뒤로가기), 1(앞으로가기)의 원소들로 구성되어 있다.
    
    3. 현재 페이지 start 부터 모든 actions가 수행될 때 다음과 같은 테스트 케이스의 결과가 도출된다.
        3-1. actions = ["B", "C", -1, "D", "A", -1, 1, -1, -1], start = "A", return [["A"], "B", ["A", "D"]]
        3-2. actions = ["B", -1, "B", "A", "C", -1, -1, "D", -1, 1, "E", -1, -1, 1], start = "A", return [ ["A", "B"], "D", ["E"]]
        3-3. actions = [-1, 1], start = "A", return [[], "A", []]
*/

/*  코드  */
const activateBrowser = (actions, start) => {
    let now = start, prev = [], next = [];

    actions.forEach(page => {
        if(page === -1) prev.length ? (next.push(now), now = prev.pop()) : 0;
        else if(page === 1) next.length ? (prev.push(now), now = next.pop()) : 0;
        else prev.push(now), next = [], now = page;
    });
    return [prev, now, next];
}
/*
//  접근방법  //
    브라우저의 페이지 이동 로직을 다음과 같이 정리할 수 있다.

    1. 뒤로가기를 할 경우 현재 페이지가 next에 들어가고 prev의 페이지가 현재 페이지가 된다.
    
    2. 앞으로가를 할 경우 현재 페이지가 prev에 들어가고 next의 페이지가 현재 페이지가 된다.

    3. 새로운 페이지로 이동 시 현재 페이지가 prev에 들어가고 next는 빈 상태가 된다.

    4. prev와 next가 둘다 비어 비활성인 경우 현재 페이지는 그대로 유지된다.

    위 이동로직을 통해 prev와 next의 페이지는 후입선출로 구현되어야 함을 알 수 있다.
    따라서, 배열의 push, pop을 활용하여 stack자료구조로 구현한다.


//  수도코드  //
    1. now, prev, next변수를 선언하고 각각 start, [], []을 할당한다.

    2. actions배열을 루프하면서 각 원소에 맞는 행동을 조건으로 구현한다.
        2-1. 원소가 -1이면 prev.length를 확인하고 next.push(now), now = prev.pop()을 한다.
        2-2. 원소가 1이면 next.length를 확인하고 prev.push(now), now = next.pop()을 한다.
        2-3. 원소가 문자면 prev.push(now), now = actions[i], next = []를 한다.
    
    3. 루프가 종료되면 [prev, now, next] 형태로 리턴한다.


//  시간복잡도  //
    actions배열을 한번 루프로 종료되므로 O(N)의 시간복잡도를 가진다.
*/
