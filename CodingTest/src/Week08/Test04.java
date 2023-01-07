package Week08;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Test04 {
    static List<Integer> list = new ArrayList<>();


    static int[] solution (String nums) {
        makeFibonacci(nums.toCharArray(), 0);

        int[] result = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            result[i] = list.get(i);
        }
        return result;
    }


    static void makeFibonacci(char[] nums, int idx) {
        if (nums.length == idx) {
            return;
        }

        long num = 0;
        for (int i = idx; i < nums.length; i++) {

            num = num * 10 + nums[i] - '0';
            if (num > Integer.MAX_VALUE) {
                continue;
            }

            if (idx != i && nums[idx] == '0') {
                continue;
            }

            int index = list.size() - 1;
            if (list.size() < 2 || list.get(index) + list.get(index - 1) == num) {
                list.add((int)num);
                makeFibonacci(nums, i + 1);
                list.remove(list.size() - 1);
            }
        }
    }


    public static void main(String[] args) {
        String nums = "14152944";
        System.out.println(Arrays.toString(solution(nums)));
    }
}
