package Test;
//  알고리즘 수업 - 선택 정렬 3 (https://www.acmicpc.net/problem/23883)
/*
*   선택정렬 수도코드
-------------------------------------------------------------------
    selection_sort(A[1..N]) { # A[1..N]을 오름차순 정렬한다.
        for last <- N downto 2 {
            A[1..last]중 가장 큰 수 A[i]를 찾는다
            if (last != i) then A[last] <-> A[i]
            * # last와 i가 서로 다르면 A[last]와 A[i]를 교환
        }
    }
-------------------------------------------------------------------
*   입력 1. 첫째 줄에 배열 A의 크기 N(5 ≤ N ≤ 500,000), 교환 횟수 K(1 ≤ K ≤ N)가 주어진다.
*       2. 다음 줄에 서로 다른 배열 A의 원소 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 10^9)
*
*   출력 1. K 번째 교환되는 두 개의 수를 작은 수부터 한 줄에 출력한다. 교환 횟수가 K 보다 작으면 -1을 출력한다.
*
*   풀이과정
*       문제에 함정이 있다, 단순 선택정렬을 묻는 문제가 아니다.
*       수도코드 대로 코딩을 하면 O(N^2) 시 무조건 시간초과 되도록 설계되어 있다.
*
*       수도코드대로 코딩이 된다면, 선택정렬 시 가장 뒤부터 큰 순서대로 정렬된다.
*       문제가 원하는건 정렬될 때 몇 번째 교환에서 교환되는 수를 구하는 것이다.
*       따라서, 정렬된 경우와 정렬되지 않은 경우의 위치값을 이용해 비교를 통해 O(N) 안에 문제를 해결해야 한다.
*
*       우선 정렬되지 않은 배열 A와 정렬된 배열 sorted 를 생성해 sorted만 정렬시킨다.
*       정렬되지 않은 배열 A를 해쉬맵을 활용해 값을 key로 인덱스를 value로 기록한다.
*
*       이제 두 배열을 한 번에 마지막 인덱스부터 루프하면서 sorted의 i가 A의 i와 다를 경우 sorted[i] 가 정렬되기전 위치를
*       해쉬맵에서 찾는다.
*       찾은 위가값을 이용해 배열 A[i]와 A[해쉬맵에서 찾은 위치] 를 교환하고
*       해쉬맵도 sorted[i]와 A[i]의 인덱스 위치를 교환한다.
* */

import java.io.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.StringTokenizer;


public class G_23883 {
    static int[] arrayA;
    static int[] sorted;
    static HashMap<Integer, Integer> location = new HashMap<>();
    static int N, K;

    public static String insertionSort () {
        for (int i = N-1; i > 0; i--) {
            int src = location.get(sorted[i]);

            if (arrayA[i] != sorted[i]) {
                int temp = arrayA[i];
                arrayA[i] = arrayA[src];
                arrayA[src] = temp;
                location.put(sorted[i], i);
                location.put(temp, src);
                K--;
            }
            if (K == 0) {
                return arrayA[src] + " " + arrayA[i];
            }
        }
        return "-1";
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        StringTokenizer st1 = new StringTokenizer(br.readLine());
        StringTokenizer stA = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st1.nextToken());
        K = Integer.parseInt(st1.nextToken());

        arrayA = new int[N];
        sorted = new int[N];

        for (int i = 0; i < N; i++) {
            int num = Integer.parseInt(stA.nextToken());
            arrayA[i] = num;
            sorted[i] = num;
            location.put(num, i);
        }

        Arrays.sort(sorted);
        bw.write(insertionSort());
        bw.flush();
        bw.close();
    }
}
