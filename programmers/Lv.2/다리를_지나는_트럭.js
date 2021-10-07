//  문제요약
//  1. bridge_length가 1~10,000, weight가 1~10,000, truck_weights가 1~10,000 다.
//  2. 1 <= truck =< weight 이면 정해진 truck_weights 순서대로 bridge를 건널 경우 걸리는 시간을 알아내라.
//  3. 2	10	[7,4,5,6]	8
//  100	100	[10]	101
// 100	100	[10,10,10,10,10,10,10,10,10,10]	110

//  코드
const timeToCrossBridge = (bridge_length, weight, truck_weights) => {
    let time = 0, sum = 0, bridge = [];
    while(bridge.length < bridge_length) bridge.push(0);
    
    while(true) {
        sum = sum - bridge.shift();
        if(truck_weights.length !== 0 && sum + truck_weights[0] <= weight) {
            bridge.push(truck_weights.shift());
            sum = sum + bridge[bridge.length-1];
        } else {
            bridge.push(0);
        }
        time++;
        if(sum === 0 && truck_weights.length === 0) break;
    }
    return time;
}

// #풀이2
const timeToCrossBridge = (bridge_length, weight, truck_weights) => {
    let time = 0, sum = 0, bridge = [[0, 0]];
    
    while(bridge.length > 0 || truck_weights.length > 0) {
        if(bridge[0][0] === time) sum = sum - bridge.shift()[1];
        if(sum + truck_weights[0] <= weight) {
            bridge.push([time+bridge_length, truck_weights[0]]);
            sum = sum + truck_weights.shift();
        }
        time++;
    }
    return time;
}

/*
문제요약
1. bridge_length의 길이를 가진 다리에서 트럭이 경과시간 1에 하나씩 앞으로 이동
2. 중량한도는 weight이며 한도가 bridge_length가 남아도 진입할 수 없다. 
3. bridge_length = 1~10000, weight = 1 ~ 10000, truck_weights.length = 1~10000, 1 <=truck_weights[i] <= weight

#풀이1
1. 시간경과 time, 다리위의 현재트럭무게 sum, 큐역할 배열 bridge
2. bridge를 bridge_length만큼 0으로 채워 넣어서 다리 길이를 맞춘다.
3. 순회를 종료할 조건이 복잡하기 때문에 while문을 무한으로 반복시킨다.
4. 우선 반복을 한번 순회하면 무조건 bridge에 올라와 있는 트럭은 다리를 건너기 때문에 sum = sum - bridge.shift() 제거하면서 누적
5. 대기중인 트럭이 들어오는 조건과 그러지 않는 조건으로 나누어 분기한다.
6. truk_weights에서 대기중인 트럭이 있고 sum+truk_weights[0]가 weight를 초과하지 않을 경우 대기에서 제거 다리에 push, sum에 가장 후미를 누적
7. 위 조건을 만족하지 못해 트럭이 들어오지 않는 경우 0을 push 앞으로 한 칸씩 밀어낸다.
8. 순회 마지막에 time++
9. 탈출조건으로 다리위와 대기중인 트럭이 모두 비워져야 하므로 sum === 0 && truck_weights.length === 0

#시간복잡도1
while문을 통해 배열 N을 2회 반복하게 되면서 O(2n), 초기에 0으로 배열을 채우지 않으면 시간복잡도를 더 줄일 수 있을 것 같다.

#풀이2
1. bridge를 0으로 채우지 않을 경우, 하나의 트럭이 다리에 진입하고 나가는 타이밍은 bridge_length 만큼의 시간경과가 필요
2. 순회할 때 마다 일정한 시간경과를 표시할 수 있어야 하며, 진입하는 트럭마다 아웃되는 타이밍이 다르게 적용되어야 한다.
3. 예제
    bridge_length = 2, weight = 10, truck_weights = [7, 4, 5, 6], bridge = [[0, 0]]
    time = 0 => bridge = [[2, 7]] truck_weights = [4, 5, 6] time = 1
    time = 1 => bridge = [[2, 7]] truck_weights = [4, 5, 6] time = 2
    time = 2 => bridge = [[4, 4]] truck_weights = [5, 6] time = 3
    time = 3 => bridge = [[4, 4], [5, 5]] truck_weights = [6] time = 4
    time = 4 => bridge = [[5, 5]] truck_weights = [6] time = 5
    time = 5 => bridge = [[7, 6]] truck_weights = [6] time = 6
    time = 6 => bridge = [[7, 6]] truck_weights = [] time = 7
    time = 7 => bridge = [] truck_weights = [] time = 8
4. bridge에 0을 채워 넣는 대신 이중배열로 큐에서 제거 될 타임을 설정 time + bridge_length
5. 순회를 종료하고 return time

#시간복잡도2
O(n)
*/