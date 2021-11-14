//  문제요약
//  1. [prev=[], 현재페이지, next=[]] 형태의 웹브라우저가 존재한다.
//  2. 길이가 100이하인 actions 배열에 알파벳은 새 페이지를, -1은 뒤로가기, 1은 앞으로 가기 이다. 
//  3. 뒤로가기 일 경우 현재 페이지를 next에 넣고 prev에서 꺼낸다.
//  4. 앞으로가기 일 경우 현재 페이지를 prev에 넣고 next에서 꺼낸다.
//  5. 새로운 페이지로 이동시 현재 페이지를 prev에 넣고 next를 비운다.
//  6. 둘다 비활성인 경우 push하지 않는다.
//  7. 현재 페이지는 문자열 알파벳이 담긴 start 일 때, actions가 완료된 후 형태를 리턴하라.
//  8. actions = ["B", "C", -1, "D", "A", -1, 1, -1, -1], start = "A", return [["A"], "B", ["A", "D"]]
//  9. actions = ["B", -1, "B", "A", "C", -1, -1, "D", -1, 1, "E", -1, -1, 1], start = "A", return [ ["A", "B"], "D", ["E"]]

//  코드
const activateBrowser = (actions, start) => {
    let now = start, prev = [], next = [];

    actions.forEach(page => {
        if(page === -1 && prev.length) next.push(now), now = prev.pop();
        else if(page === 1 && next.length) prev.push(now), now = next.pop();
        else prev.push(now), next = [], now = page;
    });
    return [prev, now, next];
}
/*
    풀이
    1. 알파벳에서 알파벳으로 이동하면 prev.push(now) next = [] 가 된다.
    2. -1이 나올 때 prev.length가 0이면 아무것도 일어나지 않는다, 반면 존재하면 prev.pop(), next.push(now)가 된다.
    3. 1이 나올 때 next.lengthrk 0이면 아무것도 일어나지 않는다, 반면 존재하면 next.pop(), prev.push(now)가 된다.
    4. 우선 3개의 변수를 prev, next, now를 선언하고 각각 [], start, []를 할당한다.
    5. actions 배열을 루프하면서 1, 2, 3을 조건으로 분기시켜 작동 시킨다.

    시간복잡도
    actions 원소를 한번 루프 하므로 O(N)
*/
