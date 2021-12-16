//  문제요약
//  1. Heap을 구현하라.
//  2. 맴버 변수 : 완전 이진 트리를 배열로 저장할 heap 변수
//  3. 메서드
//      3-1. 부모노드가 될 인덱스를 구할 수 있어야 한다.
//      3-2. left 와 right의 자식노드가 될 인덱스를 구할 수 있어야 한다.
//      3-3. 노드의 위치를 부모와 바꾸기 위한 heapifyUp이 존재해야 한다.
//      3-4. 노드의 위치를 자식과 바꾸기 위한 heapofyDown이 존재해야 한다.
//      3-5. 노드를 삽입할 수 있어야 한다.
//      3-6. 노드를 추출할 수 있어야 한다.
//      3-7. 힙 정렬로 정렬을 수행할 수 있어야 한다.

// Max-heap 코드
class Heap {
    constructor() {
        this.heap = [];
    }

    getChildIndexL = (index) => (index * 2) + 1;
    getChildIndexR = (index) => (index * 2) + 2;
    getParentIndex = (index) => Math.floor(index - 1) / 2;

    
}
/*
    풀이
    1. heap을 할당할 멤버변수에 빈 배열을 할당해 선언한다.
    2. 힙의 배열특성에 맞춰 인덱스를 구하는 메서드를 구현한다.
        2-1. 입력받은 인덱스의 부모노드는 완전 이진 트리의 특성 상 left의 경우 (index-1)/2, right의 경우 (index-2)/2로 구한다.
        2-2. 입력받은 인덱스의 left자식 노드를 (index*2)+1로 구한다.
        2-3. 입력받은 인덱스의 right자식 노드를 (index*2)+2로 구한다.
    
    3. 
*/