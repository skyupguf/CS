package Practice;

// Practice4
// 두 문자열 비교
// 단, #은 backspace 로 바로 이전의 문자를 삭제하는 기능이라고 가정

// 입출력 예시
// 입력: s1 = "tree", s2 = "th#ree"
// 출력: true

// 입력: s1 = "ab#a", s2 = "aab#"
// 출력: true

// 입력: s1 = "wo#w", s2 = "ww#o"
// 출력: false


import java.util.Arrays;
import java.util.Stack;

public class Practice04 {


    public static String doBackspace (String s) {
        Stack<Character> stack = new Stack<>();
        for (Character c : s.toCharArray()) {
            if (c == '#' && !stack.isEmpty()) {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        return String.valueOf(stack);
    }
    public static boolean stringCompare(String s1, String s2) {
        String s1After = doBackspace(s1);
        String s2After = doBackspace(s2);
        return s1After.equals(s2After);
    }

    public static void main(String[] args) {
        // Test code
        String s1 = "tree";
        String s2 = "th#ree";
        System.out.println(stringCompare(s1, s2));

        s1 = "ab#a";
        s2 = "aab#";
        System.out.println(stringCompare(s1, s2));

        s1 = "wo#w";
        s2 = "ww#o";
        System.out.println(stringCompare(s1, s2));
    }
}
