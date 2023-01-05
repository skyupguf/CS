package Practice;
// Practice2
// 정수 n 이 주어졌을 때 아래의 연산을 통해 1로 만들려고 한다.
// 2로 나누어 떨어지면 2로 나누기
// 3으로 나누어 떨어지면 3으로 나누기
// 1 빼기
// 위의 연산을 통해 1로 만들 때 필요한 최소한의 연산 횟수를 출력하는 프로그램을 작성하세요.

// 입출력 예시
// n: 2
// 출력: 1

// n: 9
// 출력: 2

/*
*   풀이
*   연산 횟수를 각각 구해보면 아래와 같다.
*   0   1   2   3   4   5   6   7   8   9   10
*   0   0   1   1   2   3   2   3   3   2   3
*
*   위와 같이 배열을 만들어 보면 현재 수는 -1, /2, /3 을 한 위치에 이미 카운트해놓은 연산 횟수에 +1만 하면 된다.
*   3가지 경우 가장 작은 연산을 하는 경우만 조건으로 만들면 된다.
*
*   10을 예로 들어보면 10 - 1 = 9 / 3 = 3 / 3 = 1, 총 3회 연산을 하는게 가장 작다.
*   1. -1을 한 경우 위치의 연산 카운트
*   2. 2로 나눈 경우 위치의 연산 카운트
*   3. 3으로 나눈 경우 위치의 연산 카운트
*
*   3가지 조건의 모든 카운트를 구해서 비교해 가장 작은 수를 구하고 현재 위치에 +1을 해서 값을 할당한다.
* */

public class Practice02 {

    public static int solution(int n) {
        int[] arr = new int[n+1];

        for (int i = 2; i <= n; i++) {
            arr[i] = arr[i-1] + 1;

            if (i % 2 == 0) {
                arr[i] = Math.min(arr[i], arr[i/2] + 1);
            }
            if (i % 3 == 0) {
                arr[i] = Math.min(arr[i], arr[i/3] + 1);
            }
        }
        return arr[n];
    }


    public static void main(String[] args) {
        // Test code
        System.out.println(solution(2));    // 1
        System.out.println(solution(4));    // 2
        System.out.println(solution(9));    // 2
        System.out.println(solution(10));   // 3
    }
}
