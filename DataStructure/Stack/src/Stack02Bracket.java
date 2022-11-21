import java.util.ArrayList;
import java.util.List;

/**
 * 괄호
 * 여는 괄호와 닫는 괄호의 짝이 맞는 올바른 괄호를 VPS 라 한다.
 * (), (()), ()()(()), (((()))) 모두 VPS 에 해당되는 경우
 * )(, (())), ()()((), )))((( VPS 에 해당되지 않는 경우
 * 첫 째줄에 괄호 문자열의 개수가 주어지고 다음 줄부터 괄호 문자열이 개수만큼 주어질 때
 * 각 괄호문자열이 VPS 인지 아닌지 Yes, No를 출력하라.
 * https://www.acmicpc.net/problem/9012
 * */

/*
* 문제 접근 방법
*
* VPS가 성립되지 않는 경우
*   1. 닫는 괄호가 여는 괄호보다 앞에 오는 경우
*   2. 여는 괄호와 닫는 괄호의 수가 일치하지 않는 경
* */

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


// 일반 풀
//public class Stack02Bracket {
//
//    static boolean isVPS(String brackets) {
//
//        // 닫는 괄호와 여는 괄호를 각각 카운트 하는 변수를 선언한다.
//        int open = 0;
//        int close = 0;
//
//        // 입력받은 문자열을 각 문자로 배열화 한다.
//        char[] bracketArray = brackets.toCharArray();
//
//        for (char bracket : bracketArray) {
//
//            // 배열을 루프하면서 각 괄호에 맞는 카운트를 해준다.
//            if (bracket == '(') {
//                open++;
//            } else {
//                close++;
//            }
//
//            // 만일 카운트 중 닫는 괄호가 여는 괄호보다 많으면 VPS 가 아니므로 바로 false를 리턴한다.
//            if (open < close) {
//                return false;
//            }
//        }
//
//        // 여는 괄호가 더 많아서 성립이 되지 않을 수 있으므로 두 괄호를 비교해서 boolean 타입을 리턴한다.
//        return open == close;
//    }
//
//    public static void main(String[] args) {
//
//        Scanner sc = new Scanner(System.in);
//
//        int n = sc.nextInt();
//        sc.nextLine();
//
//        for (int i = 0; i < n; i++) {
//            String result = "NO";
//            String brackets = sc.nextLine();
//
//            if (isVPS(brackets)) {
//                result = "YES";
//            }
//            System.out.println(result);
//        }
//    }
//}


// 스택을 활용한 풀이
public class Stack02Bracket {

    static boolean isVPS(String brackets) {

        // 입력받은 문자열을 각 문자로 배열화 한다.
        char[] bracketArray = brackets.toCharArray();

        // 스택역할을 할 배열리스트를 생성한다.
        List<Character> stack = new ArrayList<>();

        for (char c : bracketArray) {

            // 스택이 비어있을 경우 닫는 괄호가 오면 바로 false 를 리턴한다.
            if (stack.size() == 0) {
                if (c == ')') {
                    return false;
                }
                stack.add(c);

            // 문자가 닫는 괄호면 스택의 마지막 여는괄호를 하나 제거한다.
            } else if (c == ')') {
                stack.remove(stack.size() - 1);

            // 문자가 여는 괄호면 스택에 추가해 준다.
            } else {
                stack.add(c);
            }
        }

        // 스택의 사이즈가 0이 아닐 경우 여는 괄호가 다는 괄호보다 많으므로 false 를 리턴한다.
        return stack.size() == 0;
    }


    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < n; i++) {
            String result = "NO";
            String brackets = sc.nextLine();

            if (isVPS(brackets)) {
                result = "YES";
            }
            System.out.println(result);
        }
    }
}