package Practice;

/*
*   트라이 구조로 문자열을 삽입한다.
*   키 셋을 루프하면서 자동완성 분기를 찾는다.
*       1. 루트에서 자식노드의 키로 진입할 때 해당 자식노드로 진입할 때 count+1
*       2. 자식노드가 존재할 때 키 셋을 루프, 자식노드의 키로 진입할 때 count+1
*       3. 터미널인 노드에 자식노드가 존재할 때, 자식노드 진입 시 count+1
*       4. 터미널을 만난 노드의 count 를 list 에 추가
* */

import java.util.ArrayList;

public class Practice05 {

    public static double solution(String[] words) {
        if (words == null || words.length == 0) {
            return 0;
        }

        Trie trie = new Trie();
        for (String word : words) { trie.insert(word); }

        double total = 0;
        for (String word : words) {
            total += countPressKey(word, 0, trie.root);
        }

        return total / words.length;
    }

    public static double countPressKey(String string, double count, Node node) {

        return 0;
    }

    public static void main(String[] args) {
        // Test code
        String[] words = {"hell", "hello", "heaven", "java"};
        System.out.printf("%.2f\n", solution(words));   // (2 + 3 + 2 + 1) / 4 = 2.00

        words = new String[] {"abca", "abcb", "abcc"};  // (2 + 2 + 2) / 3 = 2.00
        System.out.printf("%.2f\n", solution(words));

        words = new String[] {"cloud", "cloudy", "rain", "rainy", "sun", "sunny"};
        System.out.printf("%.2f\n", solution(words));   // (1 + 2 + 1 + 2 + 1 + 2) / 6 = 1.50
    }
}
