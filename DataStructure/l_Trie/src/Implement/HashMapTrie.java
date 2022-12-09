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
    boolean find;

    Trie () {
        this.root = new Node();
    }

    void insert (String str) {
        Node currentNode = this.root;

        for (char character : str.toCharArray()) {
            currentNode.child.putIfAbsent(character, new Node());
            currentNode = currentNode.child.get(character);
        }
        currentNode.isTerminal = true;
    }

    boolean search (String str) {
       Node currentNode = this.root;

       for (char character : str.toCharArray()) {
           if (currentNode.child.get(character) != null) {
               currentNode = currentNode.child.get(character);
           } else {
               return false;
           }
       }
       return currentNode.isTerminal;
    }

    void delete (String str) {
        find = false;
        if (delete(root, str, 0)) {
            System.out.println(str + " 삭제 완료");
        } else {
            System.out.println(str + " 없는 단어");
        }
    }

    // 재귀 설명
    // 탈출은 str 의 길이가 idx 가 되면 탐색이 끝난다.
    //  1. terminal 이면 단어가 존재
    // 단어를 찾았을 경우 노드를 삭제 여부의 기준
    //  1. 찾은 단어의 마지막 노드는 일단 삭제하고 현재 노드가 터미널이면 삭제하면 안된다.
    //  2. 터미널이 아니어도 다른 자식 노드가 존재하면 삭제하면 안된다.
    //  3. 이외의 경우 전부 삭제한다.
    boolean delete (Node node, String str, int idx)  {
        if (idx == str.length()) {
            if (!node.isTerminal) {
                return false;
            }
            node.isTerminal = false;
            find = true;
            return node.child.isEmpty();
        }

        char character = str.charAt(idx);
        idx++;
        if (node.child.get(character) != null) {
            if (delete(node.child.get(character), str, idx)) {
                node.child.remove(character);
                if (node.isTerminal) {
                    return false;
                }
                return node.child.isEmpty();
            }
        }
        return idx == 1 && find;
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
        System.out.println(trie.search("app"));     // true
        System.out.println(trie.search("ace"));     // true
        System.out.println(trie.search("bear"));    // true
        System.out.println(trie.search("best"));    // true
        System.out.println(trie.search("abc"));     // false

        System.out.println();
//        trie.delete("app");
        trie.delete("apple");
        System.out.println(trie.search("app"));     // true
        System.out.println(trie.search("apple"));   // false
        System.out.println(trie.search("april"));   // true
        System.out.println(trie.search("appl"));    // false
        trie.delete("app");
        System.out.println(trie.search("app"));     // false
        System.out.println(trie.search("april"));   // true
    }
}