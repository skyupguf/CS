package Concept;

// 알고리즘 - 정렬 (힙)

import java.util.Arrays;

public class Heap {
    static int[] arr;

    public static void heapSort () {
        for (int i = arr.length / 2 - 1; i >= 0; i--) {
            heapify(i, arr.length);
        }

        for (int i = arr.length - 1; i > 0; i--) {
            swap(0, i);
            heapify(0, i);
        }
    }

    public static void heapify (int parent, int size) {
        int left = parent * 2 + 1;
        int right = parent * 2 + 2;
        int max = parent;

        if (left < size && arr[left] > arr[max]) {
            max = left;
        }
        if (right < size && arr[right] > arr[max]) {
            max = right;
        }
        if (max != parent) {
            swap(max, parent);
            heapify(max, size);
        }
    }

    public static void swap (int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main (String[] args) {
        // Test code
        arr = new int[]{3, 5, 2, 7, 1, 4, 6};
        heapSort();
        System.out.println("힙 정렬: " + Arrays.toString(arr));
    }
}
