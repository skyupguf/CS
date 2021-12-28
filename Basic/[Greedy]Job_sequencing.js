//  문제요약
//  1. 입력으로 주어지는 jobs 배열의 원소는 [작업명, 기한, 이익] 으로 구성된다.
//  2. 하루에 하나의 작업만 수행할 수 있으며, 기한이 지난 작업은 수행할 수 없다.
//  3. 주어진 기한에 맞게 최대이익이 나도록 작업을 수행할 순서대로 작업명만 나열한 결과를 배열로 리턴하라.
//  4. jobs = [['a', 4, 20], ['b', 1, 10], ['c', 1, 40], ['d', 1, 30]], return ['c', 'a']
//  5. jobs = [['a', 2, 100], ['b', 1, 19], ['c', 2, 27], ['d', 1, 25], ['e', 3, 15]], return ['c', 'a', 'e']

//  코드
const listMaxProfitSequence = (jobs) => {
    const stack = [], result = [];
    jobs.sort((a, b) => a[1] - b[1]);

    while (jobs.length) {
        let [ job, limit, profit ] = jobs.pop();
        stack.push([job, profit]);

        if (jobs.length === 0 || jobs[jobs.length-1][1] !== limit) {
            stack.sort((a, b) => a[1] - b[1]);
            result.unshift(stack.pop());
        }
    }
    return result.map(e => e[0]);
}
/*
    풀이#1
    1. 모든 작업의 기한이 다르면 모든 작업을 수행할 수 있다. ex) jobs = [['a', 1, 10], ['b', 2, 20], ['c', 3, 30]], return [a, b, c]
        1-1. 그러나 작업마다 기한이 겹칠 수 있으며, 해당 기한의 작업들이 무조건 최대이익을 보장하지도 않는다.
        1-2. 5번 테스트케이스처럼 기한1 작업들이 기한2 작업들 보다 모두 이익이 낮을 경우 기한2 작업들을 이틀에 걸쳐 하는게 더 이익이 크다.
        1-3. 따라서, 이 문제는 해당 기한끼리의 대소비교가 아닌 기한안에 최선을 선택하는 그리디의 접근법이 올바르다.
    
    2. 그리디를 사용하려면 주어진 기한이 가장 높은 순으로 최대이익을 찾아 리턴할 result배열의 슬롯을 채워야 한다.
        2-1. 기한이 같은 경우가 한 단계이며 기한이 가장 큰 순으로 먼저 탐색해야 하므로 기한별로 오름차순으로 정렬한다.
        2-2. 기한이 같은 작업들을 이제 stack배열에 새로 push하고 이들 중 최대이익이 나는 작업을 하나 result에 push한다.
        2-3. 왜 하나만 push하냐면 기한3이 최대일 경우 기한3의 작업은 기한2, 기한1보다 이익이 작아도 3일째는 3일 작업들만 남기 때문이다.
        2-4. 이렇게 슬롯하나를 채웠으면 기한2들도 stack에 push해 이제 기한3들과 섞어서 비교해도 된다.
        2-5. 왜냐하면 2일째는 2일, 3일 작업들이 둘다 남아있기 때문이다, 이를 반복 수행하면 기한 순으로 최대이익 작업들을 구할 수 있다.
    
    3. 작업들을 같은 기한간 이익으로 비교하기 위한 stack배열과 결과를 리턴할 result배열을 선언하고 빈 배열을 할당한다. 
        3-1. jobs배열을 기한순으로 오름차순 배열을 한다.
        3-2. 이제 jobs배열의 작업들이 stack에서 전부 비교될 때 까지 루프해야 하므로 while(jobs.length)까지 루프한다.

    4. 같은 기한의 작업들을 stack에 모아 이익을 기준으로 오름차순 정렬하여 가장 큰 작업을 result에 push한다. 이게 하나의 단계이다.
        4-1. jobs.pop()의 값을 stack에 push하고 현재 jobs의 가장 뒤의 인덱스를 i변수를 선언하고 할당한다.
        4-2. jobs의 현재 인덱스의 기한과 스택의 마지막 요소의 기한이 다를 때 까지 stack에 작업을 push한다.
        4-3. 기한이 다를 경우, stack을 이익을 기준으로 오름차순 정렬 후 가장 뒤의 요소를 result에 unshift한다.
        4-4. jobs배열이 빈 배열일 경우 비교하면 인덱스 에러가 생기므로 조건으로 job가 빈 배열일 경우도 포함한다.

    5. 루프가 종료되면 result배열에서 작업명만 배열로 리턴한다.

    시간복잡도
    while루프는 jobs의 작업을 한번 만 루프하므로 jobs배열 전체를 sort메서드로 정렬하는 O(NlogN)을 넘지 못한다.
*/

//  코드#2
const listMaxProfitSequence = (jobs) => {
    const heap = [], result = [];
    jobs.sort((a, b) => a[1] - b[1]);

    const insertNode = (node) => {
        heap.push(node);
        let nowIndex = heap.length - 1;

        while (nowIndex) {
            let parentIndex = Math.floor((nowIndex - 1) / 2);

            if (node[1] > heap[parentIndex][1]) {
                heap[nowIndex] = heap[parentIndex];
                nowIndex = parentIndex;

            } else break;
        }
        heap[nowIndex] = node;
    }

    const extractMax = () => {
        let nowIndex = 0;
        let max = heap.pop();
        let nodes = heap.length;

        if (heap[0]) [ max, heap[0] ] = [ heap[0], max ];

        while (nodes > nowIndex * 2 + 1) {
            let leftIndex = nowIndex * 2 + 1;
            let rightIndex = nowIndex * 2 + 2;

            let maxIndex = 
                rightIndex < nodes && heap[rightIndex][1] > heap[leftIndex][1]
                ? rightIndex : leftIndex;
            
            if (heap[nowIndex][1] <= heap[maxIndex][1]) {
                [ heap[nowIndex], heap[maxIndex] ] = 
                [ heap[maxIndex], heap[nowIndex] ];
                nowIndex = maxIndex;
            
            } else break;
        }
        return max;
    }

    while (jobs.length) {
        let [ job, limit, profit ] = jobs.pop();
        insertNode([job, profit]);

        if (jobs.length === 0 || jobs[jobs.length-1][1] !== limit) {
            result.unshift(extractMax());
        }
    }
    return result.map(job => job[0]);
}
/*
    풀이
    1. 위 코드를 풀어서 힙구조로 직접구현 시 입, 출력에 일관적으로 O(logN)이 적용 가능하다.
*/