package Practice;

// Practice4
// 정수 배열 nums 가 주어졌을 때
// 오름차순으로 정렬하기 위해 배열 내에서 정렬이 필요한 구간의 길이를 출력하는 프로그램을 작성하세요.

// 입출력 예시
// 입력: 2, 6, 4, 8, 5, 3, 9, 10
// 출력: 5

// 입력: 1, 3, 1
// 출력: 2

import java.util.Arrays;

public class Practice04 {
    public static int solution(int[] nums) {
        if (nums == null || nums.length == 0) { return 0; }

        //  왼쪽에서 부터 가장 큰 수를 찾아가면서 다음 수와 비교해 클 경우 해당 수가 위치할 인덱스가 된다.
        int max = -1;
        int end = -1;

        for (int i = 0; i < nums.length; i++) {
            max = Math.max(max, nums[i]);
            if (max > nums[i]) {
                end = i;
            }
        }

        //  오른쪽에서 부터 가장 작은 수를 찾아가면서 이전 수와 비교해 작으면 해당 수가 위치할 인덱스가 된다.
        int min = Integer.MAX_VALUE;
        int start = 0;

        for (int i = nums.length - 1; i >= 0; i--) {
            min = Math.min(min, nums[i]);
            if (min < nums[i]) {
                start = i;
            }
        }

        return end - start + 1;
    }

    public static void main(String[] args) {
        // Test code
        int[] nums = {2, 6, 4, 8, 5, 3, 9, 10}; //  5
        System.out.println(solution(nums));

        nums = new int[]{2, 3, 4, 5, 1};        //  5
        System.out.println(solution(nums));

        nums = new int[]{1, 9, 3, 4, 5};        //  4
        System.out.println(solution(nums));

        nums = new int[]{1, 2, 3, 4, 5};        //  0
        System.out.println(solution(nums));
    }
}
