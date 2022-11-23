package a_Implement;


// 원형 연결 리스트 (Circular Linked List) 구현
class CircularLinkedList {
    NodeBi head;
    NodeBi tail;

    CircularLinkedList (NodeBi node) {
        this.head = this.tail = node;
        node.next = node.prev = this.head;
    }

    boolean isEmpty() {
        return this.head == null;
    }

    // 연결 리스트에 데이터 추가
    // before_data 가 null 인 경우, 가장 뒤에 추가
    // before_data 에 값이 있는 경우, 해당 값을 가진 노드 앞에 추가
    void addData (int data, Integer prevData) {
        if (this.isEmpty()) {
            this.head = this.tail = new NodeBi(data, this.head, this.head);

        } else if (prevData == null) {
            this.head.prev = this.tail = this.tail.next = new NodeBi(data, this.tail, this.head);

        } else if (this.head.data == prevData) {
            this.tail.next = this.head = this.head.prev = new NodeBi(data, this.tail, this.head);

        } else {
            NodeBi cur = this.head;
            NodeBi prev = cur;
            do {
                if (cur.data == prevData) {
                    cur.prev = prev.next = new NodeBi(data, prev, cur);
                }
                prev = cur;
                cur = cur.next;
            } while (cur != this.head);
        }
    }

    //  연결 리스트에서 특정 값을 가진 노드 삭제
    void removeData(int data) {
        if (this.isEmpty()) {
            System.out.println("List is empty!");
            return;
        }

        NodeBi cur = this.head;
        NodeBi prev = cur;
        do {
            if (cur.data == data) {
                if (this.head == this.tail) {
                    this.head = this.tail = null;

                } else if (this.head == cur) {
                    this.tail.next = this.head = cur.next;
                    this.head.prev = this.tail;

                } else if (this.tail == cur) {
                    this.head.prev = this.tail = cur.prev;
                    this.tail.next = this.head;

                } else {
                    cur.next.prev = prev;
                    prev.next = cur.next;
                }
                return;
            }
            prev = cur;
            cur = cur.next;
        } while (cur != this.head);
        System.out.println("Data not existed!");
    }

    void showData () {
        if (this.isEmpty()) {
            System.out.println("List is empty!");
            return;
        }

        NodeBi cur = this.head;
        do {
            System.out.print(cur.data + " ");
            cur = cur.next;

        } while (cur != this.head);
        System.out.println();
    }

}

public class Implement04 {
    public static void main(String[] args) {
        // Test code
        CircularLinkedList myList = new CircularLinkedList(new NodeBi(1, null, null));
        myList.addData(2, null);
        myList.addData(3, null);
        myList.addData(4, null);
        myList.addData(5, null);
        myList.showData();  // 1 2 3 4 5

        myList.addData(100, 1);
        myList.addData(200, 2);
        myList.addData(300, 3);
        myList.addData(400, 4);
        myList.addData(500, 5);
        myList.showData();  // 100 1 200 2 300 3 400 4 500 5

        myList.removeData(300);
        myList.removeData(100);
        myList.removeData(500);
        myList.removeData(200);
        myList.removeData(400);
        myList.showData();          // 1 2 3 4 5

        myList.removeData(3);
        myList.removeData(1);
        myList.removeData(5);
        myList.removeData(2);
        myList.removeData(6);       // Data not existed!
        myList.removeData(4);
        myList.showData();          // List is empty!
    }
}
