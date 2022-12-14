package Practice;

// 자바 기본 binarySearch

import java.util.Arrays;

public class Practice02 {
    public static void main(String[] args) {
        int[] arr = {1, 2, 5, 10, 20, 30, 40, 50, 60};

        System.out.println("=== 데이터가 있는 경우 ===");
        System.out.println(Arrays.binarySearch(arr, 1));
        System.out.println(Arrays.binarySearch(arr, 10));
        System.out.println(Arrays.binarySearch(arr, 30));
        System.out.println();
        System.out.println("=== 데이터가 없는 경우 ===");
        //  찾는 값보다 작은 값의 인덱스에 -1을 한 음수 값이 리턴된다.
        System.out.println(Arrays.binarySearch(arr, 130));
        System.out.println(Arrays.binarySearch(arr, 15));
        System.out.println(Arrays.binarySearch(arr, 35));
    }
}
