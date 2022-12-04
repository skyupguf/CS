package Practice;

import java.util.Arrays;

public class Practice09 {

    public static void solution(int[][] matrix) {
        boolean row0Flag = false;
        boolean col0Flag = false;

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j <matrix[i].length; j++) {
                if (matrix[i][j] == 0) {
                    if (i == 0) { row0Flag = true; }
                    if (j == 0) { col0Flag = true; }
                    matrix[i][0] = 0;
                    matrix[0][i] = 0;
                }
            }
        }
        for (int i = 1; i < matrix.length; i++) {
            for (int j = 1; j < matrix[i].length; j++) {
                if (matrix[0][j] == 0 || matrix[i][0] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (row0Flag) {
            for (int i = 0; i < matrix.length; i++) {
                matrix[0][i] = 0;
            }
        }
        if (col0Flag) {
            for (int i = 0; i < matrix.length; i++) {
                matrix[i][0] = 0;
            }
        }
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }

    public static void main(String[] args) {
        // Test code
        int[][] matrix = {{1, 1, 1}, {1, 0, 1}, {1, 1, 1}};
        solution(matrix);

        System.out.println();
        matrix = new int[][]{{1, 1, 0}, {1, 1, 1}, {0, 1, 1}};
        solution(matrix);
    }
}
