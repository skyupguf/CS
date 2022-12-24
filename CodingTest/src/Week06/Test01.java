package Week06;
/*
*   시간순으로 나열된 데이터 values 배열에서 가장 오랫동안 단조 증가가 이루어진 구간을 찾아 {시작인덱스, 끝인덱스}의 형식으로 출력하라.
*   동일 길이의 구간이 존재할 경우 가장 먼저 나온 구간으로 출력한다.
*   또한, 전체 구간에서 단조 증가하는 구간이 없는 경우 {0, 0}으로 출력한다.

    입력
    0 < values.length <= 100000

    출력
    {4, 8}
* */

import java.util.Arrays;


public class Test01 {

    public static int[] solution (int[] values) {

        int[] result = new int[2];

        // 두개의 포인터를 사용해 시작 구간부터 더 이상 커지지 않는 구간까지 비교한다.
        int p1 = 0, p2 = 1;
        int maxInterval = 0;
        int intervalCnt = 0;
        int intervalMaxNum = values[p1];

        while (p2 < values.length) {
            // p2가 values 를 초과하면 index 에러가 발생한다, 값의 증가가 끝날 때 까지 intervalMaxNum와 intervalCnt 갱신
            while (p2 < values.length && intervalMaxNum < values[p2]) {
                intervalMaxNum = values[p2++];
                ++intervalCnt;
            }
            // 이전 저장한 구간과 비교 후 클 경우 구간 저장, 인덱스를 결과에 할당, p2는 1 증가된 상태이미르 1차감해서 할당
            if (maxInterval < intervalCnt) {
                result[0] = p1;
                result[1] = --p2;
                maxInterval = intervalCnt;
            }
            // p2가 values 를 초과할 경우 탐색이 종료된 상태이므로 코드를 실행하지 못하도록 한다.
            if (p2 < values.length) {
                intervalCnt = 0;
                p1 = p2;
                ++p2;
                intervalMaxNum = values[p1];
            }
        }
        return result;
    }

    // 리팩토링
    public static int[] solution2 (int[] values) {
        int left = 0;
        int right = 0;
        int[] result = {left, right};

        while (left < values.length-1) {

            for (int i = left; i < values.length-1; i++) {

                if (values[i] >= values[i+1]) {
                    right = i;
                    break;
                }
                right = i + 1;
            }

            if (result[1] - result[0] < right - left) {
                result = new int[] {left, right};
            }
            left = right + 1;
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {103, 152, 124, 165, 152, 154, 159, 160, 200, 195, 205, 206, 204, 189, 156};
        System.out.println(Arrays.toString(solution(arr)));
        System.out.println(Arrays.toString(solution2(arr)));

        arr = new int[] {5};
        System.out.println(Arrays.toString(solution(arr)));
        System.out.println(Arrays.toString(solution2(arr)));

        arr = new int[] {100, 80, 60, 40, 20, 0};
        System.out.println(Arrays.toString(solution(arr)));
        System.out.println(Arrays.toString(solution2(arr)));

        arr = new int[] {10, 20, 30, 40, 50, 60};
        System.out.println(Arrays.toString(solution(arr)));
        System.out.println(Arrays.toString(solution2(arr)));

        arr = new int[] {100, 170, 120, 130, 105, 113};
        System.out.println(Arrays.toString(solution(arr)));
        System.out.println(Arrays.toString(solution2(arr)));
    }
}
