package Practice;

// Practice5
// 2차원 행렬에서 이진 탐색으로 데이터 찾기
// row x col 행렬 데이터가 주어졌을 때, target 을 이진 탐색으로 찾는 프로그램을 작성하세요.
// 각 행의 데이터는 오름차순으로 정렬 상태

// 입출력 예시
// 행렬: {{1, 3, 7, 8}, {10, 11, 15, 20}, {21, 30, 35, 60}}

// target: 3
// 출력: true

// target: 13
// 출력: false

public class Practice05 {

    static int[][] matrix;

    public static boolean solution(int target) {
        if (matrix == null || matrix.length == 0) {
            return false;
        }

        //  2차원 배열일 경우 각 행의 위치 값을 구해야 한다.
        //  left 의 경우 위치값은 0, right 의 경우 위치값은 row * col - 1 이다.
        int left = 0;
        int right = matrix.length * matrix[0].length -1;
        int row = matrix[0].length;

        while (left <= right) {
            int middle = (left + right) / 2;

            //  i 는 현재값 / 한 행의 길이, j 는 현재값 % 한 행의 길
            int i = middle / row;
            int j = middle % row;

            if (target == matrix[i][j]) {
                return true;
            } else if (target > matrix[i][j]) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        // Test code
        matrix = new int[][] {{1, 3, 7, 8}, {10, 11, 15, 20}, {21, 30, 35, 60}};
        System.out.println(solution(3));    // true
        System.out.println(solution(13));   // false
        System.out.println(solution(35));   // true
    }
}
