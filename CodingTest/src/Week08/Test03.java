package Week08;
//  IP 복구
/*
*   '.'이 제거된 IP 주소 문자열에 '.'을 3개 붙여서 4구간으로 나눈 IP로 복구를 하고자 한다.
*   이 때, 0이 한자리면 한 구간으로 나뉠수 있지만 두자리, 세자리면 리딩제로를 허용하지 않는다. ex)02, 011
*   IP 주소의 각 구간의 숫자가 0 이상 255 이하의 숫자로만 이루어질 경우 만들 수 있는 모든 IP 를 찾아 배열로 반환하는 프로그램을 작성하라.
*   단, 배열은 오름차순으로 정렬되어야 한다.

    입력
    1) 4 <= s.length <= 12
        "11011"

    출력
        {"1.1.0.11", "1.10.1.1", "11.0.1.1"}

*   풀이
*       백트래킹으로 DFS 에서 제외할 예외조건을 찾아보자.
*       1. 현재 부분 완성된 IP가 '.'이 3개 미만이어야 한다.
*       2. 각 구간에 추가할 IP는 길이마다 다른 조건이 필요하다.
*           2-1. 길이 1일 때, 최초 구간만 아니면 어떤 수가 와도 상관없다.
*           2-2. 길이 2일 때, 10 ~ 99 만 가능하다.
*           2-3. 길이 3일 때, 100 ~ 255 만 가능하다.
*       3.
*       위 조건에 해당되지 않는 경우면 가지치기한다.
*
*       각 구간을 재귀를 통한 뎁스라고 생각하고 직접 전개해 보자.
*       경우를 하나씩 찾아보자
*                [1]_____               [11]        [110]
*              /     \   \             / | \        /   \
*           [1]     [10] [101]      [0] [01][011] [1]   [11]
*          / | \     | \   \        / \            |
*       [0][01][011][1][11] [1]  [1]  [11]        [1]
*       / \          |            /
*    [1] [11]       [1]         [1]
*     /
* 구간초과
* */


import java.util.ArrayList;
import java.util.Arrays;


public class Test03 {
    static ArrayList<String> ipCandidates;
    static String ip;


    static String[] solution (String s) {
        ip = s;
        ipCandidates = new ArrayList<>();
        restoreAllIp();

        String[] result = new String[ipCandidates.size()];
        for (int i = 0; i < ipCandidates.size(); i++) {
            result[i] = ipCandidates.get(i);
        }
        return result;
    }


    static void restoreAllIp() {

    }


    public static void main(String[] args) {
        String s = "2552552551";
        System.out.println(Arrays.toString(solution(s)));   // {"255.255.255.1"}

        s = "16819501";
        System.out.println(Arrays.toString(solution(s)));   // {"168.195.0.1", "168.19.50.1"}

        s = "11011";
        System.out.println(Arrays.toString(solution(s)));   // {"1.1.0.11", "1.10.1.1", "11.0.1.1"}
    }
}

//if (idx > s.length() || dot > 4) {
//            return;
//        }
//
//        if (idx == s.length() && dot == 4) {
//            ips.add(sb.toString());
//            return;
//        }
//
//        for (int i = 1; i <= 3; i++) {
//
//            if (idx + i > s.length()) {
//                break;
//            }
//            int ip = Integer.parseInt(s.substring(idx, idx + i));
//
//            if (i == 1 || (i == 2 && ip >= 10 && ip < 100) || (i == 3 && ip >= 100 && ip < 256)) {
//                sb.append(ip);
//
//                if (dot < 3) {
//                    sb.append(".");
//                }
//                restoreIp(s, sb, idx + i, dot + 1);
//
//                if (dot < 3) {
//                    sb.deleteCharAt(sb.length() - 1);
//                }
//                sb.delete(sb.length() - i, sb.length());
//            }
//        }
