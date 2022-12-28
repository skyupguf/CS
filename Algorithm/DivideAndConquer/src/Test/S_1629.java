package Test;
// 곱셈 (https://www.acmicpc.net/problem/1629)
/*
*   자연수 A를 B번 곱한 수를 알고 싶다. 단 구하려는 수가 매우 커질 수 있으므로 이를 C로 나눈 나머지를 구하는 프로그램을 작성하시오.

    입력
    1. 첫째 줄에 A, B, C가 빈 칸을 사이에 두고 순서대로 주어진다. A, B, C는 모두 2,147,483,647 이하의 자연수이다.
    10 11 12

    출력
    첫째 줄에 A를 B번 곱한 수를 C로 나눈 나머지를 출력한다.
    4

*   풀이과정
*   입력되는 모든 수가 최대 maximum 값으로 단순 제곱 계산으로는 처리할 수 없으므로 수학적 지식이 필요하다.
*   1. 지수 법칙 : A^(B) = A^(a + b) = A^a * A^b
*   2. 모듈러 성질 : (A * B) % C = ((A % C) * (B % C)) % C
*
*   지수분할 과정을 분할하면서 적용하면
*   10^11 = (10^5) * (10^5) * (10^1)
*           (10^2 * 10^2 * 10^1) * (10^2 * 10^2 * 10^1) * (10^1)
*           ((10^1 * 10^2) * (10^1 * 10^2) * 10^1) * ((10^1 * 10^2) * (10^1 * 10^2) * 10^1) * (10^1)
*
*   지수를 계속 곱해서 리턴하면 최대수가 맥시멈이므로 오버플로우가 될 수 있다.
*
*   따라서, 모듈러 성질을 적용하면
*   1. 홀수면 10^5일 경우 (10^2 * 10^2 % m) * 10^1 % m
*   2. 짝수면 10^2 * 10^2 % m
* */

import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;


public class S_1629 {

    public static long calPowAndMod (long i, long e, long m) {
        // 지수를 분할해 최소단위인 1일 경우 그대로 정수 i를 리턴한다. 10^1
        if (e == 1) {
            return i % m;
        }

        // 지수가 짝수일 경우나 홀수일 경우 둘 다 지수를 절반으로 분할하는 건 마찬가지이므로 2로 나눠 재귀호출 한다.
        // 둘 로 나눠 분할정복할 필요가 없는 이유는 두 경우로 나눠지는 경우가 완전히 동일하기 때문이다.
        // 따라서, 재귀홀된 값을 변수에 할당하고 이를 곱해 리턴하면 된다. 10^4 = 10^2 * 10^2 로 한쪽만 구하면 된다.
        long incomplete = calPowAndMod(i, e/2, m);

        // 홀수일 경우 정수 i를 추가로 곱해 리턴한다.
        // 10^5 = 10^2 * 10^2 * 10^1
        if (e % 2 == 1) {
            return (incomplete * incomplete % m) * i % m;
        }

        // 짝수로 분할된 경우 한쪽에서만 구한 결과를 제곱하면 된다.
        return incomplete * incomplete % m;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        long A = Integer.parseInt(st.nextToken());
        long B = Integer.parseInt(st.nextToken());
        long C = Integer.parseInt(st.nextToken());

        System.out.println(calPowAndMod(A, B, C));
    }
}
