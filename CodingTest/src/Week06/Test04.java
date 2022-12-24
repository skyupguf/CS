package Week06;
/*
*   슬라이딩 윈도우 최댓값은 연속된 k개의 값의 최댓값을 한칸씩 이동하면서 구하는 기법이다.
*   예를 들어, 주어진 입력이 아래와 같다고 하자.
--------------------------------------------------------------------------
    arr = [1, 3, 0, 2, 1, 2]
    k=3인 슬라이딩 윈도우와 그 최댓값은 아래와 같이 계산된다.

    [1, 3, 0, 2, 1, 4]
    [1, 3, 0]           -> 3
       [3, 0, 2]        -> 3
          [0, 2, 1]     -> 2
             [2, 1, 4]  -> 4

    result = [3, 3, 2, 4]
--------------------------------------------------------------------------
*   슬라이딩 윈도우 최댓값 알고리즘을 작성하라.

    입력
    0 < len(arr) <= 100000
    0 < k <= 10000

    출력
    슬라이딩 윈도우 최댓값이 담긴 정수 배열
* */

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;


public class Test04 {

    public static int[] solution (int[] arr, int k) {
        int[] result = new int[arr.length - k + 1];

        int max = Integer.MIN_VALUE;
        int maxP = 0;

        for (int i = 0; i < k; i++) {
            if (max < arr[i]) {
                max = arr[i];
                maxP = i;
            }
        }
        result[0] = max;

        int start = 1;
        int end = k;
        while (end < arr.length) {

            if (maxP < start) {
                max = Integer.MIN_VALUE;
                for (int i = start; i <= end; i++) {
                    if (max < arr[i]) {
                        max = arr[i];
                        maxP = i;
                    }
                }
            } else {
                if (max < arr[end]) {
                    max = arr[end];
                    maxP = end;
                }
            }
            result[start] = max;
            start++;
            end++;
        }
        return result;
    }
    // 리팩토링
    public static int[] solution2 (int[] arr, int k) {
        int[] result = new int[arr.length - k + 1];

        PriorityQueue<Integer> window = new PriorityQueue<>(Comparator.reverseOrder());
        int end = Math.min(k, arr.length);

        for (int i = 0; i < end; i++) {
            window.offer(arr[i]);
        }
        result[0] = window.peek();

        for (int i = 1; i < result.length; i++) {
            window.remove(arr[i-1]);
            window.offer(arr[i+end-1]);
            result[i] = window.peek();
        }

        return result;
    }

    public static void main(String[] args) {
        int k = 3;
        int[] arr = {4, 2, 6, 4, 2, 3};
        System.out.println(Arrays.toString(solution(arr, k)));
        System.out.println(Arrays.toString(solution2(arr, k)));
    }
}
