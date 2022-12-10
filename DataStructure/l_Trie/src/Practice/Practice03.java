package Practice;

// Practice3
// 문자열 배열 strs 와 targets 가 주어졌을 때
// targets 내의 단어 중 한 문자만 바꾸면 strs 중의 단어가 되는지 판별하는 프로그램을 작성하세요.

// 입출력 예시
// 입력 strs: "apple", "banana", "kiwi"
// 입력 target: "applk", "bpple", "apple"
// 출력: true, true, false


public class Practice03 {
    static String[] strings;
    static String[] targets;

    static void solution() {
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

    //  false 조건
    //      1. 모든 단어가 같은 경우
    //      2. 2개이상 단어가 다른 경우
    //      3. 해당 단어가 없는 경우
    //  true 조건
    //      1. 1개의 단어만 다른 경우 : flag 가 true 고 terminal 도 true 여야 한다.
    //  재귀호출을 조건으로 이용한 이유
    //      바로 리턴하면 백트래킹 이후 자식이 여러개일 경우 다른 노드들을 탐색할 수 없게 된다.
    static boolean examineWord (Node node, String target, int index, boolean flag) {
        if (index == target.length()) {
            return flag && node.isTerminal;
        }

        if (node.child.get(target.charAt(index)) != null) {
            if (examineWord(node.child.get(target.charAt(index)), target, index + 1, flag)) {
                return true;
            }
        }

        if (!flag) {
            for (char character : node.child.keySet()) {
                if (character != target.charAt(index) &&
                        examineWord(node.child.get(character), target, index + 1, true)) {
                    return true;
                }
            }
        }
        return false;
    }


    public static void main(String[] args) {
        // Test code
        strings = new String[]{"apple", "banana", "kiwi"};
        targets = new String[]{"applk", "bpple", "apple", "banan", "kiww", "aiwi"};
        solution();          // true,    true,    false,   false,   true,   true
    }
}
