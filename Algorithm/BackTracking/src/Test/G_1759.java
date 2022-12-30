package Test;
//  암호 만들기 (https://www.acmicpc.net/problem/1759)
/*
*   암호는 서로 다른 L개의 알파벳 소문자들로 구성되며 최소 한 개의 모음(a, e, i, o, u)과 최소 두 개의 자음으로 구성되어 있다.
*   알파벳은 암호에서 증가하는 순서로 배열되었을 것이라고 추측된다. abc(o), bac(x)
*   C개의 문자들이 주어졌을 때, 가능성 있는 암호들을 모두 구하는 프로그램을 작성하시오.

    입력
    - 첫째 줄에 두 정수 L, C가 주어진다. (3 ≤ L ≤ C ≤ 15)
    - 다음 줄에는 C개의 문자들이 공백으로 구분되어 주어진다. 주어지는 문자들은 알파벳 소문자이며, 중복되는 것은 없다.

    출력
    - 각 줄에 하나씩, 사전식으로 가능성 있는 암호를 모두 출력한다.

*   접근방법
*       1. 우선 사전순으로 아스키 기준 작은 문자가 앞에 오지 않도록 해야 하므로 char 배열을 오름차순 정렬한다.
*
*       2. 문자하나를 고정해 놓고 다음 문자를 찾는 방식, 순열과 달리 순서에 상관이 있으므로 백트래킹시 인덱스 i를 0부터 탐색하면 안된다.
*           2-1. 하나의 문자를 찾아서 고정시켜 놨으면 해당위치 이전은 모두 오름차순 알파벳이므로 탐샐할 필요없다.
*
*       3. 암호가 완성되면 모음이 1만 있어도 되므로 boolean 체크를 하고 모음이 아닐경우 자음을 카운트한다.
* */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;


public class G_1759 {
    static char[] chars;
    static boolean[] visit;
    static char[] candidate;
    static StringBuilder result = new StringBuilder();


    static void findPassword(int idx, int len, int depth) {
        if (depth == len) {
            int consonant = 0;
            boolean vowelCheck = false;

            for (char c : candidate) {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    vowelCheck = true;
                } else {
                    consonant++;
                }
            }
            if (vowelCheck && consonant > 1) {
                result.append(candidate).append("\n");
            }
            return;
        }

        for (int i = idx; i < chars.length; i++) {

            if (!visit[i]) {
                visit[i] = true;
                candidate[depth] = chars[i];
                findPassword(i + 1, len, depth + 1);
                visit[i] = false;
            }
        }
    }


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer numbers = new StringTokenizer(br.readLine());
        StringTokenizer characters = new StringTokenizer(br.readLine());

        int L = Integer.parseInt(numbers.nextToken());
        int C = Integer.parseInt(numbers.nextToken());

        chars = new char[C];
        visit = new boolean[C];
        candidate = new char[L];

        for (int i = 0; i < C; i++) {
            chars[i] = characters.nextToken().charAt(0);
        }

        Arrays.sort(chars);
        findPassword(0, L, 0);
        System.out.println(result);
    }
}
