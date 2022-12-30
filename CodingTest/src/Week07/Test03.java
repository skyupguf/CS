package Week07;


import java.util.ArrayList;
import java.util.List;

public class Test03 {
    static ArrayList<String> ips = new ArrayList<>();


    static String[] solution (String s) {
        restoreIp(s, new StringBuilder(), 0, 0);
        String[] result = new String[ips.size()];

        for (int i = 0; i < ips.size(); i++) {
            result[i] = ips.get(i);
        }
        return null;
    }


    static void restoreIp(String s, StringBuilder sb, int idx, int dot) {
        if (idx > s.length() || dot > 4) {
            return;
        }

        if (idx == s.length() && dot == 4) {
            ips.add(sb.toString());
            return;
        }

        for (int i = 1; i <= 3; i++) {

            if (idx + i > s.length()) {
                break;
            }
            int ip = Integer.parseInt(s.substring(idx, idx + i));

            if (i == 1 || (i == 2 && ip >= 10 && ip < 100) || (i == 3 && ip >= 100 && ip < 256)) {
                sb.append(ip);

                if (dot < 3) {
                    sb.append(".");
                }
                restoreIp(s, sb, idx + i, dot + 1);

                if (dot < 3) {
                    sb.deleteCharAt(sb.length() - 1);
                }
                sb.delete(sb.length() - i, sb.length());
            }
        }
    }


    public static void main(String[] args) {
        String s = "11011";
        solution(s);
        System.out.println(ips);
    }
}
