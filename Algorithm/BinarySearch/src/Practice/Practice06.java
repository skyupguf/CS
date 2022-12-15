package Practice;

// Practice6
// 정수형 배열 weights 와 정수 days 가 주어졌다.
// weights 에는 각 상품의 무게들의 정보가 들어있고, days 는 운송 납기일이다.
// 상품들은 weights 에 적혀있는 순서대로 실어서 운송해야 하는데,
// days 이내에 운송을 하기 위한 차량의 최소한의 적재량을 계산하는 프로그램을 작성하세요.

// 입출력 예시
// weights: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// days: 5
// 출력: 15

// weights: 3, 2, 2, 4, 1, 4 => 정렬이 안되어 있지만 정렬된 수를 탐색하게 되므로 이진탐색이 유효
// days: 3
// 출력: 6


public class Practice06 {
    public static int solution(int[] weights, int days) {
        if (weights == null || weights.length == 0) {
            return -1;
        }

        //  만일 days 가 1이라면 weights 배열을 모두 더 한 값이 최소 적재량이 된다.
        int left = 0;
        int right = 0;

        for (int weight : weights) {
            left = Math.max(left, weight);
            right += weight;
        }

        //  days = 1이라면 바로 누적된 값을 리턴
        if (days == 1) { return right; }

        while (left <= right) {
            int middle = (left + right) / 2;

            //  중간 값을 최소 적재량이라고 본다면 weights 배열에서 요소를 하나씩 꺼내 더하다가 중간값을 초과할 경우 count 한다.
            int countDay = 0;
            int currentWeight = 0;
            for (int weight : weights) {
                if (currentWeight + weight > middle) {
                    countDay++;
                    currentWeight = 0;
                }
                currentWeight += weight;
            }
            //  마지막 값이 누적되어 있는 경우를 체크해 countDay 를 1추가한다.
            if (currentWeight > 0) { countDay++; }

            if (countDay == days) {
                return middle;
            } else if (countDay > days) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return left;
    }

    public static void main(String[] args) {
        // Test code
        int[] weights = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        System.out.println(solution(weights, 5));   // 15

        weights = new int[]{3, 2, 2, 4, 1, 4};
        System.out.println(solution(weights, 3));   // 6
    }
}
