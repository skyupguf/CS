/**
 * 랜선 자르기 ( https://www.acmicpc.net/problem/1654 )
 *
 *  길이가 제각각인 K개의 랜선이 존재하고 이 랜선을 잘라 N개의 같은 길이의 랜선으로 만들어야 한다.
 *  예를 들어 300cm 짜리 랜선에서 140cm 짜리 랜선을 두 개 잘라내면 20cm는 버려야 한다.(이미 자른 랜선은 붙일 수 없다.)
 *  이때 만들 수 있는 최대 랜선의 길이를 구하는 프로그램을 작성하시오.
 *
 *      가정1. 랜선을 자르거나 만들 때 손실되는 길이는 없다
 *      가정2. 기존의 K개의 랜선으로 N개의 랜선을 만들 수 없는 경우는 없다, K <= N
 *      가정3. 항상 센티미터 단위로 정수길이만큼 자른다
 *      가정4. N 개보다 많이 만드는 것도 N개를 만드는 것에 포함된다
 *
 *      입력
 *      1. 첫째 줄에 랜선 개수 K (1 <= K <= 10,000)와 필요한 랜선의 개수 N (1 <= N <= 1000000)이 입력된다.
 *      2. 한 줄씩 K줄에 걸쳐 이미 가지고 있는 각 랜선의 길이가 센티미터 단위의 정수로 입력된다. 랜선의 길이는 2^31-1보다 작거나 같은 자연수이다.
 *
 *      출력
 *      첫째 줄에 N개를 만들 수 있는 랜선의 최대 길이를 센티미터 단위의 정수로 출력한다.
 *
 * */

/*
 * 접근 방법
 *   K개를 잘라서 만드는 N개의 랜선들 하나의 최대길이를 구해야 한다.
 *
 *   1. 자를 수 있는 최대 길이는 K개의 랜선 중 가장 큰 랜선이므로 cm 단위로 하면 1 <= 구해야하는 길이 <= K개 중 가장 큰 랜선길이
 *       랜선배열을 정렬하여 가장 min 인 1cm 부터 랜선 배열의 가장 긴 길이 max 사이에서 값을 찾는다.
 *
 *   2. 정렬된 랜선들 중 가장 큰 수부터 차례대로 나눈 몫을 카운트에 누적하다 N보다 커지면 종료.
 *
 *   3. N보다 커질 경우 min 을 늘려야 하므로 나눈 값을 min 에 할당하고 난눌값은 (min + max) / 2 로 갱신한다.
 *
 *   4. N보다 작을 경우 max 를 줄여야 하므로 위 수식을 max 만 바꾸고 그대로 적용
 *
 *   5. 이 과정을 min+1 < max 일 때 까지 반복
 * */

import java.util.Arrays;
import java.util.Scanner;


public class S_CutCable {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long[] cables = new long[sc.nextInt()];
        int N = sc.nextInt();

        for (int i = 0; i < cables.length; i++) {
            cables[i] = sc.nextLong();
        }
        Arrays.sort(cables);

        long min = 1;
        long max = cables[cables.length - 1];
        long divideLen = max;

        while (min+1 < max) {
            int cnt = 0;
            for (int i = cables.length-1; i >= 0; i--) {
                cnt += cables[i] / divideLen;
                if (cnt > N) { break; }
            }
            if (cnt < N) { max = divideLen; }
            else { min = divideLen; }
            divideLen = (min + max) / 2;
        }
        System.out.println(divideLen);
    }
}