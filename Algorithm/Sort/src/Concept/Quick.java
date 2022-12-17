package Concept;

// 알고리즘 - 정렬 (퀵)

import java.util.Arrays;

public class Quick {
    static int[] arr;
    /*
    *   오름차순 퀵 소트 과정
    *   {6, 2, 7, 9, 4, 5, 8} 피벗 6설정
    *   {6, 2, 5, 9, 4, 7, 8} 5와 7교환
    *   {6, 2, 5, 4, 9, 7, 8} 4와 9교환
    *   {4, 2, 5, 6, 9, 7, 8} left >= right 6과 4교환, 6위치를 피벗
    *   {4, 2, 5} 재귀 호출후 위 정렬과정 반복
    *   {2, 4, 5} 4위치가 피벗
    *   {2}, {5} 는 left == right 이므로 바로 리턴
    *   {2, 4, 5, 6, 9, 7, 8} 로 복귀
    *   {9, 7, 8} 재귀 호출후 정렬과정 반복
    *   {8, 7, 9} 9위치가 피벗
    *   {8, 7} 재귀호출후 정렬과정 반복
    *   {7, 8} 8위치가 피벗
    *   {7}, {8}, {9}는 left == right 이로므 바로 리턴
    *   {2, 4, 5, 6, 7, 8, 9}
    * */
    public static void quickSort(int left, int right) {
        if (left >= right) { return; }
        int pivot = partition(left, right);
        quickSort(left, pivot-1);
        quickSort(pivot+1, right);
    }

    public static int partition(int left, int right) {
        int pivot = arr[left];
        int i = left;
        int j = right;

        while (i < j) {
            while (arr[j] > pivot && i < j) { j--; }
            while (arr[i] <= pivot && i < j) {i++; }
            swap(i, j);
        }
        swap(left, i);
        return i;
    }

    public static void swap(int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        arr = new int[]{6, 2, 7, 9, 4, 5, 8};
        quickSort(0, arr.length - 1);
        System.out.println("퀵 정렬: " + Arrays.toString(arr));
    }
}
