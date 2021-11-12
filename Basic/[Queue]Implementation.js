//  문제요약
//  1. 내장 객체 Array.prototype에 정의된 메서드 없이 Queue를 구현하라.
//  2. 멤버변수 : 데이터를 저장할 Object 타입의 storage, 큐의 가장 앞과 뒤 Number 타입의 포인터 front=0, rear=0
//  3. 필요한 메서드
//     size(): 큐에 추가된 데이터의 크기를 리턴해야 한다.
//     enqueue(): 큐에 데이터를 추가할 수 있어야 한다.
//     dequeue(): 가장 먼저 추가된 데이터를 큐에서 삭제하고 삭제한 데이터를 리턴해야 한다.

//  코드
class Queue {
    constructor() {
        this.storage = {};
        this.front = 0;
        this.rear = 0;
    }
    size() {
        return this.rear - this.front;
    }
    front() {
        return this.storage[this.front];
    }
    peek(index) {
        return this.storage[this.front+index];
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
}
/*
    풀이
    1. 우선 멤버변수 설정을 한다, 저장할 storage와 front, rear를 0으로 초기화 한다.
    2. size 메소드의 경우 전체 크기를 표시하기 때문에 현재 크기의 가장 뒤인 rear - 가장 앞인 front를 해준다.
    3. enqueue는 storage의 뒤 부터 데이터를 추가하기 때문에 storage[rear]에 데이터를 추가하고 rear++ 누적해준다.
    4. dequeue는 언더플로우를 방지하기 위해 rear가 0이하일 경우 undefined를 리턴하도록 예외처리 한다.
    5. 데이터를 추출하면서 가장 앞의 front가 제거 되었으므로 front++를 해서 가장 앞의 데이터를 변경해 준다.
*/

//  코드

/*
풀이
1. max_size를 설정하고 원형 큐를 구현한다.
*/