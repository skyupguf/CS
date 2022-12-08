package Implement;

// 비선형 자료구조 - 트라이 (Trie)

import java.util.HashMap;

class Node {
    HashMap<Character, Node> child;
    boolean isTerminal;

    Node () {
        this.child = new HashMap<>();
        this.isTerminal = false;
    }
}

class Trie {
    Node root;

    Trie () {
        this.root = new Node();
    }

    void insert (String str) {
        Node currentNode = root;

        for (char word : str.toCharArray()) {
            currentNode.child.putIfAbsent(word, new Node());
            currentNode = currentNode.child.get(word);
        }
        currentNode.isTerminal = true;
    }

    boolean search (String str) {
        Node currentNode = this.root;

        for (char word :  str.toCharArray()) {
            if (currentNode.child.containsKey(word)) {
                currentNode = currentNode.child.get(word);
            } else {
                return false;
            }
        }
        return currentNode.isTerminal;
    }

    void delete (String str) {
        boolean check = delete(root, str, 0);
        if (check) {
            System.out.println(str + " 삭제 완료");
        } else {
            System.out.println(str + " 단어가 없습니다.");
        }
    }

    boolean delete (Node node, String str, int idx)  {
        char word = str.charAt(idx);
        if (!node.child.containsKey(word)) {
            return false;
        }
        Node currentNode = node.child.get(word);
        idx++;

        if (idx == str.length()) {
            if (!currentNode.isTerminal) {
                return false;
            }
            currentNode.isTerminal = false;
            if (currentNode.child.isEmpty()) {
                node.child.remove(word);
            }
        } else {
            if (!delete(currentNode, str, idx)) {
                return false;
            }
            if (currentNode.isTerminal && currentNode.child.isEmpty()) {
                node.child.remove(word);
            }
        }
        return true;
    }
}

public class HashMapTrie {
    public static void main(String[] args) {
        // Test code
        Trie trie = new Trie();
        trie.insert("apple");
        trie.insert("april");
        trie.insert("app");
        trie.insert("ace");
        trie.insert("bear");
        trie.insert("best");
        System.out.println(trie.search("apple"));   // true
        System.out.println(trie.search("april"));   // true
        System.out.println(trie.search("app"));      // true
        System.out.println(trie.search("ace"));     // true
        System.out.println(trie.search("bear"));    // true
        System.out.println(trie.search("best"));    // true
        System.out.println(trie.search("abc"));     // false

        System.out.println();
        trie.delete("apple");
        System.out.println(trie.search("apple"));   // false
        System.out.println(trie.search("april"));   // true
        System.out.println(trie.search("appl"));    // false
        trie.delete("apple");
    }
}