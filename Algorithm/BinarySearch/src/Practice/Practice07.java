package Practice;

// Practice7
// 정수형 배열 nums 와 정수 m 이 주어졌다.
// nums 에는 양의 정수 값들이 들어 있고, m 은 배열을 부분 배열로 분리할 수 있는 수이다.
// nums 배열을 m 개의 부분 배열로 분리할 때,
// 각 부분 배열의 합중 가장 큰 값이 최소가 되도록 분리했을 때의 합을 출력하세요.

// 입출력 예시
// nums: 7, 2, 5, 10, 8
// m: 2
// 출력: 18

// nums: 1, 2, 3, 4, 5
// m: 2
// 출력: 9


public class Practice07 {
    public static int solution(int[] nums, int m) {
        if (nums == null || nums.length == 0 || nums.length < m) { return -1; }

        //  m = 1이면 전부 더한 값, m = nums.length 일 경우 가장 작은 값이 최소합값이 된다.
        int left = 0;
        int right = 0;

        for (int num : nums) {
            left = Math.max(left, num);
            right += num;
        }

        if (m == 1) { return right; }
        else if (m == nums.length) { return left; }

        while (left <= right) {

            int sum = 0;
            int divideCount = 0;
            int middle = (left + right) / 2;

            for (int num : nums) {
                sum += num;
                if (sum > middle) {
                    divideCount++;
                    sum = num;
                }
            }

            if (sum > 0) { divideCount++; }

            if (divideCount > m) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return left;
    }

    public static void main(String[] args) {
        // Test code
        int[] nums = {7, 2, 5, 10, 8};
        System.out.println(solution(nums, 2));  // 18

        nums = new int[] {1, 2, 3, 4, 5};
        System.out.println(solution(nums, 2));  // 9

        nums = new int[] {1, 4, 4};
        System.out.println(solution(nums, 3));  // 4
    }
}
