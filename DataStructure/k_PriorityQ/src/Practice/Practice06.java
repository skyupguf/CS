package Practice;

// Practice4
// 문자열 s 가 주어졌을 때, 문자열 내에 동일한 알파벳이 연속적으로 배치되지 않도록 재배치 하세요.
// 재배치가 가능한 경우 재정렬한 문자열을 반환하고 불가능한 경우 null 을 반환하세요.

// 입출력 예시
// 입력: "aabb"
// 출력: "abab"

// 입력: "aaca"
// 출력: null


import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.PriorityQueue;

public class Practice06 {
    public static String solution(String s) {

        HashMap<Character, Integer> map = new HashMap<>();
        for (Character word : s.toCharArray()) {
            map.put(word, map.getOrDefault(word, 0) + 1);
        }

        PriorityQueue<Map.Entry<Character, Integer>> priorityQ =
                new PriorityQueue<>((x, y) -> y.getValue() - x.getValue());
        priorityQ.addAll(map.entrySet());

        StringBuilder sb = new StringBuilder();
        Map.Entry<Character, Integer> prev = null;

        while (priorityQ.size() > 0) {
            Map.Entry<Character, Integer> cur = priorityQ.poll();

            if (prev != null && prev.getValue() > 0) {
                priorityQ.offer(prev);
            }

            sb.append(cur.getKey());
            cur.setValue(cur.getValue() - 1);
            prev = cur;

            if (priorityQ.isEmpty() && prev.getValue() > 0) {
                return null;
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        // Test code
        System.out.println(solution("aabb"));
        System.out.println(solution("aaaaabccd"));
        System.out.println(solution("aaca"));
    }
}
