package Practice;

// Practice5
// 정수 num 이 주어졌을 때,
// num 숫자에서 두 자리를 최대 한번만 교체하여 얻을 수 있는 최대값을 출력하세요.

// 입출력 예시
// num: 2736
// 출력: 7236

// 입력: 7116
// 출력: 7611

public class Practice05 {
    public static int solution(int num) {
        char[] chars = String.valueOf(num).toCharArray();
        int[] maxArr = new int[chars.length];

        int max = 0;

        for (int i = chars.length - 1; i >= 0; i--) {
            max = Math.max(max, chars[i] - '0');
            maxArr[i] = max;
        }

        for (int i = 0; i < chars.length - 1; i++) {
            // char 배열에 i번이 max 배열 i+1번보다 작을 경우 i번 수를 max 수로 변경해야 한다.
            if (chars[i] - '0' < maxArr[i+1]) {
                // j를 마지막부터 루프하면서 char 배열의 j부터 다른 수를 발견한 max와 하나씩 비교하여 동일한 수를 발견하면
                // max 보다 작은 수를 확인한 i 번째 char 와 j 번째 char 를 교환한다.
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
        // 이미 최대수일 경우 그대로 리턴한다.
        return num;
    }

    public static void main(String[] args) {
        // Test code
        System.out.println(solution(2736));
        System.out.println(solution(7116));
        System.out.println(solution(91));
    }
}
