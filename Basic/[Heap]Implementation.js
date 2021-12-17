//  문제요약
//  1. 최소 Heap을 구현하라.
//  2. 최소 Heap의 멤버변수 : 완전 이진 트리를 배열로 저장할 heap 변수
//  3. 최소 Heap의 메서드
//      3-1. 부모노드가 될 인덱스를 구할 수 있어야 한다.
//      3-2. left 와 right의 자식노드가 될 인덱스를 구할 수 있어야 한다.
//      3-3. 노드를 추가하고 heapify를 수행해야 한다.
//      3-4. 노드를 추출하고 heapify를 수행해야 한다.
//      3-5. 힙 정렬로 오름차순정렬을 수행할 수 있어야 한다.
//  4. Heap을 상속받아 우선순위 큐를 구현하라.
//  5. 우선순위 큐의 메서드
//      5-1. 큐에 노드를 삽입할 수 있어야 한다.
//      5-2. 큐에서 노드를 우선순위로 추출할 수 있어야 한다.
//      5-3. 현재 큐의 크기를 확인할 수 있어야 한다.

//  최소힙 코드
class MinHeap {
    constructor() {
        this.heap = [];
    }

    getChildIndexL = (index) => (index * 2) + 1;
    
    getChildIndexR = (index) => (index * 2) + 2;
    
    getParentIndex = (index) => Math.floor((index - 1) / 2);

    addNode(element) {
        this.heap.push(element);
        let nowIndex = this.heap.length - 1;

        while (nowIndex > 0) {
            let parentIndex = this.getParentIndex(nowIndex);

            if (element < this.heap[parentIndex]) {
                this.heap[nowIndex] = this.heap[parentIndex];
                nowIndex = parentIndex;

            } else break;
        }
        this.heap[nowIndex] = element;
    }

    extractNode() {
        let nowIndex = 0;
        let min = this.heap.pop();
        let nodes = this.heap.length;

        if (this.heap[0]) [ min, this.heap[0] ] = [ this.heap[0], min ];

        while (nodes > this.getChildIndexL(nowIndex)) {
            let leftIndex = this.getChildIndexL(nowIndex);
            let rightIndex = this.getChildIndexR(nowIndex);

            let minIndex = 
                rightIndex < nodes && this.heap[rightIndex] < this.heap[leftIndex]
                ? rightIndex : leftIndex;
            
            if (this.heap[nowIndex] >= this.heap[minIndex]) {
                [ this.heap[nowIndex], this.heap[minIndex] ] = 
                [ this.heap[minIndex], this.heap[nowIndex] ];
                nowIndex = minIndex;
            
            } else break;
        }
        return min;
    }

    ascendingSort(num) {
        const sort = [];
        if (num > this.heap.length || num === undefined) num = this.heap.length;
        for (let i=0; i<num; i++) sort.push(this.extractNode());
        return sort;
    }
}
/*
    풀이
    1. heap을 할당할 멤버변수에 빈 배열을 할당해 선언한다.
    2. 힙의 배열특성에 맞춰 인덱스를 구하는 메서드를 구현한다.
        2-1. 입력받은 인덱스의 부모노드는 완전 이진 트리의 특성 상 left의 경우 (index-1)/2, right의 경우 (index-2)/2로 구한다.
        2-2. 입력받은 인덱스의 left자식 노드를 (index*2)+1로 구한다.
        2-3. 입력받은 인덱스의 right자식 노드를 (index*2)+2로 구한다.
    
    3. 노드를 추가하고 heapify로 정렬한다.
        3-1. element를 heap의 가장 마지막 인덱스에 push, 트리로 치면 가장 마지막 리프노드를 추가한다.
        3-2. 현재 추가된 노드의 인덱스를 nowIndex에 할당하고 부모노드와 비교하면서 갱신해 나가야 한다.
        3-3. 부모노드와 비교하면서 교환이 가능한 노드까지 올라가야 하므로 while로 nowIndex가 0보다 클 때 까지 루프한다.
        3-4. 부모노드의 인덱스를 nowIndex를 통해 구하고 부모노드와 추가노드의 원소를 비교한다.
        3-5. 부모노드보다 추가노드가 더 작을 경우 추가노드의 위치에 부모노드를 할당하고 nowIndex = parentIndex로 변경한다.
        3-6. 부모노드가 추가노드 이하일 경우 루프를 종료하고 현재 nowIndex의 위치에 element를 할당한다.
    
    4. 루트에 위치한 노드를 추출하고 heapify로 정렬한다.
        4-1. 루트를 가장 끝의 노드와 교환해야하니 min변수에 heap의 마지막 노드를 추출해서 할당한다.
        4-2. 만일 heap의 길이가 1이거나 0일 경우 undefined가 추가되지 않도록 heap에 노드가 존재할 경우 0번째와 min을 스왑한다.
        4-3. 루트로 스왑된 최대값을 다시 리프노드로 정렬시켜야 하므로 while루프의 조건으로 설정할 힙길이와 현재 인덱스를 nowIndex에 할당한다.
        4-4. while루프는 더 이상 트리에 노드가 존재하지 않을 때, 즉 현 노드의 자식노드가 존재하지 않는 경우인 leftIndex > 힙길이까지 반복한다.
        4-5. left와 right 두 자식 노드 중 더 작은 원소와 교환해야 하므로 두 인덱스를 구하고 원소 비교를 해 인덱스를 구한다.
        4-6. 이제 nowIndex의 노드와 비교해 자식노드가 더 작거나 같을 경우 두 위치를 스왑하고 nowIndex도 교환되는 인덱스로 변경한다.
        4-7. 루프가 종료되거나 교환이 더 이상 이뤄지지 않으면 min을 리턴한다.
    
    5. 힙 정렬을 구현한다.
        5-1. 오름차순 정렬을 리턴할 sort 배열을 선언한다.
        5-2. num값이 힙길이를 초과하거나 undefined일 경우 힙길이를 할당해 모두 정렬해 리턴한다.
        5-3. num 만큼 루프를 하면서 extractNode()로 추출한 노드를 sort변수에 push하고 sort를 리턴한다.
    
    시간복잡도
    추가, 추출의 경우 모두 트리의 높이인 O(logN)의 시간이 소요된다.
    정렬의 경우 추출을 노드 N만큼 수행하기 때문에 O(NlogN)의 시간이 소요된다.
*/

//  우선순위 큐 코드
class PriorityQueue extends MinHeap {
    constructor() {
        super()
    }

    enqueue = (element) => this.addNode(element);

    dequeue = () => this.extractNode()

    checkQueue = () => this.heap.length;
}
/*
    풀이
    1. MinHeap을 그대로 상속받아 우선순위 큐를 구현한다.
    2. enqueue메소드로 element를 입력받아 addNode를 호출하고 결과를 리턴한다.
    3. dequeue메소드로 최소 값을 우선순위로 출력한다.
    4. 현재 큐의 크기를 리턴한다.
*/