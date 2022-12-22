package Practice;

// Practice1
// 정수형 nums 배열이 주어졌다.
// 각 원소의 값은 해당 위치에서 오른쪽으로 이동할 수 있는 최대 값이다.
// 첫 번째 위치에서 시작해서 가장 끝까지 이동이 가능한지 판별하는 프로그램을 작성하세요.
// 이동이 가능하면 true, 불가능하면 false 를 반환하세요.

// 입출력 예시
// nums: 2, 3, 0, 1, 4
// 출력: true

// nums: 3, 0, 0, 1, 1
// 출력: true

// nums: 3, 2, 1, 0, 4
// 출력: false
/*
*   우선 순서대로 이동하는 값을 할당해서 이동시켜 본다.
*   이 때 한 번 루프를 돌면 한 번 이동한 것이므로 이동값에 -1을 차감시킨다.
*   이제 해당위치의 수와 남은 이동값하고 비교했을 때 더 큰 값으로 교체해준다.
*   이전 이동값이 무엇이 됐든 현재 이동값이 더 크면 끝에 도달할 확률이 더 크기 때문이다.
*
*   이 때, 주의할건 만일 이동값과 탐색하는 위치의 값이 둘 다 0이라면 더 이상 이동할 수 없다.
*   이전 이동값 들이 전부 이동해서 도달한 위치가 0이기 때문이며 다음에 어떤 숫자가 나오든 더이상 이동이 불가하므로 탐색하면 안된다.
* */

public class Practice01 {
    public static boolean solution(int[] nums) {
        if (nums == null || nums.length == 0 || nums[0] == 0) {
            return false;
        }
//      내코드
        int move = 1;
        for (int num : nums) {
            move = Math.max(move, num);
            if (move == 0) { return false; }
            move--;
        }

//      교안코드 : 탈출조건이 조금 더 빨리 수행된다.
//        int pos = 0;
//        for (int i = 0; i < nums.length; i++) {
//            if (pos < i) {
//                return false;
//            } else if (pos >= nums.length - 1) {
//                return true;
//            }
//            pos = Math.max(pos, i + nums[i]);
//        }
        return true;
    }

    public static void main(String[] args) {
        // Test code
        int[] nums = {2, 3, 0, 1, 4};
        System.out.println(solution(nums));

        nums = new int[]{3, 0, 0, 1, 1};
        System.out.println(solution(nums));

        nums = new int[]{3, 2, 1, 0, 4};
        System.out.println(solution(nums));
    }
}
