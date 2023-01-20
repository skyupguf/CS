package Week10;


public class Test04 {
    static boolean solution(int[] param0) {
        if (param0[0] == 0) {
            return false;
        }

        int move = 1;
        for (int num : param0) {
            move = Math.max(move, num);
            if (move == 0) {
                return false;
            }
            move--;
        }
        return true;
    }

    public static void main(String[] args) {
        int[] numbers = {3, 4, 1, 1, 0, 3};
        System.out.println(solution(numbers));
    }
}
