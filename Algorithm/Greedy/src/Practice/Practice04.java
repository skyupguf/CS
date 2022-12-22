package Practice;

// Practice4
// 원형 루트 상에 n 개의 주유소가 있다.
// 각 주유소의 가스 보유량은 gas 배열에 주어지고,
// 해당 주유소에서 다음 주유소로의 이동 비용은 cost 배열에 주어진다.

// 어떤 위치에서 차량이 가스를 채워 출발하면 모든 주유소를 방문하고 원래의 위치로 돌아올 수 있는지
// 계산하는 프로그램을 작성하세요.

// 입출력 예시
// gas: 1, 2, 3, 4, 5
// cost: 3, 4, 5, 1, 2
// 출력: 3

// gas: 2, 3, 4
// cost: 3, 4, 3
// 출력: -1
/*
*   거리 = (가스 - 비용) 이 이동가능 회수가 된다.
*   거리가 음수일 경우 이동 불가이므로 다음 값으로 이동해서 확인해야 하는데
*   이 때, 이전에 계산한 거리를 가져와 누적계산해서 양수가 되는 위치가 처음 출발했을 때 돌아올 수 있는 위치가 된다.
*   양수가 되는 위치를 표시하고 우선 배열 끝까지 루프해서 계산한 값이 음수일 경우 한 바퀴를 돌 수 없다.
* */

public class Practice04 {
    public static int solution(int[] gas, int[] cost) {
        if (gas == null || cost == null) {
            return -1;
        }

        int cur = 0;
        int total = 0;
        int position = 0;

        for (int i = 0; i < gas.length; i++) {
            cur += gas[i] - cost[i];
            total += gas[i] - cost[i];

            if (cur < 0) {
                position = i + 1;
                cur = 0;
            }
        }
        return total >= 0 ? position : -1;
    }

    public static void main(String[] args) {
        // Test code
        int[] gas = {1, 2, 3, 4, 5};
        int[] cost = {3, 4, 5, 1, 2};
        System.out.println(solution(gas, cost));

        gas = new int[]{2, 3, 4};
        cost = new int[]{3, 4, 3};
        System.out.println(solution(gas, cost));

        gas = new int[]{1, 1, 6, 1, 3};
        cost = new int[]{2, 3, 2, 2, 2};
        System.out.println(solution(gas, cost));
    }
}
