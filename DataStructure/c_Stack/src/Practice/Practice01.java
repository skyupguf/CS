package Practice;

// Practice1
// 문자열 뒤집기

// 입출력 예시)
// 입력: "Hello"
// 출력: "OlleH"

// 입력: 1 3 5 7 9
// 출력: 9 7 5 3 1

import java.util.Stack;

public class Practice01 {
    public static String reverseString(String str) {
        if (str.length() == 0) {
            return null;
        }

        Stack<String> stack = new Stack<>();
        String result = "";

        for (String s : str.split("")) {
            stack.push(s);
        }

        while (!stack.isEmpty()) {
            result += stack.pop();
        }
        return result;

    }

    public static void main(String[] args) {
//      Test code
        String result = reverseString("Hello");
        System.out.println("result = " + result);

        result = reverseString("1 3 5 7 9");
        System.out.println("result = " + result);
    }
}
