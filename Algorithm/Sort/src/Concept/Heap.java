package Concept;

// 알고리즘 - 정렬 ()

import java.util.Arrays;

public class Heap {
    static int[] arr;

    public static void heapSort () {
        //  힙 정렬을 한 번 수행했으면 루트에 위치한 최대 노드를 가장 마지막 노드와 교환하고 마지막 노드를 탐색하지 못하게 한다.
        int lastIndex = arr.length - 1;
        while (lastIndex > 0) {
            //  노드가 루트와 왼쪽 자식 노드 2개만 존재할 경우, -1이 되므로 0을 할당하도록 한다.
            int parentIndex = lastIndex > 1 ? lastIndex/2 - 1 : 0;
            heapify(parentIndex, lastIndex);
            swap(0, lastIndex);
            lastIndex--;
        }
    }

    //  힙을 이용해 부모노드와 둘 중 더 큰 자식노드를 교환
    //  마지막 부모노드부터 시작하므로 parentIndex 를 하나씩 줄여가며 재귀호출
    public static void heapify (int parentIndex, int lastIndex) {
        int leftIndex = parentIndex * 2 + 1;
        //  오른쪽 자식 노드가 존재하지 않을 경우 인덱스 에러가 나므로 최대 인덱스보다 클 경우 왼쪽과 동일한 인덱스 할당
        int rightIndex = parentIndex * 2 + 2 <= lastIndex ? parentIndex * 2 + 2 : leftIndex;
        int maxIndex = arr[leftIndex] >= arr[rightIndex] ? leftIndex : rightIndex;

        if (arr[parentIndex] < arr[maxIndex]) {
            swap(parentIndex, maxIndex);
        }
        if (parentIndex == 0) { return; }
        heapify(parentIndex - 1, lastIndex);
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
