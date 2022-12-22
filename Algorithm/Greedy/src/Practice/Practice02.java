package Practice;

// Practice2
// 양의 정수 배열 prices 가 주어졌다.
// 각 원소의 의미는 주식 가격을 의미한다.
// 한 번에 한 주만 보유할 수 있다고 할 때 prices 를 보고 사고 팔기를 반복해서
// 얻을 수 있는 최대 수익을 반환하는 프로그램을 작성하세요.

// 입출력 예시
// prices: 5, 1, 6, 4, 3, 5
// 출력: 7

// prices: 1, 2, 3, 4, 5
// 출력: 4
/*
*   구매는 주식이 이전 값보다 작고 다음값보다 작을 경우 해야한다.
*   즉 주식이 구매되었을 때 반드시 다음 비교값은 현재 구매된 값보다 큰 상태이다.
*
*   판매는 현재가 보다 큰 경우 다음 수가 더 크면 그 다음 경우, 즉 가장 큰 가격에서 팔아야 한다.
*   배열에서 보면 배열의 마지막이 아닐경우 현재가가 다음 값보다 클 경우가 된다.
*   즉, 주식가가 계속 더 큰 값이 나오면 굳이 이전 값들을 스킵할 필요가 없다.
*
*   5, 1, 3, 4, 6 이라면 1에서 사서 6에 팔아야 최대 이익 5가 나오는데
*   이는 3-1, 4-3, 6-4 각 단계에서 차감한 값을 다 더한 경우랑 동일하다.
*   즉 주식이 구매가 되면 판매를 모두 독립적으로 수행해도 최대이익과 동일해진다.
*
*   현재값과 이전에 저장해둔 값을 비교하여 더 작은 수가 있다면 이를 buy 변수에 할당한다.
*   buy 보다 price 가 더 클 경우 price - buy 를 profit 에 누적한다.
* */


public class Practice02 {
    public static int solution(int[] prices) {
        if (prices == null || prices.length < 2) {
            return 0;
        }

        int buy = prices[0];
        int profit = 0;

        for (int price : prices) {
            buy = Math.min(buy, price);
            if (buy < price) {
                profit += (price - buy);
                buy = price;
            }
        }
        return profit;
    }

    public static void main(String[] args) {
        // Test code
        int[] prices = {5, 1, 6, 4, 3, 5};
        System.out.println(solution(prices));

        prices = new int[]{1, 2, 3, 4, 5};
        System.out.println(solution(prices));

        prices = new int[]{5, 4, 3, 2, 1};
        System.out.println(solution(prices));
    }
}
