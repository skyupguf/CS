package Week06;

public class Test04 {
    public static void main(String[] args) {
        int k = 3;
        int[] arr = {4, 2, 6, 4, 2, 3};
        int[] result = new int[arr.length-k+1];

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
        for (int i : result) {
            System.out.println(i);
        }
    }
}
