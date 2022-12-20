package Practice;

// 알고리즘 - 투 포인터
// for-loop vs two pointers
// 부분 배열에서 합이 타겟값과 동일한 구간찾기

import java.util.ArrayList;
import java.util.Arrays;

public class Practice01 {
    static ArrayList<int[]> result;

    public static void forLoop(int[] arr, int target) {
        result = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {
            int[] interval = {-1, 1};
            int sum = 0;

            for (int j = i; j < arr.length; j++) {
                sum += arr[j];
                if (sum == target) {
                    interval[0] = i;
                    interval[1] = j;
                    result.add(interval);
                }
                if (sum >= target) { break; }
            }
        }
    }

    public static void twoPointers(int[] arr, int target) {
        result = new ArrayList<>();

        int p1 = 0, p2 = 0;
        int sum = 0;

        while (true) {
            if (sum > target) {
                sum -= arr[p1++];
            } else if (sum < target && p2 >= arr.length) {
                break;
            } else if (p2 < arr.length) {
                sum += arr[p2++];
            }
            if (sum == target) {
                int[] interval = {-1, 1};
                interval[0] = p1;
                interval[1] = p2 - 1;
                result.add(interval);
                sum -= arr[p1++];
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 5, 3, 7, 2, 4, 3, 2};
        forLoop(arr, 9);
        for (int[] interval : result) {
            System.out.print(Arrays.toString(interval) + " ");
        }
        System.out.println();

        forLoop(arr, 14);
        for (int[] interval : result) {
            System.out.print(Arrays.toString(interval) + " ");
        }
        System.out.println();

        twoPointers(arr, 9);
        for (int[] interval : result) {
            System.out.print(Arrays.toString(interval) + " ");
        }
        System.out.println();

        twoPointers(arr, 14);
        for (int[] interval : result) {
            System.out.print(Arrays.toString(interval) + " ");
        }
    }
}
