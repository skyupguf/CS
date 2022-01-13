//  문제요약
//  1. 1 ~ 100 사이의 인쇄 작업목록인 bufferSize와 100이하의 최대용량인 capacities가 주어진다.
//  2. 1 ~ 100 사이의 인쇄대기문서 documents에는 각 문서의 크기가 원소로 있으며 100이하이다.
//  3. 인쇄작업목록의 각 칸에는 하나의 문서만 위치할 수 있고 1초에 한 칸만 이동한다.
//  4. 인쇄작업목록은 길이와 capacities를 초과할 수 없다.
//  5. 인쇄대기문서가 모두 인쇄되는데 걸리는 시간을 리턴하는 함수를 구현하라.
//  6. bufferSize = 2, capacities = 10, documents = [7, 4, 5, 6], return 8

//  코드#1
const calPrintingTime = (bufferSize, capacities, documents) => {
    const workQueue = new Array(bufferSize).fill(0);
    workQueue[workQueue.length-1] = documents[0];

    let totalVolume = documents[0];
    let timeLap = 1, docIndex = 1;
    
    while(totalVolume) {
        let waitingPage = documents[docIndex];
        totalVolume -= workQueue.shift();

        if(totalVolume + waitingPage <= capacities) {
            workQueue.push(waitingPage), docIndex++;
            totalVolume += waitingPage;
        } else workQueue.push(0);
        
        timeLap++;
    }
    return timeLap;
}
/*
    풀이
    1. 큐역할을 할 배열을 bufferSize의 길이 만큼 만들고 0으로 채운다, 이 큐는 루프마다 한 칸씩 앞으로 이동한다.
    2. 큐의 마지막 0을 제거하고 documents[0]를 삽입해 1초 루프가 됐을 때를 수행한다.
    3. totalVolume도 documents[0]를 할당하고 timeLap과 docIndex를 각각 1을 할당한다.
    4. 이제 큐를 진행하기 위해 while문으로 루프를 돈다, totalVolume이 0이 되면 큐와 문서배열이 전부 공백이므로 조건으로 한다.
    5. 우선 큐에 진입대기인 documents[docIndex]를 waitingPage변수에 할당해 놓는다.
    6. 큐에 문서를 삽입하기 전에 우선 루프때마다 무조건 큐의 이동이 있으므로 totalVolume - workQueue.shift() 를 한다.
    7. 큐가 한 칸 비었으니 이제 bufferSize를 유지하기 위해 채워 넣어야 한다.
    8. 이 때, 총용량 + 진입대기 <= capacities 일 경우 진입이 가능하므로 workQueue.push(waitingPage), docIndex를 +1 해준다.
    9. totalVolume + waitingPage로 용량도 누적해 준다.
    10. 만일 용량이 초과면 진입대기 문서가 여전히 대기 상태이므로 큐에 0을 push해 빈 칸을 채워 bufferSize를 유지한다.
    11. 시간 경과는 1번의 루프 때 무조건 일어나므로 timeLap + 1 을 누적한다.
    12. totalVolume이 0이 되면 모든 문서가 출력된 것이므로  루프가 종료되고 timeLap를 리턴한다.

    시간복잡도
    bufferSize가 길면 더 많은 연산을 하지만 어느 쪽 루프가 더 길던 각 루프는 한번이므로 O(N)이다.
*/

//  코드#2
const calPrintingTime = (bufferSize, capacities, documents) => {
    const workQueue = [[0, 0]];
    let timeLap = 0, docIndex = 0;
    let totalVolume = 0, waitingPage = 1;

    while(waitingPage) {
        waitingPage = documents[docIndex];

        if(workQueue[0][1] === timeLap) totalVolume -= workQueue.shift()[0];
        
        if(totalVolume + waitingPage <= capacities) {
            workQueue.push([waitingPage, timeLap + bufferSize]);
            totalVolume += waitingPage, docIndex++;
        }
        timeLap++;
    }
    return workQueue.length ? workQueue.pop()[1]+1 : timeLap;
}
/*
    풀이#2
    1. workQueue를 이차원 배열로 만들어 진입하는 문서를 [문서용량, 출력시간] 으로 삽입한다.
    2. 우선 첫 진입 시 1초 경과가 되므로 [0, 0]을 삽입해 놓고 루프를 한다.
    2. 경과시간, documents문서인덱스, 총용량, waitingPage(documnets[인덱스]) 변수를 선언한다.
    3. waitingPage는 documents의 문서들의 해당 인덱스를 할당할 변수로 documents가 전부 비워지면 루프를 종료시킨다.
    4. while 루프 안에서 우선 waitingPage에 documents[docIndex]인, 진입대기 문서를 할당해 놓는다.
    5. 우선 큐안에 문서가 존재하면 먼저 빠지고 진입해야 하므로 workQueue[0][1]와 현제 경과시간을 비교한다.
    6. 만일 동일하면 출력되어야 하므로 workQueue.shift()로 출력하고 0번째인 용량을 총용량에서 뺀다.
    7. 이제 현재 총용량 + waitingPage 가 capacities 이하면 큐안에 waitingPage를 삽입 해야 한다.
    8. 여기서 출력시간은 지금까지 경과시간 + bufferSize로 해야 루프 후 다음 비교 때 shift를 할 수 있다.
    9. documents의 문서가 모두 비워지면 workQueue에 모든 문서들이 올라와 있게 된다.
    10. 이 때, workQueue의 마지막 문서의 출력시간이 최종 출력시간이며 workQueue가 공백이 될 때까지므로 +1을 해줘야 한다.
    
    에러핸들링
    1. documents가 공백이 되고 다음 루프 때 출력이 되면 workQueue가 빈배열이 되므로 경과시간을 바로 리턴해야 한다.

    시간복잡도
    최악의 경우여도 queue를 전부 shift()하면 종료된며 bufferSize만큼의 배열을 만들 필요가 없어 코드#1 보다 빠르다.
*/
