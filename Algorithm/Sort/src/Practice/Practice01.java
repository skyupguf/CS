package Practice;

// Practice1
// nums 배열에 3가지 색으로 구분되는 데이터들이 들어 있다.
// 0은 흰색, 1은 파랑, 2는 빨강이라고 할때
// 주어진 nums 배열에서 흰색 부터 빨강 순으로 인접하게 정렬시킨 후 출력하는 프로그램을 작성하세요.

// 입출력 예시
// 입력: 2, 0, 2, 1, 1, 0
// 출력: 0, 0, 1, 1, 2, 2

import java.util.Arrays;

public class Practice01 {
    // 계수 정렬
    public static void solution(int[] arr) {
        if (arr == null || arr.length == 0) { return; }

        int[] countSort = new int [3];

        for (int number : arr) {
            countSort[number]++;
        }

        for (int i = 0; i < countSort.length; i++) {
            while (countSort[i] != 0) {
                System.out.print(i + " ");
                countSort[i]--;
            }
        }
    }

    public static void main(String[] args) {
        // Test code
        int[] arr = {2, 0, 2, 1, 1, 0};
        solution(arr);
        System.out.println(Arrays.toString(arr));
        System.out.println();

        arr = new int[]{2, 0, 1};
        solution(arr);
        System.out.println(Arrays.toString(arr));
    }
}
