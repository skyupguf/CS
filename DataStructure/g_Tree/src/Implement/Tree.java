package Implement;

// Practice3
// 트리 구조 복습 / 구현

import java.util.LinkedList;
import java.util.Queue;

class Node2 {
    char data;
    Node2 left;
    Node2 right;
    Node2 parent;

    Node2 (char data, Node2 left, Node2 right, Node2 parent) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

class BinaryTree3 {
    Node2 root;

    BinaryTree3 (char[] arr) {
        Node2[] nodes = new Node2[arr.length];
        for (int i = 0; i < arr.length; i++) {
            nodes[i] = new Node2(arr[i], null, null, null);
        }

        for (int i = 0; i < arr.length; i++) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            if (left < arr.length) {
                nodes[i].left = nodes[left];
                nodes[left].parent = nodes[i];
            }
            if (right < arr.length) {
                nodes[i].right = nodes[right];
                nodes[right].parent = nodes[i];
            }
        }
        this.root = nodes[0];
    }

    Node2 findNode (char data) {
        Queue<Node2> queue = new LinkedList<>();
        queue.add(this.root);

        Node2 visitNode = null;
        while (!queue.isEmpty()) {
            visitNode = queue.poll();
            if (visitNode.data == data) { break; }
            if (visitNode.left != null) { queue.add(visitNode.left); }
            if (visitNode.right != null) { queue.add(visitNode.right); }
        }
        return visitNode;
    }

    Integer checkSize (char data) {
        Node2 node = this.findNode(data);
        Queue<Node2> queue = new LinkedList<>();
        queue.add(node);

        int size = 0;
        while (!queue.isEmpty()) {
            Node2 cur = queue.poll();

            if (cur.left != null) {
                queue.offer(cur.left);
                size++;
            }
            if (cur.right != null) {
                queue.offer(cur.right);
                size++;
            }
        }
        return size + 1;
    }
}

public class Tree {

    public static void main(String[] args) {
        char[] arr = new char[10];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (char)('A' + i);
        }

        BinaryTree3 bt = new BinaryTree3(arr);

        // Root node
        System.out.println(bt.root.data);

        // B's child node
        Node2 B = bt.findNode('B');
        if (B.left != null) {
            System.out.println("B's left child : " + B.left.data);
        }
        if (B.right != null) {
            System.out.println("B's right child : " + B.right.data);
        }

        // F's parent node
        Node2 F = bt.findNode('F');
        if (F.parent != null) {
            System.out.println("F's left child : " + F.parent.data);
        }

        // Leaf node
        for (int i = 0; i < arr.length; i++) {
            Node2 leaf = bt.findNode((char)('A' + i));

            if (leaf != null) {
                if (leaf.left == null && leaf.right == null) {
                    System.out.print(leaf.data + " ");
                }
            }
        }
        System.out.println();

        // E's Depth
        Node2 E = bt.findNode('E');
        int depth = 0;
        while (E.parent != null) {
            E = E.parent;
            depth++;
        }
        System.out.println("E's depth : " + depth);

        // Level2 Node
        for (int i = 0; i < arr.length; i++) {
            Node2 target = bt.findNode((char)('A' + i));
            int level = 0;
            Node2 cur = target;
            while (cur.parent != null) {
                level++;
                cur = cur.parent;
            }
            if (level == 2) {
                System.out.print(target.data + " ");
            }
        }
        System.out.println();

        // Height
        Node2 start = bt.root;
        int height = 0;
        int cnt = 0;
        for (int i = 0; i < arr.length; i++) {
            Node2 cur = bt.findNode((char)('A' + i));
            while (cur.parent != null) {
                cnt++;
                cur = cur.parent;
            }
            height = Math.max(height, cnt);
            cnt = 0;
        }
        System.out.println("Height : " + height);

        // B's Size
        System.out.println("B's Size : " + bt.checkSize('B'));

    }
}
