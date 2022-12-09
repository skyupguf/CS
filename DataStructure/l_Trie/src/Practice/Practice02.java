package Practice;

// Practice2
// 문자열 배열 dictionary 와 문자열 sentence 가 주어졌을 때
// sentence 내의 단어 중 dictionary 의 단어로 시작하는 경우
// 해당 단어로 변경하여 출력하는 프로그램을 작성하세요.

// 입출력 예시
// 입력 dictionary: "cat", "bat", "rat"
// 입력 sentence = "the cattle was rattled by the battery"
// 출력: "the cat was rat by the bat"

// 입력 dictionary: "a", "b", "c"
// 입력 sentence = "apple banana carrot water"
// 출력: "a b c water"


public class Practice02 {
    public static void solution(String[] dictionary, String sentence) {
        Trie trie = new Trie();
        for (String word : dictionary) {
            trie.insert(word);
        }

        StringBuilder result = new StringBuilder();
        for (String word : sentence.split(" ")) {
            Node currentNode = trie.root;

            StringBuilder stringBuilder = new StringBuilder();
            for (char character : word.toCharArray()) {
                if (currentNode.child.get(character) != null) {
                    currentNode = currentNode.child.get(character);
                    stringBuilder.append(character);
                    if (currentNode.isTerminal) { break; }
                } else {
                    stringBuilder = new StringBuilder(word);
                    break;
                }
            }
            result.append(stringBuilder);
            result.append(" ");
        }
        System.out.println(result);
    }


    public static void main(String[] args) {
        // Test code
        String[] dictionary = {"cat", "bat", "rat"};
        String sentence = "the cattle was rattled by the battery";
        solution(dictionary, sentence);

        dictionary = new String[]{"a", "b", "c"};
        sentence = "apple banana carrot water";
        solution(dictionary, sentence);
    }
}
