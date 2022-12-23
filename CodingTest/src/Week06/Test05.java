package Week06;

public class Test05 {
    public static void main(String[] args) {
        int[] scores = {5, 2, 5, 3, 4, 1, 6, 5, 2, 5, 2, 3};
//                        {2, 1, 2, 1, 2, 1, 3, 2, 1, 2, 1, 2}
        int[] result = new int[scores.length];

        int prev = scores[0];
        int choco = 1;
        result[0] = choco;

        for (int i = 1; i < scores.length; i++) {
            if (prev < scores[i] || (prev == scores[i] && choco == 1)) {
                choco++;
            } else {
                choco = 1;
            }
            result[i] = choco;
            prev = scores[i];
        }
        for (int i : result) {
            System.out.println(i);
        }
    }
}
