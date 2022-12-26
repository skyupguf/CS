package Practice;
// Practice2
// 2차원 정수형 배열 lists 가 주어졌다.
// lists[i] 에는 각 링크드 리스트의 원소 정보가 들어 있고,
// 원소들은 오름차순 정렬된 상태이다.
// 모든 링크드 리스트를 하나의 정렬된 링크드 리스트로 합병하세요.

// 입출력 예시
// lists: {{2, 3, 9}, {1, 5, 7}, {3, 6, 7, 11}}
// 출력: 1 -> 2 -> 3 -> 3 -> 5 -> 6 -> 7 -> 7 -> 9 -> 11
/*
*   풀이 과정
*   우선 for 문 한 번으로 루프하기에는 배열안에 연결리스트의 존재가 가변이므로 불가능하다.
*
* */


class Node {
    int val;
    Node next;

    Node(int val) {
        this.val = val;
        this.next = null;
    }
}

public class Practice02 {
    static Node[] node;

    public static Node divideList (int left, int right) {
        if (left == right) {
            return node[left];
        }

        int mid = (left + right) / 2;
        Node leftList = divideList(left, mid);
        Node rightList = divideList(mid + 1, right);

        return combineList(leftList, rightList);
    }

    public static Node combineList (Node left, Node right) {
        if (left == null) {
            return right;
        }

        if (right == null) {
            return left;
        }

        Node node = new Node(0);
        Node cur = node;

        while (left != null && right != null) {

            if (left.val < right.val) {
                cur.next = left;
                left = left.next;
            } else {
                cur.next = right;
                right = right.next;
            }

            cur = cur.next;
        }

        if (left != null) {
            cur.next = left;
        } else if (right != null) {
            cur.next = right;
        }

        return node.next;
    }

    // 문제에 주어진 2차원 배열을 링크드 리스트로 구성
    public static void setUpLinkedList(int[][] lists) {
        for (int i = 0; i < lists.length; i++) {
            node[i] = new Node(lists[i][0]);
        }

        for (int i = 0; i < lists.length; i++) {
            Node cur = node[i];
            for (int j = 1; j < lists[i].length; j++) {
                cur.next = new Node(lists[i][j]);
                cur = cur.next;
            }
        }
    }

    // 결과 출력 부분
    public static void printList(Node node) {
        Node cur = node;
        while (cur.next != null) {
            System.out.print(cur.val + " -> ");
            cur = cur.next;
        }
        System.out.println(cur.val);
    }

    public static void main(String[] args) {
        // Test code
        int[][] lists = {{2, 3, 9}, {1, 5, 7}, {3, 6, 7, 11}};
        node = new Node[lists.length];

        setUpLinkedList(lists);
        Node combinedNode = divideList(0, node.length - 1);
        printList(combinedNode);
    }
}
