package a_Implement;


// 양방향 연결 리스트 (Doubly Linked List) 구현
class NodeBi {
    int data;
    NodeBi prev;
    NodeBi next;

    NodeBi (int data, NodeBi prev, NodeBi next) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList extends LinkedList {
    NodeBi head;
    NodeBi tail;

    DoublyLinkedList (NodeBi node) {
        this.head = node;
        this.tail = this.head;
    }

    boolean isEmpty () {
        return this.head == null;
    }

    void addData (int data, Integer prevData) {
        if (this.isEmpty()) {
            this.head = this.tail = new NodeBi(data, null, null);

        } else if (prevData == null) {
            this.tail = this.tail.next = new NodeBi(data, this.tail, null);

        } else if (this.head.data == prevData) {
            this.head = this.head.prev = new NodeBi(data, null, this.head);

        } else {
            NodeBi cur = this.head;
            NodeBi prev = cur;
            while (cur != null) {
                if (cur.data == prevData) {
                    cur.prev = prev.next = new NodeBi(data, prev, cur);
                }
                prev = cur;
                cur = cur.next;
            }

        }
    }

    void removeData (int data) {
        if (this.isEmpty()) {
            System.out.println("List is empty!");
            return;
        }

        NodeBi cur = this.head;
        NodeBi prev = cur;
        while (cur != null) {
            if (cur.data == data) {
                if (this.head == this.tail) {
                    this.head = this.tail = null;

                } else if (this.head == cur) {
                    this.head = cur.next;
                    this.head.prev = null;

                } else if (this.tail == cur) {
                    this.tail = cur.prev;
                    this.tail.next = null;

                } else {
                    cur.next.prev = prev;
                    prev.next = cur.next;
                }
                return;
            }
            prev = cur;
            cur = cur.next;
        }
        System.out.println("Data not existed!");
    }

    void showData() {
        if (this.isEmpty()) {
            System.out.println("List is empty!");
            return;
        }

        NodeBi cur = this.head;
        while (cur != null) {
            System.out.print(cur.data + " ");
            cur = cur.next;
        }
        System.out.println();
    }

    void showDataFromTail() {
        if (this.isEmpty()) {
            System.out.println("List is empty!");
            return;
        }

        NodeBi cur = this.tail;
        while (cur != null) {
            System.out.print(cur.data + " ");
            cur = cur.prev;
        }
        System.out.println();
    }
}



public class Implement03 {
    public static void main(String[] args) {

//      Test code
        DoublyLinkedList myList = new DoublyLinkedList(new NodeBi(1, null, null));
        myList.showData();          // 1

        myList.addData(2, null);
        myList.addData(3, null);
        myList.addData(4, null);
        myList.addData(5, null);
        myList.showData();          // 1 2 3 4 5
        myList.showDataFromTail();  // 5 4 3 2 1

        myList.addData(100, 1);
        myList.addData(200, 2);
        myList.addData(300, 3);
        myList.addData(400, 4);
        myList.addData(500, 5);
        myList.showData();          // 100 1 200 2 300 3 400 4 500 5
        myList.showDataFromTail();  // 5 500 4 400 3 300 2 200 1 100

        myList.removeData(300);
        myList.removeData(100);
        myList.removeData(500);
        myList.removeData(200);
        myList.removeData(400);
        myList.showData();          // 1 2 3 4 5
        myList.showDataFromTail();  // 5 4 3 2 1

        myList.removeData(3);
        myList.removeData(1);
        myList.removeData(5);
        myList.removeData(2);
        myList.removeData(6);       // Data not existed!
        myList.removeData(4);
        myList.showData();          // List is empty!
        myList.showDataFromTail();  // List is empty!
    }
}
