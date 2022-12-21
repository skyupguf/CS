package Concept;

// 거스름돈 문제

import java.util.HashMap;
import java.util.Map;

public class Greedy02 {
    static int[] coins = {500, 100, 50, 10, 5, 1};
    static HashMap<Integer, Integer> coinList = new HashMap<>();

    public static void getChangeCoins(int receivedMoney, int price) {
        int total = 0;
        int change = receivedMoney - price;

        for (int coin : coins) {
            if (change < coin) { continue; }

            int count = change / coin;
            coinList.put(coin, count);

            total += count;
            change %= coin;
        }

        System.out.println("총 동전 개수 : " + total);
        System.out.println("각 동전 개수");
        for (Map.Entry<Integer, Integer> entry : coinList.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }
        System.out.println();
    }

    public static void main(String[] args) {
        // Test code
        getChangeCoins(1000, 100);
        getChangeCoins(1234, 500);
    }
}
