package Practice;
// Practice1
// 정수형 배열 nums 가 주어졌다.
// 연속된 부분 배열의 합 중 가장 큰 값을 출력하세요.

// 입출력 예시
// nums: -5, 0, -3, 4, -1, 3, 1, -5, 8
// 출력: 10

// nums: 5, 4, 0, 7, 8
// 출력: 24
/*
*   부분 배열이므로 양 쪽 끝의 합과 현재 값 비교를 왼쪽과 오른쪽으로 나눌 때 다르게 접근해야 한다.
*
*   왼쪽의 경우
*   sum 에 누적하면서 nums[i]가 sum보다 클 경우 sum 은 nums[i]로 초기화 되어야 한다.
*
*   오른쪽의 경우
*   sum 에 누적하면서 nums[nums.length-1-i]이 sum보다 클 경우 sum 은 nums[nums.length-1-i]로 초기화 되어야 한다.
*
*   왼쪽과 오른쪽을 모두 구하면 왼쪽값이 왼쪽값 + 오른쪽값보다 크면 오른쪽이 음수이므로 부분배열의 최대합은 왼쪽값에만 있다.
*   오른쪽 값이 양수라면 두 값을 더한 값이 무조건 크다.
* */


public class Practice01 {
    static int[] nums;

    public static int getMaxSubSum (int left, int right) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int leftSubSum = divideLeftArray(0, (left+right)/2);
        int rightSubSum = divideRightArray((left+right)/2 + 1, right);

        return Math.max(leftSubSum, leftSubSum + rightSubSum);
    }

    public static int divideLeftArray (int left, int right) {
        if (left == right) { return nums[left]; }

        int mid = (left + right) / 2;
        int leftNum = divideLeftArray(left, mid);
        int rightNum = divideLeftArray(mid + 1, right);

        return Math.max(leftNum + rightNum, rightNum);
    }

    public static int divideRightArray (int left, int right) {
        if (left == right) { return nums[right]; }

        int mid = (left + right) / 2;
        int rightNum = divideRightArray(mid + 1, right);
        int leftNum = divideRightArray(left, mid);

        return Math.max(leftNum, leftNum + rightNum);
    }

    //리팩토링
    public static int divideSubArray (int left, int right) {
        if (nums == null || nums.length == 0) { return 0; }

        if (left == right) { return nums[left]; }

        int mid = (left + right) / 2;
        int maxLeft = divideSubArray(left, mid);
        int maxRight = divideSubArray(mid + 1, right);
        int maxArr = getMaxSubArray(left, mid, right);

        return Math.max(maxLeft, Math.max(maxRight, maxArr));
    }

    public static int getMaxSubArray (int left, int mid, int right) {
        int maxLeft = 0;

        for (int i = left; i <= mid; i++) {
            maxLeft = Math.max(maxLeft + nums[i], nums[i]);
        }

        int maxRight = 0;

        for (int i = right; i >= mid + 1; i--) {
            maxRight = Math.max(nums[i], nums[i] + maxRight);
        }

        return maxLeft + maxRight;
    }

    public static void main(String[] args) {
        // Test code
        nums = new int[] {-5, 0, -3, 4, -1, 3, 1, -5, 8};
        System.out.println(getMaxSubSum(0, nums.length - 1));
        System.out.println(divideSubArray(0, nums.length - 1));

        nums = new int[] {5, 4, 0, 7, 8};
        System.out.println(getMaxSubSum(0, nums.length - 1));
        System.out.println(divideSubArray(0, nums.length - 1));
    }
}
