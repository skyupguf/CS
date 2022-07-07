/*
//  문제요약  //
    중간 데이터를 리턴하고 추출할 수 있는 스택을 구현하라.
    
    1. 스택의 데이터 수가 짝수일 경우 두 개의 중간 데이터 중 하나만 추출하도록 구현한다.
        1-1. push(), pop(), Mid(), popMid()의 메서드들이 기본적으로 존재해야 한다.

    2. 모든 메서드는 O(N)의 시간 복잡도가 소요되면 안된다.


//  접근방법  //
    스택을 배열로 구현할 경우 중간 데이터를 추출하면 O(N)의 시간복잡도가 소요된다.
    또한, 객체로 구현할 경우 인덱스 역할인 key를 전부 갱신해줘야 하므로 마찬가지로 O(N)이 소요된다.

    따라서, 해당 스택의 경우는 한 저장 공간에 순차적으로 저장하는 방식이 아닌 포인터를 이용한 리스트로 구현한다.
    리스트로 구현하면 특정 포인터의 노드가 제거 되더라도 인덱스 수정을 할 필요가 없으므로 O(N)이 소요되지 않는다.
*/

/*  코드  */
class Node {
    constructor (data) {
        this.prev = null;
        this.data = data;
        this.next = null;
    }
}

class Mid_stack {
    constructor (size) {
        this.top = null;
        this.mid = null;
        this.check = 0;
        this.size = size || Number.MAX_SAFE_INTEGER;
    }
/*
    1. 스택 리스트에 추가할 노드를 생성하는 class를 먼저 구현한다.
        1-1. 일반적인 스택이 아닌 중간 노드인 mid 노드를 찾을 수 있어야 하므로 이중 연결리스트로 구현한다.

    2. 리스트형태로 스택을 구현하는데 필요한 멤버변수들을 구성한다.
        2-1. 스택에 노드가 추가될 때 최상단을 표시할 top, 중간을 표시할 mid를 각각 선언하고 null을 할당한다.
        2-2. 오버플로우와 mid측정을 위해 현재 사이즈를 표시할 check변수와 스택크기를 할당할 size 변수를 선언한다.
*/
    push (data) {
        if (this.check >= this.size) return new Error('stack overflow');
        
        const node = new Node(data);
        if (!this.check) {
            this.top = this.mid = node;
        } else {
            node.prev = this.top;
            this.top = this.top.next = node;
        }
        this.check++;
        if (this.check % 2 === 0) this.mid = this.mid.next;
    }
/*
    3. push메서드는 우선 check와 size로 오버플로우 체크를 한 후 Node class로 추가할 노드를 생성해 node변수에 할당해 놓는다.
        3-1. 노드의 추가는 현재 스택에 노드가 존재하지 않으면 top과 mid가 동일하기 때문에 생성한 node를 바로 할당한다.
        3-2. 스택에 노드가 존재하면 생성한 노드를 스택 리스트의 가장 후미에 연결해 주고 top으로 변경해준다.
            a. 생성한 node의 prev에 현재 top인 노드를 할당하고 top의 next에는 node를 할당해 양방향 연결을 한다.
            b. 그리고 생성한 node를 top으로 변경해준다.

        3-3. 추가된 노드를 포함해 mid를 변경해야 하므로 check를 우선 1누적한다.
        3-4. mid는 노드가 짝수개 또는 홀수개가 될 때 한 번만 변경해 주면 된다.
            a. 여기선 노드가 짝수개가 됐을 때 mid값을 다음 노드로 변경하도록 한다.
*/
    pop () {
        if (!this.check) return new Error('stack underflow');
        
        const data = this.top.data;
        if (this.check === 1) {
            this.top = this.mid = null;
        } else {
            this.top = this.top.prev;
            this.top.next = null;
        }
        this.check--;
        if (this.check % 2) this.mid = this.mid.prev;
        return data;
    }
/*
    4. pop 메서드는 언더플로우 체크후 추출할 top의 data를 미리 변수에 할당해 놓는다.
        4-1. 스택에 단일 노드만 있는 경우 top과 mid가 동일하므로 모두 null을 할당한다.
        4-2. 스택에 노드가 2개이상일 때 top을 top.prev로 변경하고 변경한 top의 next를 null을 할당한다.
        4-3. 추출할 노드를 제거했으면 check를 1차감하고 단일 노드일 때와 겹치지 않도록 노드가 홀수일 때 이전 mid로 변경한다.
*/
    popMid () {
        if (!this.check) return new Error('stack underflow');

        const data = this.mid.data;
        if (this.check === 1) {
            this.top = this.mid = null;

        } else if (this.check === 2) {
            this.top = this.mid = this.top.prev;
            this.top.next = null;

        } else {
            this.mid.prev.next = this.mid.next;
            this.mid.next.prev = this.mid.prev;

            if (this.check % 2) this.mid = this.mid.next;
            else this.mid = this.mid.prev;
        }
    }
/*
    5. popMid는 중간 노드를 제거해야 하므로 mid의 변경 뿐만 아니라 리스트형태를 유지하기 위한 포인터 작업이 필요하다.
        5-1. 언더플로우 체크 후 추출할 mid의 데이터는 먼저 할당해 놓는다.
        5-2. pop과 다르게 중간 노드를 제거하기 때문에 노드가 2개 이하인 경우까지 분기해서 처리한다.
            a. 단일 노드일 경우 pop과 결과가 동일하다.
            b. 노드가 2개일 경우 mid는 2번째 노드이므로 top과 mid에 모두 top.prev값을 할당하고 top의 next를 null 처리한다.
        
    6. 노드가 3개 이상이면 mid값을 제거하기 위해 mid의 prev와 next에 위치한 포인터를 양 방향으로 연결해 준다.
        6-1. mid의 이전노드 next포인터에 mid의 다음 노드를 할당한다.
        6-2. mid의 다음노드 prev포인터에 mid의 이전 노드를 할당한다.
        6-3. 미드를 제거했으면 mid가 되는 노드를 찾아야 한다.
            a. 노드의 개수가 짝수면 2개의 중간노드 중 후자가 되도록 mid.next를 할당한다.
            b. 노드의 개수가 홀수면 제거된 mid이전이 중간이 되므로 mid.prev를 할당한다.
*/
    last () {
        return this.top.data;
    }

    Mid () {
        return this.mid.data;
    }
}

//  시간복잡도  //
//  리스트를 이용하고 중간값을 찾기 위해 루프를 이용하지 않으므로 모든 메서드는 O(1)의 복잡도에서 실행된다.