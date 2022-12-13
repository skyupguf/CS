package Concept;

// 알고리즘 - 정렬 (퀵)

import java.util.Arrays;

public class Quick {
    static int[] arr;
    //  재귀호출 과정 {6, 2, 7, 9, 4, 5, 8}
    //  {4, 2, 5, 6, 9, 7, 8} 피벗 값 3 도출
    //  {4, 2, 5}
    //  {2, 4, 5} 피벗 값 1 도출
    //  {2} 리턴
    //  {5} 리턴
    //  {9, 7, 8}
    //  {8, 7, 9} 피벗 값 2 도출
    //  {8, 7}
    //  {7, 8} 피벗 값 1 도출
    //  {7} 리턴
    //  {8} 리턴
    //  {9} 리턴
    //  {2, 4, 5, 6, 7, 8, 9}
    public static void quickSort(int left, int right) {
        if (left >= right) { return; }
        int pivot = partition(left, right);
        quickSort(left, pivot-1);
        quickSort(pivot+1, right);
    }

    //  i < left 여야 pivot 을 해당위치로 옮길 때 왼쪽 < pivot < 오른쪽 이 성립된다.
    public static int partition(int left, int right) {
        int pivot = arr[left];
        int i = left;
        int j = right;

        //  i == j 가 되면 자자기신을 스왑하므로 인덱스에 문제가 발생하지 않는다.
        while (i < j) {
            while (arr[j] > pivot && i < j) { j--; }
            while (arr[i] <= pivot && i < j) { i++; }
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
