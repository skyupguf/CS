package Practice;

// Practice3
// intervals 라는 구간으로 이루어진 배열이 주어졌을 때,
// 오버랩 되는 구간을 합치는 프로그램을 작성하세요.

// 입출력 예시
// 입력: [2, 6], [1, 3], [15, 18], [8, 10]
// 출력: [1, 6] [8, 10] [15, 18]

import java.util.ArrayList;
import java.util.Arrays;

public class Practice03 {

    static int[][] intervals;

    public static ArrayList<int[]> solution() {
        if (intervals == null || intervals.length < 2) {
            return new ArrayList<>();
        }

        quikSort(0, intervals.length-1);

        ArrayList<int[]> sorted = new ArrayList<>();
        sorted.add(intervals[0]);

        for (int i = 1; i < intervals.length; i++) {
            int[] top = sorted.get(sorted.size()-1);
            if (top[1] >= intervals[i][0]) {
                if (top[1] < intervals[i][1]) {
                    top[1] = intervals[i][1];
                    sorted.set(sorted.size()-1, top);
                }
            } else {
                sorted.add(intervals[i]);
            }
        }
        return sorted;
    }

    public static void quikSort(int left, int right) {
        if (left >= right) { return; }
        int pivot = partition(left, right);
        quikSort(left, pivot-1);
        quikSort(pivot+1, right);
    }

    public static int partition (int left, int right) {
        int pivot = intervals[left][0];
        int i = left;
        int j = right;

        while (i < j) {
            while (intervals[j][0] > pivot && i < j) { j--; }
            while (intervals[i][0] <= pivot && i < j) { i++; }
            swap(i, j);
        }
        swap(left, i);
        return i;
    }

    public static void swap (int i, int j) {
        int[] temp = intervals[i];
        intervals[i] = intervals[j];
        intervals[j] = temp;
    }

    public static void main(String[] args) {
        // Test code
        intervals = new int[][] {{2, 6}, {1, 3}, {15, 18}, {8, 10}};
        for (int[] item: solution()) {
            System.out.print(Arrays.toString(item) + " ");
        }
        System.out.println();

        intervals = new int[][] {{2, 6}, {1, 3}, {15, 18}, {8, 10}, {7, 11}};
        for (int[] item: solution()) {
            System.out.print(Arrays.toString(item) + " ");
        }
    }
}
