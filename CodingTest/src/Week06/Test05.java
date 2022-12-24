package Week06;
/*
*   학생들에게 퀴즈를 풀게 하여 각 학생의 점수를 scores[i]에 기록하였다.
*   학생들을 순서대로 일렬로 세워둔 후, 학생의 점수에 따라 다음과 같은 규칙대로 초코렛을 나눠주려 한다.
*   1. 최소 1개 이상의 초코렛은 각 학생에게 나누어 주어야 한다.
*   2. 바로 인접한 두 친구보다 점수가 높다면, 더 많은 초코렛을 받아야 한다.
*   3. 높지 않다면 더 많은 초코렛을 받을 필요가 없다.
*   위 조건을 만족하면서 최소로 초코렛을 나누어 줄 때, 각 학생이 받는 초코렛의 개수를 출력하라.

    입력
    0 < scores.length <= 1000000

    출력
    {1, 2, 3, 1, 2, 1, 2, 1}

*   풀이과정
*       1. 단조증가의 경우 계속해서 1씩 누적 증가시킨다.
*       2. 이전 값보다 작아지는 경우는 바로 1을 할당시킨다.
*       3. 다음 값이 더 작은 경우 왼쪽과 오른쪽의 값에 따라 달라진다.
*
*       3번의 경우를 해결하기 위해 우선 오른쪽으로 이동하면서 1, 2를 수행한다.
*       이후 다시 왼쪽으로 이동하면서 1, 2를 수행하는데 이 때 오른쪽 이동시 수행한 값과 비교해 더 큰 값을 할당한다.
* */

import java.util.Arrays;


public class Test05 {

    public static int[] solution (int[] scores) {
        int[] result = new int[scores.length];
        Arrays.fill(result, 1);

        for (int i = 0; i < scores.length - 1; i++) {
            if (scores[i+1] > scores[i]) {
                result[i+1] = result[i] + 1;
            }
        }

        for (int i = scores.length - 2; i >= 0; i--) {
            if (scores[i+1] < scores[i]) {
                result[i] = Math.max(result[i+1] + 1, result[i]);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] scores = {5, 2, 5, 3, 4, 1, 6, 5, 2, 5, 2, 3};    // [2, 1, 2, 1, 2, 1, 3, 2, 1, 2, 1, 2]
        System.out.println(Arrays.toString(solution(scores)));

        scores = new int[] {1, 3, 5, 4, 5, 5, 5, 1};    // [1, 2, 3, 1, 2, 1, 2, 1]
        System.out.println(Arrays.toString(solution(scores)));
    }
}
