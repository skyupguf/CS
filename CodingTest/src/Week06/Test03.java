package Week06;
/*
*   마트에 일직선으로 진열된 품목 배열 items 가 존재한다.
*   구매하려는 품목을 적어놓은 배열 ingredients 가 포함된 구간의 모든 품목을 구매하려 한다.
*   이 때, 가장 짧은 구간의 길이를 출력하라.

    입력
    0 < ingredients.length <= 1000
    0 < items.length <= 10000

    출력
    7
* */

import java.util.Map;
import java.util.Arrays;
import java.util.HashMap;
import java.util.ArrayList;


public class Test03 {

    public static int solution (String[] ingredients, String[] items) {
        Map<String, Integer> shoppingMap = new HashMap<>();
        ArrayList<String> ingredientSet = new ArrayList<>(Arrays.asList(ingredients));

        shoppingMap.put(items[0], 0);
        int minInterval = items.length;

        int p1 = 0;
        int p2 = 0;

        while (p1 <= p2) {

            if (minInterval == 1) { break; }
            // 재료 배열의 모든 요소가 쇼핑맵 키에 모두 존재하면 두 포인터의 길이를 구해 비교 후 할당한다.
            if (shoppingMap.keySet().containsAll(ingredientSet)) {
                minInterval = Math.min(minInterval, p2 - p1 + 1);
                // 포인터 p1을 오른쪽으로 이동시키기전 쇼핑맵에 하나만 존재할 경우 제거하거나 1을 차감한다.
                if (shoppingMap.get(items[p1]) == 0) {
                    shoppingMap.remove(items[p1]);
                } else {
                    shoppingMap.put(items[p1], shoppingMap.get(items[p1]) - 1);
                }
                p1++;

            } else {
                p2++;
                // p2가 길이를 넘어가면서 쇼핑맵에 재료 배열 키가 존재하지 않으면 없는 경우므로 바로 탈출시킨다.
                if (p2 == items.length) { break; }
                // 쇼핑맵에서 오른쪽으로 이동한 p2가 존재하면 1누적, 없으면 0과 함께 추가한다.
                if (shoppingMap.containsKey(items[p2])) {
                    shoppingMap.put(items[p2], shoppingMap.get(items[p2]) + 1);
                } else {
                    shoppingMap.put(items[p2], 0);
                }
            }
        }
        return minInterval;
    }

    public static void main(String[] args) {
        String[] ingredients= {"생닭", "인삼", "소주", "대추"};
        String[] items = {"물", "인삼", "커피", "생닭", "소주", "사탕", "생닭", "대추", "쌀"};
        System.out.println(solution(ingredients, items));

        ingredients = new String[] {"생닭"};
        items = new String[] {"생닭"};
        System.out.println(solution(ingredients, items));
    }
}