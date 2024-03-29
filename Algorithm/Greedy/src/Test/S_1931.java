package Test;
//  회의실 배정 (https://www.acmicpc.net/problem/1931)
/*
*   한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다.
*   각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자.
*   단, 회의는 한번 시작하면 중간에 중단될 수 없으며 한 회의가 끝나는 것과 동시에 다음 회의가 시작될 수 있다.
*   회의의 시작시간과 끝나는 시간이 같을 수도 있다.
*   이 경우에는 시작하자마자 끝나는 것으로 생각하면 된다.
*
*   입력 1. 첫째 줄에 회의의 수 N(1 ≤ N ≤ 100,000)이 주어진다.
*       2. 둘째 줄부터 N+1 줄까지 각 회의의 정보가 주어지는데 이것은 공백을 사이에 두고 회의의 시작시간과 끝나는 시간이 주어진다.
*       3. 시작 시간과 끝나는 시간은 2^31 - 1보다 작거나 같은 자연수 또는 0이다.
*
*   출력 1. 첫째 줄에 최대 사용할 수 있는 회의의 최대 개수를 출력한다.
*
*   에러핸들
*       종료시간으로만 정렬하면 다음 반례에 걸린다.
*       3
*       2 2
*       2 2
*       1 2
*       결과는 3이 나와야 하는데 2가 출력 되므로 종료시간이 같을 경우 시작시간을 비교해 정렬한다.
* */

import java.io.*;
import java.util.*;


public class S_1931 {
    static int[][] meetings;

    public static String countMeetings () {
        int count = 1;
        int curEnd = meetings[0][1];

        for (int i = 1; i < meetings.length; i++) {
            if (curEnd > meetings[i][0]) { continue; }
            curEnd = meetings[i][1];
            count++;
        }
        return count + "";
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        meetings = new int[N][];

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            meetings[i] = new int[] {
                    Integer.parseInt(st.nextToken()),
                    Integer.parseInt(st.nextToken())
            };
        }
        Arrays.sort(meetings, (x, y) -> x[1] != y[1] ? x[1] - y[1] : x[0] - y[0]);
        bw.write(countMeetings());
        bw.close();
    }
}
