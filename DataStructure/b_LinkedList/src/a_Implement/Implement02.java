package a_Implement;


// 단순 연결 리스트 구현 완성
class LinkedList2 extends LinkedList {

    LinkedList2(Node node) {
        this.head = node;
    }

    // 기준데이터 이전에 데이터를 삽입
    void addData (int data, int prevData) {

        if (this.head == null) {
            this.head = new Node(data, null);

        } else if (this.head.data == prevData) {
            this.head = new Node(data, this.head);

        } else {
            Node cur = this.head;
            Node prev = null;
            while (cur != null) {
                if (cur.data == prevData) {
                    prev.next = new Node(data, cur);
                    return;
                }
                prev = cur;
                cur = cur.next;
            }
            prev.next = new Node(data, null);
        }
    }

    // 주어진 데이터의 노드를 제거
    void removeData (int data) {
        if (this.isEmpty()) {
            System.out.println("List is empty!");
            return;
        }

        Node cur = this.head;
        Node prev = cur;

        while (cur != null) {
            if (cur.data == data) {
                if (cur == this.head) {
                    this.head = cur.next;
                } else {
                    prev.next = cur.next;
                }
                return;
            }
            prev = cur;
            cur = cur.next;
        }
        System.out.println("Data not existed!");
    }
}


public class Implement02 {
    public static void main(String[] args) {

//      Test code
        LinkedList2 myList = new LinkedList2(new Node(1, null));
        myList.showData();         // 1

        myList.addData(2);
        myList.addData(3);
        myList.addData(4);
        myList.addData(5);
        myList.showData();         // 1 2 3 4 5

        myList.addData(100, 1);
        myList.addData(200, 2);
        myList.addData(300, 3);
        myList.addData(400, 4);
        myList.addData(500, 5);
        myList.showData();         // 100 1 200 2 300 3 400 4 500 5

        myList.removeData(300);
        myList.removeData(100);
        myList.removeData(500);
        myList.removeData(200);
        myList.removeData(400);
        myList.showData();         // 1 2 3 4 5

        myList.removeData(3);
        myList.removeData(1);
        myList.removeData(5);
        myList.removeData(2);
        myList.removeData(6);      // Data not existed!
        myList.removeData(4);
        myList.showData();         // List is empty!

    }
}