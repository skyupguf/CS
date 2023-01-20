package Week10;


public class Test02 {
    static int solution(int num) {
        char[] chars = String.valueOf(num).toCharArray();
        int[] maxArr = new int[chars.length];

        int max = 0;
        for (int i = chars.length - 1; i >= 0; i--) {
            max = Math.max(max, chars[i] - '0');
            maxArr[i] = max;
        }

        for (int i = 0; i < chars.length - 1; i++) {
            if (chars[i] - '0' < maxArr[i+1]) {
                for (int j = chars.length - 1; j >= i+1; j--) {
                    if (chars[j] - '0' == maxArr[i+1]) {
                        char tmp = chars[j];
                        chars[j] = chars[i];
                        chars[i] = tmp;
                        return Integer.parseInt(String.valueOf(chars));
                    }
                }
            }
        }
        return num;
    }

    public static void main(String[] args) {
        int num = 43824;
        System.out.println(solution(num));
    }
}
