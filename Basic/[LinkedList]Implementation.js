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
            now.next = { value };
        }
        this.size++;
    }

    insertNode(value, index) {
        if(index < 0 || index >= this.size) return new Error('비유효한 범위');
        if(!this.size) return this.addNode(value);
        
        let now = this.head;
        if(!index) this.head = { value, next: now };
        else {
            let prev;
            while(index) prev = now, now = now.next, index--;
            prev.next = { value, next: now };
        }
        this.size++;
    }

    deleteNode(index) {
        if(index < 0 || index >= this.size) return new Error('비유효한 범위');

        let now = this.head;
        if(!index) this.head = now.next;
        else {
            let prev;
            while(index) prev = now, now = now.next, index--;
            prev.next = now.next;
        }
        this.size--;
        return now.value;
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

    printList() {
        let result = '', now = this.head;
        if(now) {
            while(now.next) {
                result += `${now.value} | `; 
                now = now.next;
            } 
            result += now.value;
        }
        return result;
    }
}
/*
    풀이
    1. 연결리스트를 만들기 위해서 첫 노드를 탐색할 head와 연결리스트의 길이를 나타낼 size 멤버변수를 class로 구현한다.

    2. 노드가 추가될 때를 구현한다. 노드가 추가될 경우를 나눠보면
        2-1. 노드가 존재하지 않는 경우, head === undefined 일 때 head에 value값과 같이 노드를 추가한다.
        2-2. 노드가 존재할 경우, next 포인터에 가리키는 노드가 있을 때 까지 루프해야 한다.
        2-3. now변수에 head의 노드를 할당하고 next가 undefined일 경우 탈출하도록 while루프안에서 now = now.next로 재할당 한다.
        2-4. 루프가 종료되면 now에 tail이 할당되며 now.next에 추가할 노드를 할당하고 length를 1누적한다.

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
    
    5. 해당 엘리먼트의 노드 위치를 찾는 메서드를 추가한다. insert와 delete를 위해 필요한 메서드로 value를 인자로 받는다.
        5-1. 해당 value값과 동일한 노드를 모두 찾는 방식으로 구현한다. 따라서, nodes 배열과 index = 0를 선언한다.
        5-2. now = this.head를 할당하고 while루프가 index < size 가 되도록 한 후 value값을 비교해 nodes에 push한다.
        5-3. now = now.next 로 계속 갱신하고 index도 1씩 누적시켜 루프 시킨다.

    6. 전체 노드 data를 문자열로 순서대로 리턴하는 메서드를 추가한다.
    
    에러핸들링
    1. addNode()에서 now.next에 node를 할당해야 next포인터에 할당된다.
    
    2. 유효범위는 index >= size가 되어야 유효하다.
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
        if(index < 0 || index >= this.size) return new Error('유효한 범위가 아닙니다.');
        
        let prev, now = this.head;
        if(!index) this.head = this.head.prev = { value, next: now };
        
        else {
            while(index) prev = now, now = now.next, index--;
            prev.next = now.prev = { value, prev: prev, next: now };
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
        if(index < 1 || index >= this.size-1) return new Error('유효한 범위가 아닙니다.');

        let prev, now = this.head;
        
        while(index) prev = now, now = now.next, index--;
        now.next.prev = prev, prev.next = now.next, this.size--;
        return now.value;
    }

    printList() {
        let result = '', now = this.head;
        if(now) {
            while(now.next) {
                result += `${now.value} | `; 
                now = now.next;
            } 
            result += now.value;
        }
        return result;
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
    
    3. insertNode()의 경우 head이전 추가는 head.prev에 value값과 next에 현재 head를 할당하고 head를 head.prev로 변경하면 된다.
        3-1. 중간에 추가되는 경우는 prev.next, 삽입 노드의 prev와 next, next.prev 3개의 노드에서 포인터의 변경이 있어야 한다.
        3-2. prev.next = now.prev 는 같은 노드를 가리키고 새 노드는 { value, prev: prev, next: now } 앞 뒤 포인터를 설정한다.

    4. delete는 앞 뒤로 모두 제거 될 수 있도록 구현한다. deleteFront(), deleteBack()
        4-1. deleteFront() 와 deleteBack() 모두 head와 tail이 동일하면 두 멤버변수 모두 undefined를 할당한다.
        4-2. head는 head.next를 할당하고 prev를 undefined하고 tail은 head.prev를 할당하고 next를 undefined를 할당한다.
    
    5. deleteNode()의 경우 front와 back을 따로 구현했으니 index 1부터 마지막 인덱스-1 까지의 범위로 한정한다.

    6. changeNode()와 searchNode()는 단일 열결리스트와 동일하며, search의 경우 앞, 뒤로 구현이 가능하다.

    7. pirntList()를 추가해 현재 연결리스트의 모든 노드들의 vlaue를 연결된 순서대로 문자열로 출력한다.
*/

//  원형 연결리스트 코드
class CircleLinkedList {
    constructor() {
        this.head;
        this.size = 0;
    }

    addNext(value) {
        if(!this.size) this.head = { value }, this.head.next = this.head;
        else {
            let now = this.head;
            while(now.next !== this.head) now = now.next;   
            now.next = { value, next: this.head };
        }
        this.size++;
    }

    addPrev(value, index) {
        if(index < 0 || index >= this.size) return new Error('비 유효한 범위');
        if(!this.size) return this.addNext(value);
        
        let prev, now = this.head, i = index;
        
        if(index) {
            while(i) prev = now, now = now.next, i--;
            prev.next = { value, next: now };
        } else {
            while(now.next !== this.head) now = now.next;
            this.head = { value, next: this.head }, now.next = this.head;
        }
        this.size++;
    }

    deleteNode(index) {
        if(index < 0 || index >= this.size) return new Error('비 유효한 범위');
        if(!this.size) return new Error('존재하지 않는 노드');
        
        let prev, now = this.head, i = index;
        if(this.size === 1) this.head = undefined;

        else if(index) {
            while(i) prev = now, now = now.next, i--;
            prev.next = now.next === this.head ? this.head : now.next;
        } else {
            prev = this.head;
            while(now.next !== this.head) now = now.next;
            this.head = this.head.next, now.next = this.head;
            now = prev;
        }
        this.size--;
        return now.value;
    }

    printList() {
        let result = '', now = this.head;
        if(now) {
            while(now.next !== this.head) {
                result += `${now.value} | `; 
                now = now.next;
            } 
            result += now.value;
        }
        return result;
    }
}
/*
    풀이
    1. 노드추가에서 원형 참조가 일어나는 next 포인터는 head이전 삽입과 tail이후의 삽입이 있다.
        1-1. tail 이후 삽입은 addNode()에서 발생하며, 마지막 노드 next에 head를 추가하기 위해 node.next === head가 되기전까지 탐색해야 한다.
        1-2. 첫 노드가 존재하지 않을 경우 루프 조건을 만족하려면 첫 노드의 next 포인터가 자기 자신을 가리키게 한다.
        1-3. 노드가 존재할 경우 node.next !== head 일 동안 루프해 마지막 노드뒤에 삽입하고 next에 head를 할당한다.
        1-4. head 이전 삽입은 insertNode()에서 발생하며, 만일 노드가 존재하지 않을 경우 addNode()를 호출해 노드를 생성한다.
        1-5. while루프를 인덱스만큼 순회해서 prev에 이전 노드 now에 삽입 노드를 할당한다.
        1-6. 인덱스가 0인 경우 while루프로 node.next !== this.head 로 tail까지 이동하고 새로 삽입된 head를 now.next에 할당한다.
    
    2. 노드 삭제 시 head를 삭제하는 경우와 tail을 삭제하는 경우에 따라서 next에 head를 재할당 해줘야 한다.
        2-1. 우선 노드가 존재하지 않으면 에러처리를 해주고 노드가 하나일 경우 size = 1, head = undefined로 노드를 삭제한다.
        2-2. 노드가 중간에서 삭제되거나 tail에서 삭제되는 경우는 index가 1이상인 경우다.
        2-3. while루프로 이전노드와 삭제할 노드를 prev와 now에 할당하고 now.next === head 가 true면 prev.next = head를 아니면 now.next할당한다.
        2-4. 인덱스가 0일 경우 while루프를 node.next !== this.head 까지 루프해서 head에 head다음 노드를 할당하고 now.next에 head를 재할당한다.
    
    3. search나 change의 경우 동일하므로 생략한다.
    
    리팩토링
    1. addNode()는 현재 존재하는 노드의 뒤에 생성, insertNode()는 존재하는 노드의 앞에 생성
        1-1. 조금 더 직관적으로 메서드 명을 addNext()와 addPrev()로 변경
        1-2. index가 0일 경우와 아닐 경우 while루프가 달라야 한다, 분기로 두 while문이 구분되게 나눠준다.
    
    2. deleteNode() 에서 예외처리를 모두 위로 이동시키고 add메서드 처럼 while문을 확실히 분기해 준다.
*/