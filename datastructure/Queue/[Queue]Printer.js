/*
//  문제요약  //
    인쇄대기목록에 존재하는 모든 문서를 인쇄작업목록에 들어가 전부 프린트되기까지 걸리는 시간을 구하는 함수를 작성하라
    
    1. 입력으로 주어지는 파라미터는 아래와 같다.
        1-1. 최대길이가 100인 인쇄작업목록 bufferSize와 최대용량이 100이하인 capacities가 주어진다.
        1-2. 최대길이가 100인 인쇄대기문서 documents에는 최대용량이 100이하인 인쇄물들로 구성되어 있다.
    
    2. 인쇄작업목록의 각 칸에는 하나의 문서만 위치할 수 있고 1초에 한 칸만 이동한다.

    3. 인쇄작업목록은 길이와 capacities를 초과할 수 없다.
    
    4. 테스트 케이스
        4-1. bufferSize = 2, capacities = 10, documents = [7, 4, 5, 6], return 8
        4-2. bufferSize = 1, capacities = 10, documents = [5, 5, 5, 5], return 5
        4-3. bufferSize = 10, capacities = 10, documents = [10], return 11
        4-4. bufferSize = 100, capacities = 100, documents = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], return 110
        4-5. bufferSize = 32, capacities = 50, documents = [18, 2, 15, 15, 20, 20, 30, 32, 45, 50, 23, 26, 29, 33], return 291
*/

/*  코드  */
const calPrintingTime = (bufferSize, capacities, documents) => {
    const workQueue = new Array(bufferSize).fill(0);
    workQueue[workQueue.length-1] = documents[0];

    let totalVolume = documents[0];
    let timeLap = 1, docIndex = 1;
    
    while (totalVolume) {
        let waitingPage = documents[docIndex];
        totalVolume -= workQueue.shift();

        if (totalVolume + waitingPage <= capacities) {
            workQueue.push(waitingPage), docIndex++;
            totalVolume += waitingPage;
        } else workQueue.push(0);
        
        timeLap++;
    }
    return timeLap;
}
/*
//  접근방법  //
    인쇄작업목록은 한번 루프가 될 때 무조건 먼저 삽입된 문서를 앞으로 한칸 씩 이동시키고 가장 앞을 프린트한다.
    따라서, buffersize만큼의 배열을 큐 자료구조로 만들어야 한다.

    인쇄대기목록의 경우 작업목록과 달리 작업목록의 용량이 최대일 경우 문서를 이동시키지 못한다.
    따라서, 루프가 되기전 대기목록의 가장 앞의 문서가 들어갈 수 있는지 용량체크를 하고 투입한다.


//  수도코드  //
    1. 인쇄작업목록 workQueue를 선언하고 bufferSize의 길이 만큼 0을 채운 배열을 할당한다.
        1-1. workQueue의 마지막 인덱스에 첫 프린트 문서인 documents[0]를 할당해 놓는다.
    
    2. 이제 용량, 시간, 대기목록 인덱스를 위한 각 변수들을 선언한다.
        2-1. workQueue의 현재 용량을 표시할 totalVolume을 선언하고 현재 삽입된 document[0]를 할당한다.
        2-2. 인쇄대기목록의 현재 투입대기 문서를 표시할 인덱스 docIndex를 선언하고 0은 삽입했으니 1을 할당한다.
        2-3. 마지막으로 루프가 될 때마다 초를 누적할 timeLap을 선언하고 0번째 문서가 삽입됐으니 1을 할당한다.
    
    3. 루프의 종료가 불규칙하므로 while문으로 루프를 한다.
        3-1. 루프의 종료조건은 인쇄대기와 인쇄작업 두 문서가 모두 비게 되는 totalVolume이 0이 될 때로 설정한다.

    4. 인쇄작업목록이 움직이는 로직 순서대로 설계를 해야 프린트가 꼬이지 않는다.
        4-1. 프린트는 항상 매 루프마다 무조건 일어나므로 totalVolume -= workQueue.shift()를 가장 우선한다.
        4-2. 현재 대기목록에서 workQueue에 진입대기인 documents[docIndex]를 waitingPage변수를 선언해 할당해 놓는다.
        4-3. 이제 totalVolume과 waitingPage의 합이 capacities이하인지 체크한다. 
        4-4. 이하일 경우 workQueue에 waitingPage를 push하고 docIndex++, totalVolume += waitingPage로 갱신한다.
        4-5. 초과일 경우 인쇄작업목록은 반드시 한 칸씩 앞으로 이동하므로 bufferSize유지를 위해 workQueue에 0을 push한다.

    5. 모든 한 번의 작업이 완료될 때 마다 timeLap을 1씩 누적한다.
    
    6. totalVolume이 0이 되면 모든 문서가 출력된 것이므로 루프가 종료되고 timeLap를 리턴한다.


//  시간복잡도  //
    bufferSize와 capacities에 의해 documents의 원소들이 불규칙하게 루프되지만 한 번의 루프로 종료되므로 O(N)이 된다.
*/

/*  리팩토링  */
const calPrintingTime1 = (bufferSize, capacities, documents) => {
    const workQueue = [[documents[0], bufferSize]];
    let timeLap = 1, docIndex = 1, totalVolume = documents[0];

    while (totalVolume) {
        let waitingPage = documents[docIndex];

        if (workQueue[0][1] === timeLap) totalVolume -= workQueue.shift()[0];

        if (totalVolume + waitingPage <= capacities) {
            workQueue.push([waitingPage, timeLap + bufferSize]);
            totalVolume += waitingPage, docIndex++;
        }
        timeLap++;
    }
    return timeLap;
}
/*  리팩토링2  */
const calPrintingTime2 = (bufferSize, capacities, documents) => {
    let totalVolume = documents[0];
    let timeLap = 1, docIndex = 1, waitingPage = 1;
    const workQueue = [[documents[0], bufferSize]];

    while (waitingPage) {
        waitingPage = documents[docIndex];

        if (workQueue[0][1] === timeLap) totalVolume -= workQueue.shift()[0];
        
        if (totalVolume + waitingPage <= capacities) {
            workQueue.push([waitingPage, timeLap + bufferSize]);
            totalVolume += waitingPage, docIndex++;
        }
        timeLap++;
    }
    return workQueue.length ? workQueue.pop()[1]+1 : timeLap;
}
/*
//  접근방법  //
    bufferSize길이만큼의 큐를 생성하면 프린트의 원리에 따라 매 루프마다 shift()와 push()가 발생한다.
    capacities가 하나의 작업만 수용 가능한 최악의 경우 O(documents * bufferSize) 이상의 연산을 수행할 수도 있다.

    workQueue의 길이를 필요할 때만 동적으로 늘릴 수 있다면 위와 같은 연산의 낭비를 줄일 수 있다.
    그러면 매 턴마다 문서가 인쇄되는 상황을 특정 조건에 프린트되도록 해야 이 구현이 가능해 진다.

    문서가 인쇄되는 타이밍은 workQueue에 처음에 삽입된 문서가 buffersize만큼 이동해 0번째에 다다랐을 경우이다.
    처음 삽입된 문서가 0번째에 도달했을 경우 매 루프마다 누적되는 timeLap이 buffersize의 길이와 동일해 진다.
    
    예를 들어, capacities가 10인 큐의 경우 [6, 0, 0, 0] 이면 현재 timeLap은 4이다. 
    여기서 6이 빠져나가면서 5가 들어올 때 [0, 0, 0, 5]이 되며 timeLap이 8이 될 때 5가 0번 째 인덱스에 가게 된다.
    즉, 새로운 변수인 출력시간을 만들면 출력시간 = buffersize + timeLap으로 구할 수 있다.


//  수도코드  //
    1. workQueue를 buffersize가 아닌 빈 배열로 할당하고 첫 출력문서를 이차원 배열로 [용량, 출력시간]으로 삽입한다.
        1-1. 첫 출력시간은 timeLap이 0이므로 bufferSize를 삽입하면 된다.
    
    2. 총 용량, 시간, 인쇄대기목록인덱스, while루프, 진입준비 변수를 기존과 동일하게 설정한다.
        2-1. 전역에 totalVolume = documents[0], timeLap = 1, docIndex = 1 를 선언한다.
        2-2. while루프를 totalVolume이 존재할 때 까지 루프시키고 루프 안에서 waitingPage를 선언한다.

    3. timeLap과 출력시간이 동일한지 체크하고 프린트를 수행한다.
        3-1. workQueue[0][1] === timeLap일 경우 totalVolume -= workQueue[0][0]를 하고 workQueue.shift()를 수행한다.
    
    4. 총용량과 진입대기 용량이 capacities를 초과하는지 체크하고 workQueue에 진입대기를 [용량, 출력시간]으로 push한다.
        4-1. totalVolume + waitingPage가 capacities이하일 경우 [waitingPage, 출력시간]을 workQueue에 push한다.
        4-2. 출력시간은 buffersize + timeLap이다.
        4-3. totalVolume에 추가된 waitingPage를 누적하고 docIndex++로 갱신한다.
    
    5. timeLap을 누적하다 루프가 종료되면 리턴시킨다.

    6. 프린트가 다 되지 않지만 여기서 연산을 줄이고 싶을 경우 마지막에 workQueue에 추가된 시간을 리턴시키는 방법이 존재한다.
        6-1. waitingPage를 외부에 선언해 1을 할당하고 while루프의 조건을 waitingPage가 undefined가 될 때 까지 루프한다.
        6-2. waitingPage가 undefined가 되면 현재 workQueue의 마지막에 출력대기중인 마지막 문서의 시간이 계산되어 있다.
        6-3. 루프가 종료되고 workQueue[0][1] + 1을 리턴시키면 workQueue가 다 빌 때까지 루프할 필요가 없어진다.
        6-4. 예외로 모든 문서들이 한 번에 출력될 수도 있으므로 workQueue의 길이를 체크하고 리턴할 필요가 있다.


//  시간복잡도  //
    루프마다 workQueue의 shift가 일어나지 않으므로 정확히 timeLap만큼의 한 번의 루프에 수렴한다.
*/
