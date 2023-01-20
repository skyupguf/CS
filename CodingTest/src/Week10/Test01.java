package Week10;


import java.util.Arrays;

public class Test01 {
    static String[][] numbers = {
            {"#####", "#---#", "#---#", "#---#", "#####"},
            {"--#--", "--#--", "--#--", "--#--", "--#--"},
            {"####", "---#", "####", "#---", "####"},
            {"####", "---#", "####", "---#", "####"},
            {"#---#", "#---#", "#####", "----#", "----#"},
            {"#####", "#----", "#####", "----#", "#####"},
            {"#####", "#----", "#####", "#---#", "#####"},
            {"#####", "----#", "----#", "----#", "----#"},
            {"#####", "#---#", "#####", "#---#", "#####"},
            {"#####", "#---#", "#####", "----#", "----#"}
    };

    static String[] solution(int n) {
        String nums = n + "";
        String[] result = new String[5];

        int end = 1;
        for (char num : nums.toCharArray()) {
            for (int i = 0; i < 5; i++) {
                if (end == nums.length()) {
                    result[i] += numbers[num-'0'][i];
                } else if (end == 1) {
                    result[i] = numbers[num-'0'][i] + " ";
                } else {
                    result[i] += numbers[num-'0'][i] + " ";
                }
            }
            end++;
        }
        return result;
    }

    public static void main(String[] args) {
        int n = 132;
        System.out.println(Arrays.toString(solution(n)));
    }
}
