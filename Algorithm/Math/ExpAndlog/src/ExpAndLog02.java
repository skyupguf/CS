// Practice
// 제곱과 제곱근을 Math 없이 구현하기

public class ExpAndLog02 {

    static double pow(int a, double b) {
        double result = 1;
        boolean isMinus = false;

        if (b == 0) {
            return 1;
        } else if (b < 0) {
            b *= -1;
            isMinus = true;
        }
        for (int i=0; i<b; i++) {
            result *= a;
        }
        return isMinus ? 1 / result : result;
    }

//  뉴튼, 바빌로니아 이해하기
    static double sqrt(int a) {
        double result = 1;

        for (int i=0; i<10; i++) {
            result = (result + (a/result)) / 2;
        }
        return result;
    }

    public static void main(String[] args) {

//      Test code
        System.out.println("== My pow ==");
        System.out.println(pow(2, 3));
        System.out.println(pow(2, -3));
        System.out.println(pow(-2, -3));

        System.out.println("== My sqrt ==");
        System.out.println(sqrt(16));
        System.out.println(sqrt(8));

    }
}
