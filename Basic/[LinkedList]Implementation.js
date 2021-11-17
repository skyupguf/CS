//  문제요약
//  1. 연결리스트, 이중연결리스트, 원형연결리스트를 구현하라.

//  단일 연결리스트 코드
class LinkedList {
    constructor() {
        this.head;
        this.size = 0;
    }
    addNode(value) {
        if(!this.head) this.head = { value };
        else {
            let now = this.head;
            while(now.next) now = now.next;
            now = { value };
        }
        this.size++;
    }
    insertNode(value, index) {
        if(index < 0 && this.size <= index-1) return new Error('유효한 범위가 아닙니다.');
        
        let prev, now = this.head;
        if(!index) this.head = { value, next: now };
        else {
            while(index) prev = now, now = now.next, index--;
            prev.next = { value, next: now };
        }
        this.size++;
    }
    deleteNode(index) {
        if(index < 0 && this.size <= index) return new Error('유효한 범위가 아닙니다.');

        let prev, now = this.head;
        if(!index) this.head = now.next;
        else {
            while(index) prev = now, now = now.next, index--;
            prev.next = now.next;
        }
        this.size--;
        return now.value;
    }
    changeNode(value, index) {
        if(index < 0 && this.size <= index) return new Error('유효한 범위가 아닙니다.');

        let now = this.head;
        while(index) now = now.next, index--;
        now.value = value;
    }
    searchNode(value) {
        const nodes = [];
        let now = this.head, index = 0;
        
        while(index < this.size) {
            if(now.value === value) nodes.push(index);
            now = now.next, index++;
        }
        return nodes;
    }
}
/*
    풀이
    1. 연결리스트를 만들기 위해서 첫 노드를 탐색할 head와 연결리스트의 길이를 나타낼 size 멤버변수를 class로 구현한다.

    2. 이제 노드가 추가될 때를 구현한다. 노드가 추가될 경우를 나눠보면
        2-1. 노드가 존재하지 않는 경우, head === undefined 일 때 head에 value값과 같이 노드를 추가한다.
        2-2. 노드가 존재할 경우, next 포인터에 가리키는 노드가 있을 때 까지, 즉 tail까지 루프해야 한다.
        2-3. now변수에 head의 노드를 할당하고 next가 undefined일 경우 탈출하도록 while루프안에서 now = now.next로 재할당 한다.
        2-4. 루프가 종료되면 now가 tail.next를 가리키므로 now에 추가할 노드를 할당하고 length를 1누적한다.

    3. 특정 위치에 노드를 삽입하는 메서드를 추가한다. 필요한 인자로 value값 외에 특정위치인 index가 필요하다.
        3-1. 우선 유효하지 못한 인덱스가 입력으로 들어올 경우 에러메세지를 리턴한다.
        3-2. 삽입하는 노드의 이전 노드와 다음 노드의 위치를 할당한 변수가 필요하므로 prev, now = this.head
        3-3. index = 0 일 경우, head에 삽입할 노드를 할당하고 삽입노드의 next에 now를 할당한다.
        3-4. 해당 인덱스에 도달할 때 까지 index를 차감하며 루프하고 prev = now, now = now.next로 재할당 한다.
        3-5. 루프가 종료되면 삽입노드를 prev.next에 할당하고 삽입노드의 next에 now를 할당한다, size를 누적한다.
    
    4. index에 위치한 노드를 제거하는 메서드를 추가한다. 인자로 index만 필요하다.
        4-1. 제거할 노드를 찾기 위해 now = this.head를 할당한다.
        4-2. 우선 0과 size를 벗어날 경우 예외처리를 하고 index = 0 일 경우 head에 now.next를 할당한다.
        4-3. 해당 인덱스에 도달할 때 까지 index를 차감하며 루프하고 prev = now, now = now.next로 재할당 한다.
        4-4. 루프 종료 시 prev는 제거할 노드의 이전 노드가 되고 now는 제거할 노드 이므로 prev.next = now.next를 재할당 한다.
        4-5. now는 참조가 사라지고 now의 value 값은 리턴한다.
    
    5. index에 위치한 노드 값을 변경하는 메서드를 추가한다. value, index를 인자로 받는다.
        5-1. this.head를 now에 할당하고 index 만큼 루프 한 후 now.value에 입력받은 value를 할당한다.
    
    6. 해당 엘리먼트의 노드 위치를 찾는 메서드를 추가한다. insert와 delete를 위해 필요한 메서드로 value를 인자로 받는다.
        6-1. 해당 value값과 동일한 노드를 모두 찾는 방식으로 구현한다. 따라서, nodes 배열과 index = 0를 선언한다.
        6-2. now = this.head를 할당하고 while루프가 index < size 가 되도록 한 후 value값을 비교해 nodes에 push한다.
        6-3. now = now.next 로 계속 갱신하고 index도 1씩 누적시켜 루프 시킨다.
*/

//  이중 연결리스트 코드
class DoublyLinkedList {
    constructor() {
        this.head;
        this.tail;
        this.size = 0;
    }
    addFront(value) {
        this.head = this.head ?
        this.head.prev = { value, next: this.head } : this.tail = { value };
        this.size++;
    }
    addBack(value) {
        this.tail = this.tail ?
        this.tail.next = { value, prev: this.tail } : this.head = { value };
        this.size++;
    }
    insertNode(value, index) {
        if(index < 0 && this.size <= index-1) return new Error('유효한 범위가 아닙니다.');
        
        let prev, now = this.head;
        if(!index) this.head = { value, next: now };
        else {
            while(index) prev = now, now = now.next, index--;
            prev.next = { value, prev: prev, next: now };
        }
        this.size++;
    }
    deleteFront() {
        const data = this.head && this.head.value;
        if(this.head === this.tail) this.head = this.tail = undefined;
        else (this.head = this.head.next).prev = undefined, this.size--;
        return data;
    }
    deleteBack() {
        const data = this.tail && this.tail.value;
        if(this.tail === this.head) this.tail = this.head = undefined;
        else (this.tail = this.tail.prev).next = undefined, this.size--;
        return data;
    }
    deleteNode(index) {
        if(index < 0 && this.size <= index) return new Error('유효한 범위가 아닙니다.');

        let prev, now = this.head;
        if(!index) this.head = now.next;
        else {
            while(index) prev = now, now = now.next, index--;
            prev.next = now.next, now.next.prev = prev;
        }
        this.size--;
        return now.value;
    }
    printList() {
        let now = this.head, result = '';
        while(now.next) result += `${now.value} | `, now = now.next;
        return result + now.value;
    }
}
/*
    풀이
    1. 이중 연결리스트는 앞 뒤 탐색이 가능해야 하므로 노드에는 이전 포인터를 지정할 prev를 리스트에는 tail 멤버변수를 추가한다.
    
    2. 노드를 추가하는 addNode()는 head 이전과 tail 이후에 추가되는 addFront()와 addBack() 두 메소드로 나뉜다.
        2-1. addFront()는 head가 존재하지 않을 경우 tail도 같이 없기 때문에 둘다 동일한 노드를 삽입한다.
        2-2. head가 존재하면 head.prev에 새 노드를 할당하고 head를 새 노드의 next에 할당, 그리고 새 노드를 head에 할당한다.
        2-3. addBack()은 tail이 존재 하지 않은 경우가 head와 같다.
        2-4. tail이 존재하면 head의 반대로 tail.next에 새 노드 할당, 새 노드의 prev에 tail을 그리고 tail에 새 노드를 할당한다.
    
    3. insertNode()의 경우 head앞 추가는 단일방식과 동일하고 마지막 추가는 addBack()과 동일하기 때문에 그대로 유지한다.
        3-1. 중간에 추가되는 경우는 이전 주소를 가리키는 포인터 prev를 추가해 이전 노드를 할당해 준다.
    
    4. delete는 앞 뒤로 모두 제거 될 수 있도록 구현한다. deleteFront(), deleteBack()
        4-1. deleteFront() 와 deleteBack() 모두 head와 tail이 동일하면 두 멤버변수 모두 undefined를 할당한다.
        4-2. head는 head.next를 할당하고 prev를 undefined하고 tail은 head.prev를 할당하고 next를 undefined를 할당한다.
    
    5. deleteNode()의 경우 now.next.prev 포인터에 prev값을 할당해준다.

    6. changeNode()와 searchNode()는 단일 열결리스트와 동일하며, search의 경우 앞, 뒤로 구현이 가능하다.

    7. pirntList()를 추가해 현재 연결리스트의 모든 노드들의 vlaue를 연결된 순서대로 문자열로 출력한다.
*/
