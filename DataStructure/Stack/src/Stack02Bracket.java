/**
 * 괄호
 * 여는 괄호와 닫는 괄호의 짝이 맞는 올바른 괄호를 VPS 라 한다.
 * (), (()), ()()(()), (((()))) 모두 VPS 에 해당되는 경우
 * )(, (())), ()()((), )))((( VPS 에 해당되지 않는 경우
 * 첫 째줄에 괄호 문자열의 개수가 주어지고 다음 줄부터 괄호 문자열이 개수만큼 주어질 때
 * 각 괄호문자열이 VPS 인지 아닌지 Yes, No를 출력하라.
 * 문제링크 : https://www.acmicpc.net/problem/9012
 * */

/*
* 1. 문제 접근 방법
*
*   VPS 가 성립되지 않는 경우는 다음과 같다.
*     a. 닫는 괄호가 여는 괄호보다 앞에 오는 경우
*     b. 여는 괄호와 닫는 괄호의 수가 일치하지 않는 경우
*
*   결국 올바른 괄호쌍이 생성돼서 VPS 가 되는지 체크를 해봐야 한다.
*   문제는 항상 여는 괄호와 닫는 괄호가 바로 묶음으로 배치되지 않는 것이다.
*   예를 들어, (((()))) 의 경우 VPS 에 해당되지만 닫는 괄호가 모두 뒤에 오기 때문에 이 쌍을 확인하는 방법이 필요하다.
*
*   A. 스택을 활용한 접근
*       만일 스택 배열이 존재할 경우 스택의 top 위치에 괄호가 여는 괄호이고 현재 탐색중인 문자열이 닫는 괄호면 한 쌍이 된다.
*       stack = [(, (, (, (], 현재 탐색문자열 c = ) 이면
*       top 에 위치한 ( 를 pop 한다.
*       모든 탐색이 끝났고 stack 의 사이즈가 0이 아니라면 이는 여는 괄호가 더 많은 조건2와 같다.
*
*
* 2. 에러 핸들링
*
*   ) 를 stack 에 추가하지 않아야 하는데 문자열의 비교를 위해 stack 의 0번째에 무조건 문자열을 추가해줬다.
*   stack 의 size 가 0일 경우 첫 문자열을 추가할 때 ) 가 오면 무조건 VPS 가 아니다.
* */

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Stack02Bracket {

    // 스택을 활용한 풀이
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

        // 스택의 사이즈가 0이 아닐 경우 여는 괄호가 닫는 괄호보다 많으므로 false 를 리턴한다.
        return stack.size() == 0;
    }

    // 일반 풀이
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