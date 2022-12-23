package Test;
//  잃어버린 괄호 (https://www.acmicpc.net/problem/1541)
/*
*   양수, +, - 로 구성된 식을 괄호를 이용해 최소값을 만드는 프로그램을 작성하시오.
*
*   입력 1. 첫째 줄에 식이 주어진다. 식은 ‘0’~‘9’, ‘+’, 그리고 ‘-’만으로 이루어져 있고, 가장 처음과 마지막 문자는 숫자이다.
*          그리고 연속해서 두 개 이상의 연산자가 나타나지 않고, 5자리보다 많이 연속되는 숫자는 없다. 수는 0으로 시작할 수 있다.
*          입력으로 주어지는 식의 길이는 50보다 작거나 같다.
*
*   출력 1. 첫째 줄에 정답을 출력한다.
*
*   풀이과정
*       +는 순서가 어떻게 오든 다른 계산에 영향을 주지 않으므로 그냥 더해줘도 된다.
*       여기서 합의 단계를 가르는 부분은 -가 올 때다.
*       -가 나올 경우 -끼리는 계산해도 되지만 -와 +를 계산하면 수가 줄어든다.
*
*       예를 들어, 55 + 50 - 40 + 20 - 30 + 40 + 20 - 30 - 60 + 70 일 경우 최소값 괄호가 복잡해 보이지만
*       - 를 기준으로 +들을 전부 괄호치면 (55 + 50) - (40 + 20) - (30 + 40 + 20) - 30 - (60 + 70)
*       첫 구간을 제외하고 전부 음수로 만들어 최소값을 구할 수 있다.
*
*       "-"를 기준으로 문자열을 나누고 subSum 함수를 통해 동일 구간의 문자열을 전부 합해서 첫 합은 total에 할당하고
*       두 번째 합부터 total 에서 차감한다.
* */

import java.io.*;
import java.util.StringTokenizer;


public class S_1541 {

    public static int subSum (String subStr) {
        StringTokenizer plus = new StringTokenizer(subStr, "+");
        int sum = 0;
        while (plus.countTokens() != 0) {
            sum += Integer.parseInt(plus.nextToken());
        }
        return sum;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer minus = new StringTokenizer(br.readLine(), "-");

        int total = subSum(minus.nextToken());
        while (minus.countTokens() != 0) {
            total -= subSum(minus.nextToken());
        }

        bw.write(total + "");
        bw.flush();
        bw.close();
    }
}
