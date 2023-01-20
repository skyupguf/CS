package Week10;


import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class Test03 {
    static int[][] total;
    static class Node {
        int key;
        Node left;
        Node right;

        Node(int key, Node left, Node right) {
            this.key = key;
            this.left = left;
            this.right = right;
        }
    }

    static class BinarySearchTree {
        Node head;

        BinarySearchTree() {}
        BinarySearchTree(int key) {
            this.head = new Node(key, null, null);
        }

        public void addNode(int key) {
            this.head = this.addNode(this.head, key);
        }

        public Node addNode(Node cur, int key) {
            if (cur == null) {
                return new Node(key, null, null);
            }

            if (key < cur.key) {
                cur.left = addNode(cur.left, key);
            } else {
                cur.right = addNode(cur.right, key);
            }

            return cur;
        }
    }

    static void sortTotalArray(int n, int[][] left, int[][]right) {
        total = new int[n-1][2];
        int i = 0;
        while (i < left.length) {
            total[i] = left[i++];
        }
        int j = 0;
        while (i < total.length) {
            total[i++] = right[j++];
        }
        Arrays.sort(total, (x, y) -> x[0] == y[0] ? x[1] - y[1] : x[0] - y[0]);
    }

    static int[] solution(int n, int[][] left, int[][]right) {
        BinarySearchTree bst = new BinarySearchTree();
        bst.head = new Node(total[0][0], null, null);
        for (int[] ints : total) {
            bst.addNode(ints[1]);
        }

        int[] result = new int[n];
        Queue<Node> queue = new LinkedList<>();
        Stack<Node> stack = new Stack<>();
        queue.offer(bst.head);

        while (!queue.isEmpty()) {
            Node node = queue.poll();
            stack.push(node);
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        int i = 0;
        while (!stack.isEmpty()) {
            result[i++] = stack.pop().key;
        }
        return result;
    }

    public static void main(String[] args) {
        int N = 6;
        int[][] left = {{0, 1}, {1, 5}, {2, 3}};
        int[][] right = {{0, 2}, {3, 4}};
        System.out.println(Arrays.toString(solution(N, left, right)));
    }
}