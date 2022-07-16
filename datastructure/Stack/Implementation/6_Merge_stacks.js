/*
//  문제요약  //
    O(1)의 시간복잡도로 병합이 가능한 Merge stack을 설계하라.

    1. Merge stack은 다음 기능을 필수로 지원해야 한다.
        1-1. push(data): data를 스택에 추가한다.
        1-2. pop(): 스택에서 top에 위치한 data를 제거한다.
        1-3. merge(s2): 스택 s2를 현재 스택의 후위에 병합한다.

    2. merge 기능은 아래와 같이 작동해야 한다.
        s1 = [1, 2, 3], s2 = [4, 5, 6]
        s1.merge(s2) => output : 1 2 3 4 5 6
    
    3. 모든 연산의 시간 복잡도는 O(1)이어야 한다.


//  접근방법  //
    배열이나 객체를 활용하면 merge시 인덱스의 재배열이 일어나므로 O(N)의 시간복잡가 소요된다.
    따라서 순차배열을 이용하지 않고 포인터로 주소를 연결하도록 연결리스트를 활용한다.

    단순하게 스택구현을 하면 top위치를 pop하면 되므로 prev포인터만 존재하면 된다.
    하지만 합병은 전달받은 인자의 head를 이전 스택의 top에 할당해야 하므로 next포인터가 필요하다.
    따라서, 이중연결리스트로 구현해야 한다.
*/

/*  코드  */
class Node {
    constructor (data) {
        this.prev = null;
        this.data = data;
        this.next = null;
    }
}
/*
    1. 이중 연결리스트를 위해 두개의 포인터 변수를 사용한다.
*/
class Merge_stack {
    constructor (size) {
        this.head = null;
        this.tail = null;
        this.check = 0;
        this.size = size;
    }
/*
    2. 생성한 노드들을 할당할 변수들을 선언한다.
        2-1. 가장 우선 들어온 노드가 처음 위치할 head를 선언한다.
        2-2. tail은 스택의 top으로 가장 나중에 들어오는 노드가 위치 해야한다.
        2-3. 현재 존재하는 노드의 개수를 체크할 변수를 선언한다.
*/
    push (data) {
        if (!data) return;
        if (this.check >= this.size) return new Error('stack overflow');
        
        const node = new Node(data);
        if (!this.check){
            this.head = this.tail = node;
        
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.check++;
    }
/*
    3. check변수로 오버플로우체크를 우선한다.
    4. 삽입할 노드를 생성하고 스택에 노드가 없을 경우 head와 tail이 동일하므로 같은 node를 할당한다.
    5. 스택에 노드가 존재하면 생성한 노드의 prev에는 tail이 tail의 next에는 node가 연결되어야 한다.
*/
    pop () {
        if (!this.check) return new Error('stack underflow');
        
        const data = this.tail.data;
        if (this.check === 1) {
            this.head = this.tail = null;
        
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.check--;
        return data;
    }
/*
    6. 추출할 노드인 tail의 데이터를 변수 data에 할당해 놓는다.
    7. 우선 스택에 데이터가 하나만 존재할 경우 head와 tail모두 null값으로 변경해 준다.
    8. 노드가 2개이상 존재하면 tail에 위치한 노드를 추출해야 하므로 tail.prev를 tail에 할당하고 할당한 tail의 next를 null로 변경한다.
*/
    merge (s) {
        if (!s.head) return new Error('That list does not exist');
        
        s.head.prev = this.tail;
        this.tail.next = s.head;
        this.tail = s.tail;

        this.check += s.check;
        this.size += s.size;
    }
/*
    9. 인자 s는 node가 할당된 리스트 형태여야 하므로 head를 확인해 에러처리를 해준다.
    10. 인자 s의 리스트가 현재 스택의 뒤에 합병되어야 하므로 this.tail.next에 s.head를 연결해주고 tail을 s의 tail로 변경한다.
*/
    top () {
        return this.tail.data;
    }
}
//  시간복잡도  //
//  모든 작업은 포인터를 통해 이뤄지므로 O(1)