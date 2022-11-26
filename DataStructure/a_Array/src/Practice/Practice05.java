package Practice;// Practice5
// 배열 arr 의 값을 오름차순으로 출력

// 입출력 예시)
// arr: 5, 3, 1, 4, 6, 1
// 결과: 1, 1, 3, 4, 5, 6

public class Practice05 {
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 4, 6, 1};
//        int[] visited = new int[arr.length];
//        int visitCnt = 0;
//        int minVal = Integer.MAX_VALUE;
//        int minIdx = -1;
//
//        while (visitCnt < arr.length) {
//            for (int i = 0; i < arr.length; i++) {
//                if (arr[i] < minVal && visited[i] == 0) {
//                    minVal = arr[i];
//                    minIdx = i;
//                }
//            }
//            if (minIdx != -1) {
//                System.out.print(minVal + " ");
//                visited[minIdx] = 1;
//                visitCnt++;
//            }
//            minVal = Integer.MAX_VALUE;
//            minIdx = -1;
//        }
        int max = 0;
        for (int num : arr) {
            max = Math.max(max, num);
        }

        int[] numCount = new int[++max];
        for (int num : arr) {
            numCount[num]++;
        }

        for (int i = 0; i < max; i++) {
            if (numCount[i] != 0) {
                for (int j = 0; j <numCount[i]; j++) {
                    System.out.print(i + " ");
                }
            }
        }
    }
}
