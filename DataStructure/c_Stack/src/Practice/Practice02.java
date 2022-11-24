package Practice;

// Practice2
// 괄호 짝 검사

// 입출력 예시)
// 입력: "("
// 출력: Fail

// 입력: ")"
// 출력: Fail

// 입력: "()"
// 출력: Pass

import java.util.Stack;

public class Practice02 {
    public static void checkParenthesis(String str) {
        if (str == null || str.length() == 0) {
            return;
        }

        Stack<String> stack = new Stack<>();
        for (String s : str.split("")) {
            if (stack.isEmpty() && s.equals(")")) {
                stack.push(s);
                break;
            }
            if (s.equals("(")) {
                stack.push(s);
            } else {
                stack.pop();
            }
        }
        System.out.println(stack.size() == 0 ? "PASS!" : "FAIL!");
    }

    public static void main(String[] args) {
        // Test code
        checkParenthesis("(");          // FAIL!
        checkParenthesis(")");          // FAIL!
        checkParenthesis("()");         // PASS!
        checkParenthesis("()()()");     // PASS!
        checkParenthesis("(())()");     // PASS!
        checkParenthesis("(((()))");    // FAIL!
    }
}
