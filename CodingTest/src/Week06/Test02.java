package Week06;
/*
*   고기를 부위별로 분류해 놓은 amount 배열에 amount[i] 만큼의 부위별 양이 존재한다.
*   각 부위의 가격은 단위 분량 당 value[i]이다.
*   stomach.length 가 전체 인원이며 한 사람당 stomach[j]가 먹을 수 있는 한계치이다.
*   이 때, 섭취한 고기의 가치가 최대가 되는 프로그램을 작성하라.
*   단, 가장 가치가 높은 고기는 공평하게 같은 양을 먹어야 한다, 즉 1개씩 먹어도 못먹는 사람이 있을 경우 아무도 먹으면 안된다.

    입력
    0 < amount.length = value.length <= 100,000
    0 < amount[i] <= 10,000
    0 < value[i] <= 10,000
    0 < stomach.length <= 100,000
    0 < stomach[j] <= 10,000

    출력
    74
* */

import java.util.*;


public class Test02 {

    public static int solution (int[] amount, int[] value, int[] stomach) {

        Comparator<Integer> cp = (x, y) -> y.compareTo(x);
        Map<Integer, Integer> meats = new TreeMap<>(cp);

        int maxVal = Integer.MIN_VALUE;
        boolean checkMax = amount.length > 1;

        for (int i = 0; i < amount.length; i++) {
            meats.put(value[i], amount[i]);
            maxVal = Math.max(maxVal, value[i]);
        }

        int maxCost = 0;
        int totalStomach = Arrays.stream(stomach).sum();

        int maxValMeat = meats.get(maxVal);

        if (checkMax && stomach.length <= maxValMeat) {
            int minStomach = Arrays.stream(stomach).min().getAsInt();
            int possibleCnt = Math.min(maxValMeat / stomach.length, minStomach) * stomach.length;
            totalStomach -= possibleCnt;
            maxCost += possibleCnt * maxVal;
        }

        for (Map.Entry<Integer, Integer> meat : meats.entrySet()) {
            int meatVal = meat.getKey();
            int meatCnt = meat.getValue();

            if (checkMax && maxVal == meatVal) { continue; }

            if (totalStomach == 0) { break; }

            int possibleCnt = Math.min(totalStomach, meatCnt);
            totalStomach -= possibleCnt;
            maxCost += possibleCnt * meatVal;
        }
        return maxCost;
    }

    public static void main(String[] args) {
        int[] amount = {7, 10, 4, 5};
        int[] value = {5, 4, 3, 1};
        int[] stomach = {4, 6, 2, 8};
        System.out.println(solution(amount, value, stomach)); // 74

        amount = new int[] {3};
        value = new int[] {5};
        stomach = new int[] {2};
        System.out.println(solution(amount, value, stomach)); // 10

        amount = new int[] {20, 10, 4, 5};
        value = new int[] {5, 4, 3, 1};
        stomach = new int[] {4, 6, 2, 8};
        System.out.println(solution(amount, value, stomach)); // 86
    }
}
