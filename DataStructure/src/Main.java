/**
 * 블랙잭
 * 첫째 줄에 카드의 개수 N(3 ≤ N ≤ 100)과 완성해야 하는 수 M(10 ≤ M ≤ 300,000)이 주어진다.
 * 둘째 줄에는 카드에 쓰여 있는 수가 주어지며, 이 값은 100,000을 넘지 않는 양의 정수이다.
 * 합이 M을 넘지 않는 카드 3장을 찾을 수 있는 경우만 입력으로 주어질 때 M에 가장 가까운 카드 3장의 합을 반환하라.
 * https://www.acmicpc.net/problem/2798
 * */

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();                           // 카드의 개수 N을 입력받습니다.
        int M = sc.nextInt();                           // 블랙잭을 완성할 M을 입력받습니다.
        int[] cards = new int[N];                       // N개의 정수를 선형구조로 저장할 int 배열 cards를 생성합니다.

        for (int i=0; i<N; i++) {                       // 카드 개수 N만큼의 카드 숫자를 입력 받아 배열에 저장합니다.
            cards[i] = sc.nextInt();
        }

        int max = 0;                                    // 블랙잭을 완전 탐색으로 비교해 최대값을 할당합니다.
        int sum = 0;                                    // 탐색되는 3가지 카드의 합을 할당할 변수를 선언합니다.

        for (int i=0; i<cards.length; i++) {            // 3가지 카드의 탐색을 3중 포문으로 선형 완전탐색합니다.
            for (int j=i+1; j<cards.length; j++) {      // 이 때, 앞에서 탐색한 수는 재탐색을 할 필요가 없어 +1씩 추가해 탐색합니다.
                for (int k=j+1; k<cards.length; k++) {

                    sum = cards[i] + cards[j] + cards[k]; // 탐색한 카드를 합계내고
                    if (sum <= M) max = Math.max(max, sum); // 합계가 블랙잭 M을 넘지 않으면 이전 max값과 비교해 더 큰 값을 할당합니다.
                }
            }
        }
        System.out.println(max);// 탐색이 종료되면 M에 가장 가까운 최대값이 할당됩니다.
    }
}