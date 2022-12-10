package Practice;

import java.util.Arrays;
import java.util.Comparator;

class Trie2 extends Trie {

    boolean checkAndInsert (String str) {
        Node cur = this.root;

        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);

            cur.child.putIfAbsent(c, new Node());
            cur = cur.child.get(c);

            if (cur.isTerminal) { return false; }
            if (i == str.length() - 1) {
                cur.isTerminal = true;
            }
        }
        return true;
    }
}

public class Practice04 {
    public static boolean solution(String[] nums) {
        if (nums == null || nums.length == 0) {
            return false;
        }

        Arrays.sort(nums, Comparator.comparingInt(String::length));
        Trie2 trie =  new Trie2();
        for (String num : nums) {
            if (!trie.checkAndInsert(num)) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        // Test code
        String[] nums = {"911", "123456789", "911234"};
        System.out.println(solution(nums)); // false

        nums = new String[]{"113", "12345", "12344", "98765"};
        System.out.println(solution(nums)); // true

    }
}
