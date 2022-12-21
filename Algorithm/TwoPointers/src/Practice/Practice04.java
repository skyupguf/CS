package Practice;

// Practice
// 문자열 s 를 거꾸로 출력하는 프로그램을 작성하세요.
// 단, 각 단어의 알파벳 순서는 그대로 출력합니다.
// 문장에 공백이 여러개일 시, 단어와 단어 사이 하나의 공백을 제외한 나머지 공백은 제거하세요.

// 입출력 예시
// 문자열 s: "the sky is blue"
// 출력: "blue is sky the"

// 문자열 s: "  hello      java    "
// 출력: "java hello"


public class Practice04 {
    public static String solution(String s) {
        if (s == null) { return null; }
        if (s.length() < 2) { return s; }

        int i = s.length() - 1;
        int j = s.length() - 1;
        StringBuilder result = new StringBuilder();

        while (j >= 0) {

            while (j >= 0 && s.charAt(i) == ' ' && s.charAt(j) == ' ') {
                --i;
                --j;
            }
            if (j == -1) { break; }
            if (s.charAt(i) != ' ' && s.charAt(j) != ' ') {
                while (j >= 0 && s.charAt(j) != ' ') {
                    --j;
                }
                result.append(s.substring(j+1, i+1));
                result.append(" ");
                i = j;
            }
        }
        return result.toString().substring(0, result.length()-1);
    }

    public static void main(String[] args) {
        // Test code
        System.out.println(solution("the sky is blue"));
        System.out.println(solution("  hello      java    "));

    }
}
