//  문제요약
//  1. 1 ~ 50,000개의 물건이 담긴 stuff배열의 각 원소는 40 ~ 240사이의 자연수이다.
//  2. stuff의 각 원소들을 40 ~ 240사이 자연수인 limited의 한도 내에서 최대 2개씩 박스에 담아 옮길 수 있다.
//  3. 박스를 최소한으로 사용해서 stuff의 물건을 모두 옮길 때 사용한 박스의 개수를 구하라
//  4. stuff = [60, 80, 120, 90, 130], limited = 140, return 4
//  5. stuff = [70, 50, 80, 50], limited = 100, return 3

//  코드
const useMinimumBox = (stuff, limited) => {
    let box = 0, i = 0;
    stuff.sort((a, b) => a - b);

    while(stuff.length > i) {
        let s = stuff[i], b = stuff.pop();
        if(limited >= s+b) i++;
        box++;
    }
    return box;
}
/*
    풀이
    1. 원소 2개의 크기가 limited를 넘어갈 경우 박스는 1개만 담을 수 있다.
    2. 가장 효율적으로 옮기는 방법은 가장 큰 무게와 가장 작은 무게가 박스에 한번에 담길 때 이다.
    3. stuff를 오름차순으로 정렬하고 stuff.pop() + stuff[0]가 limited 이하면 2개를 한번에 아닐 경우 하나만 제거하고 box+1
    4. 이 과정을 반복하고 stuff의 길이가 0가 되면 box를 리턴한다.

    시간복잡도
    while문은 최악일 경우 모든 요소를 루프하므로 O(N), 따라서 정렬을 수행하는 O(NlogN)이 시간복잡도가 된다.

    리팩토링
    1. if(limited >= s+b) stuff.shift() 에서 shift메소드의 시간 복잡도는 최대 O(N)이다.
    2. stuff[0]을 굳이 제거할 필요 없이 전역에 변수 i = 0 를 선언하고 if(limited >= s+b) i++ 을 한다.
    3. while문의 조건을 stuff.length > i 로 주면 마지막 요소들이 pop 되어 length와 i가 교체 될 때 루프를 종료시킨다.
*/