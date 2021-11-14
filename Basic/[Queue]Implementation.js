//  문제요약
//  1. 내장 객체 Array.prototype에 정의된 메서드 없이 Queue를 구현하라.
//  2. 멤버변수 : 데이터를 저장할 Object 타입의 storage, 큐의 가장 앞과 뒤 Number 타입의 포인터 front=0, rear=0
//  3. 필요한 메서드
//     size(): 큐에 추가된 데이터의 크기를 리턴해야 한다.
//     enqueue(): 큐에 데이터를 추가할 수 있어야 한다.
//     dequeue(): 가장 먼저 추가된 데이터를 큐에서 삭제하고 삭제한 데이터를 리턴해야 한다.
//  4. 원형 큐와 덱을 추가 구현 해보자.

//  선형 큐 코드
class Queue {
    constructor() {
        this.storage = {};
        this.front = 0;
        this.rear = 0;
    }
    size() {
        return this.rear - this.front;
    }
    enqueue(element) {
        this.storage[this.rear] = element;
        this.rear++;
    }
    dequeue() {
        if(this.size() <= 0) return;
        const temp = this.storage[this.front];
        delete this.storage[this.front], this.front++;
        return temp;
    }
    now() {
        return this.storage[this.front];
    }
    peek(index) {
        return this.storage[this.front+index];
    }
}
/*
    풀이
    1. 우선 멤버변수 설정을 한다, 저장할 storage와 front, rear를 0으로 초기화 한다.
    2. size 메소드의 경우 전체 크기를 표시하기 때문에 현재 크기의 가장 뒤인 rear - 가장 앞인 front를 해준다.
    3. enqueue는 storage의 뒤 부터 데이터를 추가하기 때문에 storage[rear]에 데이터를 추가하고 rear++ 누적해준다.
    4. dequeue는 언더플로우를 방지하기 위해 rear가 0이하일 경우 undefined를 리턴하도록 예외처리 한다.
    5. 데이터를 추출하면서 가장 앞의 front가 제거 되었으므로 front++를 해서 가장 앞의 데이터를 변경해 준다.

    리팩토링
    1. 현재 front 포인터가 위치한 값을 바로 리턴하는 메서드 now()를 추가한다.
    2. 특정 index에 위치한 값을 바로 리턴하도록 인자로 전달받은 index+front값을 합친 peek 메서드를 추가한다.
*/

//  원형 큐 코드
class CircleQueue {
    constructor(size) {
        this.storage = {};
        this.front = 0;
        this.rear = -1;
        this.nSize = 0;
        this.qSize = size;
    }
    fullCheck() {
        return this.nSize === this.qSize;
    }
    enqueue(element) {
        if(this.fullCheck()) return new Error('큐가 가득찼습니다.');
        this.rear = (this.rear+1) % this.qSize;
        this.storage[this.rear] = element, this.nSize++;
    }
    dequeue() {
        if(!this.nSize) return new Error('큐가 비어있습니다.');
        const temp = this.storage[this.front];
        delete this.storage[this.front], this.nSize--;
        this.front = (this.front+1) % this.qSize;
        return temp;
    }
    now() {
        return this.storage[this.front];
    }
    peek(index) {
        return index < this.qSize ? 
        this.storage[(this.front+index) % this.qSize] : undefined;
    }
}
/*
    풀이
    1. 인스턴스 생성 시 Number타입 size를 인자로 전달 받아 qSize에 할당한다, nSize도 추가 선언
    2. 공백은 멤버변수인 nSize로 판단할 수 있으니 size()메서드를 제거한다.
    3. 원형 큐는 포화상태를 체크해야 하므로 fullCheck()메서드를 추가하고 nSize === qSize 를 리턴한다.
    4. rear를 -1로 할당해 포화가 됐을 때 max 이전 포인터를 가리키게 한다.
    5. enqueue()는 우선 fullCheck를 호출해 포화상태를 체크해 예외처리를 해준다.
    6. rear를 누적하고 입력받은 한도를 넘기지 않도록 qSize로 나머지 나누기를 해 할당한다.
    7. +1이 누적된 rear로 storage에 값을 할당하고 nSize를 1누적한다.
    8. dequeue()는 nSize가 0일 경우 공백이므로 조건으로 예외처리를 해준다.
    9. 선형 큐와 다른 점은 해당 포인터 키를 제거할 때 nSize를 차감하고 front를 rear와 같은 방법으로 값을 할당한다.
    10. peek()의 경우 입력받는 인자가 qSize를 넘지 못하도록 하고 front+index를 qSize로 나머지 나누기를 한다.
*/

//  덱 코드
class Deque {
    constructor(size) {
        this.storage = {};
        this.front = 0;
        this.rear = 1;
        this.nSize = 0;
        this.dSize = size || MAX_SAFE_INTEGER;
    }
    addFront(element) {
        if(this.nSize >= this.dSize) return new Error('덱이 가득찼습니다.');
        this.front = (this.front+1) % this.dSize;
        this.storage[this.front] = element, this.nSize++;
    }
    addRear(element) {
        if(this.nSize >= this.dSize) return new Error('덱이 가득찼습니다.');
        this.rear = (this.rear || this.dSize) - 1;
        this.storage[this.rear] = element, this.nSize++;
    }
    deleteFront() {
        if(!this.nSize) return;
        const temp = this.getFront();
        delete this.storage[this.front], this.nSize--;
        this.front = (this.front || this.dSize) - 1;
        return temp;
    }
    deleteRear() {
        if(!this.nSize) return;
        const temp = this.getRear();
        delete this.storage[this.rear], this.nSize--;
        this.rear = (this.rear+1) % this.dSize;
        return temp;
    }
    getFront() {
        return this.nSize ? this.storage[this.front] : undefined;
    }
    getRear() {
        return this.nSize ? this.storage[this.rear] : undefined;
    }
}
/*
    풀이
    1. size를 인자로 받거나, maxsize를 설정해 원형 큐 처럼 운영해야 포인터가 밀려나지 않아 O(N) 연산을 하지 않는다.
    2. front나 rear 두 포인터 중 하나를 1로 만들어 하나는 -경로로 움직이게 하고 하나는 +경로로 움직이게 한다.
    3. 첫 데이터가 삽입되었을 때 두 포인터가 동일해야하기 때문이며, 임의의 size를 설정해야 -포인터를 만들지 않는다.
    4. 포인터가 초기에 0일 경우 데이터가 삽입될 때 +경로로 움직이는데 size를 넘어서지 못하게 나머지 연산을 한다.
    5. 포인터가 초기에 1일 경우 -경로로 움직이는데 -포인터가 되지 않게 0에서 이동할 경우 maxsize로 이동한다.
    6. 데이터가 삭제될 때는 두 경우를 반대로 뒤집으면 되며, 나머지는 원형 큐와 같다.
*/

//  덱 코드 (이중 연결리스트)
class Deque {
    constructor() {
        this.front;
        this.rear;
        this.size = 0;
    }
    addFront(value) {
        this.front = this.front ? 
        this.front.prev = {value, next: this.front} : this.rear = {value};
        this.size++;
    }
    addRear(value) {
        this.rear = this.rear ? 
        this.rear.next = {value, prev: this.rear} : this.front = {value};
        this.size++;
    }
    deleteFront() {
        const temp = this.getFront();
        if(this.front === this.rear) this.front = this.rear = undefined;
        else (this.front = this.front.next).prev = undefined, this.size--;
        return temp;
    }
    deleteRear() {
        const temp = this.getRear();
        if(this.rear === this.front) this.rear = this.front = undefined;
        else (this.rear = this.rear.prev).next = undefined, this.size--;
        return temp;
    }
    getFront() {
        return this.front && this.front.value;
    }
    getRear() {
        return this.rear && this.rear.value;
    }
}
/*
    풀이
    1. 이중 연결리스트는 객체와 다르게 포인터 계산없이 노드의 next와 prev관계만 유의해 연결해주면 된다.
    2. addFront()와 addRear()모두 포인터가 undefined일 때 전달받은 인자값 value를 front와 rear에 모두 할당한다.
    3. front가 존재할 경우 front.prev = {value, next: front}를 front에 할당해 prev를 현재 front로 변경한다.
    4. rear가 존재할 경우 rear.next = {value, prev: rear}를 rear를 할당해 next를 현재 rear로 변경한다.
    5. deleteFront()와 deleteRear()는 두 add의 반대로 수행하면 된다.
    6. 이중 연결리스트를 활용할 경우 size를 정하지 않아도 덱을 O(1)으로 구현할 수 있다.
*/