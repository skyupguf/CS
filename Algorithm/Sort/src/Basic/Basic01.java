package Basic;

// 알고리즘 - 정렬_1

import java.util.Arrays;

public class Basic01 {
    // 오름차순 기준 정렬 알고리즘

    // 버블 정렬
    public static void bubbleSort(int[] arr) {
        int end = 1;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length-end; j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
            end++;
        }
    }

    // 삽입 정렬
    public static void insertionSort(int[] arr) {

    }

    // 선택 정렬
    private static void selectionSort(int[] arr) {

    }

    public static void main(String[] args) {
        // Test code
        int[] arr = {3, 5, 2, 7, 1, 4};
        bubbleSort(arr);
        System.out.println("버블 정렬: " + Arrays.toString(arr));

        arr = new int[]{3, 5, 2, 7, 1, 4};
        insertionSort(arr);
        System.out.println("삽입 정렬: " + Arrays.toString(arr));

        arr = new int[]{3, 5, 2, 7, 1, 4};
        selectionSort(arr);
        System.out.println("선택 정렬: " + Arrays.toString(arr));

    }
}
