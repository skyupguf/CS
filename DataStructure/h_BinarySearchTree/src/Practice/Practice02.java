package Practice;

// Practice2
// 주어진 BST 에서 노드 간의 차이값 중 최소 값을 구하세요.

// 입력 트리: 4, 2, 6, 1, 3
// 출력: 1

// 입력 트리: 5, 1, 48, null, null, 12, 51
// 출력: 3

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;

public class Practice02 {

    public static void solution(Integer[] data) {
        BinarySearchTree bst = new BinarySearchTree();

        for (int i = 0; i < data.length; i++) {
            if (data[i] == null) {
                continue;
            }
            bst.addNode(data[i]);
        }
        ArrayList<Integer> list = new ArrayList<>();
        levelOrder(bst.head, list);

        int min = Collections.min(list);
        System.out.println(min);
    }

    public static void levelOrder(Node node, ArrayList list) {
        Queue<Node> queue = new LinkedList<>();
        queue.add(node);

        while (!queue.isEmpty()) {
            Node cur = queue.poll();

            if (cur.left != null) {
                queue.offer(cur.left);
                list.add(Math.abs(cur.key - cur.left.key));
            }
            if (cur.right != null) {
                queue.offer(cur.right);
                list.add(Math.abs(cur.key - cur.right.key));
            }
        }
    }

    public static void main(String[] args) {
        // Test code
        Integer[] data = {3, 1, 4, null, 2};
        solution(data);

        data = new Integer[]{5, 1, 48, null, null, 12, 51};
        solution(data);
    }
}
