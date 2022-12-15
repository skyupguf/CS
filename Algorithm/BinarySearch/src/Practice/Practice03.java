package Practice;

// Practice3
// 이진 탐색 추가 구현
// target 값이 arr 내에 있으면 해당 인덱스 반환
// 없으면 해당 값이 있을 경우의 위치에 -1을 곱하고 1을 뺀 값을 반환

// 입출력 예시
// 입력 arr: 1, 2, 5, 10, 20, 30, 40, 50, 60

// target: 30
// 출력: 5

// target: 3
// 출력: -3

public class Practice03 {

    static int[] arr;

    public static int solution(int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int middle = (left + right) / 2;

            if (arr[middle] == target) {
                return middle;
            } else if (arr[middle] > target) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }

        //  값이 존재하지 않을 경우 반드시 left 가 더 크다. 그리고 left 가 더 크다는건 값을 못 찾아 mid + 1 이 된것
        //  따라서, left 가 해당 타겟이 들어갈 인덱스이고 표시는 몇번 째인지 해줘야 하므로 -1을 더해서 리턴한다.

        /* 양 쪽 값을 더했을 때 오버플로우가 난다면 */
        int left2 = Integer.MAX_VALUE - 10;
        int right2 = Integer.MAX_VALUE;
        int middle2 = (left2 + right2) / 2;     //  값이 한바퀴 돌아버린다.
        int middle3 = (left2 - right2 + right2) / 2;    //  온전하게 출력된다.

        //  헷갈린다면 long 을 이용하자
        System.out.println(left2);
        System.out.println(right2);
        System.out.println(middle2);
        System.out.println(middle3);

        return -left -1;
    }

    public static void main(String[] args) {
        // Test code
        arr = new int[] {1, 2, 5, 10, 20, 30, 40, 50, 60};
        System.out.println(solution(30));  // 5
        System.out.println(solution(3));   // -3
        System.out.println(solution(11));  // -5
        System.out.println(solution(35));  // -7
    }
}
