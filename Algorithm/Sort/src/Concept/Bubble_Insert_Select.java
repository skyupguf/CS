package Concept;

// 알고리즘 - 정렬 (버블, 삽입, 선택)

import java.util.Arrays;

public class Bubble_Insert_Select {
    // 오름차순 기준 정렬 알고리즘

    // 버블 정렬 : 하나 씩 모든 수를 비교해 가장 큰 수를 뒤로 배치, 가장 뒤 수는 더이상 탐색x
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

    // 삽입 정렬 : 기준 수를 한 칸씩 이전으로 옮기면서 이전 수와 비교해 정렬하고 정렬할 필요가 없는 경우 바로 탈출
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            for (int j = i; j > 0; j--) {
                if (arr[j] < arr[j-1]) {
                    int temp = arr[j];
                    arr[j] = arr[j-1];
                    arr[j-1] = temp;
                } else {
                    break;
                }
            }
        }
    }

    // 선택 정렬 : 순서대로 특정 한 수의 위치를 선택해서 그 위치의 수와 전체 비교하고 교환, 교환된 위치는 더 이상 탐색x
    private static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            int minIndex = i;
            for (int j = i+1; j < arr.length-1; j++) {
                if (arr[minIndex] > arr[j]) {
                    minIndex = j;
                }
            }
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
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
