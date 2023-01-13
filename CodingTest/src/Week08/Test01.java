package Week08;
//
/*
*
* */

import java.util.Arrays;
import java.util.TreeMap;

public class Test01 {
    static int[][] total;


    static int solution (int[] start, int[] end, int[] price) {
        total = new int[start.length][];

        for (int i = 0; i < start.length; i++) {
            total[i] = new int[] {start[i], end[i], price[i]};
        }
        Arrays.sort(total, (x, y) -> x[1] - y[1]);

        TreeMap<Integer, Integer> dp = new TreeMap<>();
        dp.put(0, 0);

        for (int[] arr : total) {
            int V = arr[2] + dp.floorEntry(arr[0]).getValue();
            if (V > dp.lastEntry().getValue()) {
                dp.put(arr[1], V);
            }
        }
        return dp.lastEntry().getValue();
    }


    public static void main(String[] args) {
        int[] start = {1, 5, 10, 6, 5};
        int[] end = {5, 6, 12, 9, 12};
        int[] price = {10, 40, 30, 20, 50};


        System.out.println(solution(start, end, price));    // 100
    }
}
