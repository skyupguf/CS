package Test;
//  개미굴(https://www.acmicpc.net/problem/14725)
/*
*   입력 1. 개미굴의 총 계층 N (1 ≤ N ≤ 1000)
*       2. 각 줄에 해당 경로의 먹이 개수 K (1 ≤ K ≤ 15)
*       3. 왼쪽부터 해당 경로의 각 층의 먹이 이름 t (1 ≤ t ≤ 15)
*
*   접근방법
*       트라이 구축
*           1. 우선 입력받은 N 은 트라이의 높이가 N+1을 초과하지 못하도록 한다.
*           2. K 번 루프로 입력 받은 t를 트라이에 해쉬맵을 이용해 추가한다.
*           3. 추가할 때 이미 키가 존재하면 해당 노드의 자식 노드로 추가한다.
*       트라이 탐색
*           탐색하면서 분기일 경우 앞글자 사전 순서대로 키 탐색
*           layer 변수를 놓고 재귀호출 될 때 마다 +1
*           layer 만큼 "--"를 추가해 출력
*           트라이구조 탐색은 분기로 돌아와 탐색해야 하므로 백트래킹이 가능해야 함
*           터미널에 도달하면 분기 위치까지 백트래킹
* */

import java.io.*;
import java.util.*;

public class G_14725 {
    static StringBuilder result = new StringBuilder();

    static void print (TreeMap<String, TreeMap> trie, String hyphen) {
        for (Object key : trie.keySet()) {
            result.append(hyphen).append(key).append("\n");
            print(trie.get(key), hyphen + "--");
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        TreeMap<String, TreeMap> trie = new TreeMap<>();
        int N = Integer.parseInt(br.readLine());

        while (N-- > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");
            int K = Integer.parseInt(st.nextToken());
            TreeMap<String, TreeMap> current = trie;

            while (K-- > 0) {
                String key = st.nextToken();
                current.putIfAbsent(key, new TreeMap<>());
                current = current.get(key);
            }
        }
        print(trie, "");
        bw.write(result.toString());
        bw.flush();
        bw.close();
    }
}
