package Practice;

// Practice4
// 원형 정렬 상태 배열에서의 이진 탐색
// nums 배열에 원형 상태로 데이터가 정렬되어 있을 때,
// 이진 탐색으로 데이터를 찾는 프로그램을 작성하세요.
// O(log n) 유지
// 배열을 재 정렬하지 않고 풀기

// 입출력 예시
// arr: 4, 5, 6, 7, 8, 0, 1, 2

// target: 0
// 출력: 5

// target: 3
// 출력: -1

public class Practice04 {

    static int[] numbers;

    public static int solution(int target) {
        if (numbers == null || numbers.length == 0) {
            return -1;
        }

        int left = 0;
        int right = numbers.length - 1;

        while (left <= right) {
            int middle = (left + right) / 2;

            if (numbers[middle] == target) {
                return middle;
            }

            //  중간값이 left 보다 크거나 같은 경우 범위는 왼쪽 오름차순 정렬
            if (numbers[left] <= numbers[middle]) {

                //  left 와 middle 사이에 타겟이 존재한다면 right 를 당겨온다.
                if (numbers[left] <= target && target < numbers[middle]) {
                    right = middle - 1;

                    //  left 와 middle 사이에 존재하지 않는다면 left 를 이동시켜 범위를 좁힌다.
                } else {
                    left = middle + 1;
                }
                //  중간값이 left 보다 작은 경우 범위는 오른쪽 오름차순 정렬
            } else {

                //  타겟이 미들값과 같거나 큰 경우 그리고 right 보다 작은 경우 left 를 끌어온다.
                if (numbers[middle] < target && target <= numbers[right]) {
                    left = middle + 1;

                    //  middle 과 right 사이에 존재하지 않는 다면 right 를 당겨와 범위를 좁힌다.
                } else {
                    right = middle - 1;
                }
                //  왼쪽 정렬에 타겟이 위치하는데 왼쪽 ~ 미들에 없으면 right 를 당겨올 경우 해당 값을 스킵해버린다.
                //  오른쪽 정렬에 타겟이 위치하는데 미들 ~ 오른쪽에 없으면 left를 당겨올 경우 해당 값을 스킵해버린다.
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        // Test code
        numbers = new int[] {5, 6, 0, 1, 2, 3, 4};
        System.out.println(solution(0));  // 5
        System.out.println(solution(6));  // -1
    }
}
