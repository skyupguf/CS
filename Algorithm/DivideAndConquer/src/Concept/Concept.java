package Concept;
//  최대값 찾기
/*
*   재귀호출 과정
*   {6, 2,  9, 8,   1, 4, 17, 5}
*   {6, 2,  9, 8} /
*   {6, 2}/
*   {6}
*      {2}
*    6    / {9, 8}
*           {9}
*              {8}
*    6    /  9
*            9    / {1, 4,  17, 5}
*                   {1, 4}
*                   {1}
*                      {4}
*                       4 / {17, 5}
*                           {17}
*                               {5}
*                       4 /  17
*            9               17
*                            17
* */

public class Concept {

    public static int getMax(int[] arr, int left, int right) {
        if (left == right) {
            return arr[left];
        }

        int mid = (left + right) / 2;

        return Math.max(getMax(arr, left, mid), getMax(arr, mid+1, right));
    }

    public static void main(String[] args) {
        int[] arr = {6, 2, 9, 8, 1, 4, 17, 5};  // 17
        System.out.println(getMax(arr, 0, arr.length - 1));

        arr = new int[] {60, 3, 5, 10, 50, 25, 30, 1, 15};  // 60
        System.out.println(getMax(arr, 0, arr.length - 1));
    }
}
