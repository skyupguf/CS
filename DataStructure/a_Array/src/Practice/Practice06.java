package Practice;// Practice6
// 배열 arr 에서 중복 값을 제거한 새 배열을 만드시오.

// 입출력 예시)
// arr: 1, 5, 3, 2, 2, 3, 1, 4, 1, 2, 3, 5
// 결과: 1, 5, 3, 2, 4

public class Practice06 {
    public static void main(String[] args) {
        int[] arr = {1, 5, 3, 2, 2, 3, 1, 4, 1, 2, 3, 5};
        int[] result = new int[arr.length];
        int resultIndex = 0;

        for (int i = 0; i < arr.length-1; i++) {
            boolean dupFlag = false;

            for (int j = 0; j < resultIndex; j++) {
                if (arr[i] == result[j]) {
                    dupFlag = true;
                }
            }
            if (!dupFlag) {
                result[resultIndex++] = arr[i];
                System.out.print(arr[i] + " ");
            }
        }
    }
}
