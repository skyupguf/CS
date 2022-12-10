package Practice;

/*
*   트라이 구조로 문자열을 삽입한다.
*   키 셋을 루프하면서 분기점을 찾으면 된다.
*       1. 루트노드에서 시작은 분기 상관없이 무조건 count+1
*       2. 분기
*       3. 터미널인 노드에 자식노드가 존재할 때, 자식노드 진입 시 count+1
*       4. 터미널을 만난 노드의 count 를 list 에 추가
* */


public class Practice05 {

    public static double solution(String[] words) {
        if (words == null || words.length == 0) {
            return 0;
        }

        Trie trie = new Trie();
        for (String word : words) { trie.insert(word); }

        double total = 0;
        for (String word : words) {
            total += countPressKey(trie.root, word, 0);
        }

        return total / words.length;
    }

    public static double countPressKey (Node node, String string, double count) {
        if (node == null || string == null || string.length() == 0) {
            return count;
        }

        for (int i = 0; i < string.length(); i++) {

            if (i == 0) {
                count++;
            } else if (node.child.keySet().size() > 1) {
                count++;
            } else if (node.isTerminal) {
                count++;
            }
            if (node.child.get(string.charAt(i)) != null) {
                node = node.child.get(string.charAt(i));
            } else {
                return count = 0;
            }
        }
        return count;
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
