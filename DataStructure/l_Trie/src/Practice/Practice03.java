package Practice;

// Practice3
// 문자열 배열 strs 와 targets 가 주어졌을 때
// targets 내의 단어 중 한 문자만 바꾸면 strs 중의 단어가 되는지 판별하는 프로그램을 작성하세요.

// 입출력 예시
// 입력 strs: "apple", "banana", "kiwi"
// 입력 target: "applk", "bpple", "apple"
// 출력: true, true, false


public class Practice03 {
    public static void solution(String[] strings, String[] targets) {
        Trie trie = new Trie();
        for (String str : strings) {
            trie.insert(str);
        }

        for (String target : targets) {
            boolean result = examineWord(trie.root, target, 0, false);
            System.out.println(result + " ");
        }
        System.out.println();
    }

    public static boolean examineWord(Node node, String target, int i, boolean flag){

    }

    public static void main(String[] args) {
        // Test code
        String[] strs = {"apple", "banana", "kiwi"};
        String[] targets = {"applk", "bpple", "apple", "banan", "kiww"};
        solution(strs, targets);    // true, true, false, false, true
    }
}
