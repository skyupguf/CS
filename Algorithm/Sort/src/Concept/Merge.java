package Concept;

// 알고리즘 - 정렬 (합병)

import java.util.Arrays;

public class Merge {
    static int[] arr;
    static int[] tmp;

    //  재귀호출되는 전과정 {3, 5, 2, 7, 1, 4, 6}
        //  01. {3, 5, 2, 7}
        //  02. {3, 5} left < right 이므로 나눠지지 않음
        //  03. {3, 5} 정렬
        //  04. {3, 5, 2, 7}로 다시 돌아옴
        //  05. {2, 7} left < right 이므로 나눠지지 않음
        //  06. {2, 7} 정렬
        //  07. {3, 5, 2, 7}로 다시 돌아옴
        //  08. {2, 3, 5, 7} 정렬
        //  09. {2, 3, 5, 7, 1, 4, 6}로 다시 돌아옴
        //  10. {1, 4, 6}
        //  11. {1, 4} left < right 이므로 나눠지지 않음
        //  12. {1, 4} 정렬
        //  13. {1, 4, 6}으로 다시 돌아옴
        //  14. {6} left < right 이므로 나눠지지 않음
        //  15. {1, 4, 6}으로 다시 돌아옴
        //  16. {1, 4, 6} 정렬
        //  17. {2, 3, 5, 7, 1, 4, 6}로 다시 돌아옴
        //  18. {1, 2, 3, 4, 5, 6, 7}로 정렬

    public static void mergeSort(int left, int right) {
        if (left < right) {
            int middle = (left + right) / 2;
            mergeSort(left, middle);
            mergeSort(middle+1, right);
            merge(left, right, middle);
        }
    }

    //  left 와 right 는 2개 단위부터 정렬이 되어 있다.
    //  따라서, left 가 middle 을 넘어서면 나머지 right 들은 전부 left 보다 크다
    //  반대로, middle+1 이 right 를 넘서어면 나머지 left 들은 전부 right 보다 크다
    public static void merge(int left, int right, int middle) {
        int i = left;
        int j = middle + 1;
        int index = left;

        while (i <= middle || j <= right) {
            if (i <= middle && j <= right) {
                if (arr[i] <= arr[j]) {
                    tmp[index++] = arr[i++];
                } else {
                    tmp[index++] = arr[j++];
                }
            } else if (i > middle && j <= right) {
                tmp[index++] = arr[j++];
            } else {
                tmp[index++] = arr[i++];
            }
        }
        while (left <= right) {
            arr[left] = tmp[left++];
        }
    }

    public static void main(String[] args) {
        // Test code
        arr = new int[]{3, 5, 2, 7, 1, 4, 6};
        tmp = new int[arr.length];
        mergeSort(0, arr.length - 1);
        System.out.println("합병 정렬: " + Arrays.toString(tmp));
    }
}
