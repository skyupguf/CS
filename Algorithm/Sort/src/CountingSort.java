/**
 * 수 정렬하기 3
 *  첫째 줄에 수의 개수 N(1 ≤ N ≤ 10,000,000)이 주어진다.
 *  둘째 줄부터 N개의 줄에는 수가 주어진다. 이 수는 10,000보다 작거나 같은 자연수이다.
 *  입력 받은 수들을 O(N)의 연산안에 오름차순 정렬하여 한줄에 하나씩 출력하라.
 */

/*
* 정렬 알고리즘을 O(N)으로 수행하는 방법은 계수정렬이 유일하다.
* 값을 비교해서 교환하는 방식이 아니라 한 번의 루프로 정렬을 하기 때문이다.
* 다만 한정 된 수의 정렬에만 유리한 이유가 추가 공간이 필요하기 때문이다.
* 입력받은 수만큼의 배열을 생성하고 해당 수를 하나씩 루프하면서 수를 생성한 인덱스에 하나씩 카운트한다.
* 카운트가 완료되면 배열을 루프하면서 카운트된 수만큼 인덱스를 출력하면 된다.
* 입력받은 수 만큼의 배열 공간을 추가해야 하므로 당연히 공간을 더 많이 쓰게 된다.
* */
import java.io.*;

public class CountingSort {
    public static void main(String[] args) throws IOException {

        // 계수 정렬을 사용하기 위해 최대수 만큼 배열을 생성합니다.
        int[] countArray = new int[10001];

        // System.out.println()을 사용할 때 시간초과가 발생해서 BufferedReader 를 사용했습니다.
        BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        // 입력받을 수들을 할당할 변수와 입력받을 수의 개수를 할당할 변수를 선언합니다.
        int num = 0;
        int N = Integer.parseInt(bf.readLine());

        // for문을 활용해 선언한 배열에 계수정렬을 이용해 입력받은 수를 배열의 인덱스로해 카운트해줍니다.
        for (int i = 0; i < N; i++) {
            num = Integer.parseInt(bf.readLine());
            countArray[num] += 1;
        }

        // 각 인덱스에 값이 존재할 경우 해당 값 만큼 배열의 인덱스를 출력해줍니다.
        for (int i = 0; i < countArray.length; i++) {
            if (countArray[i] != 0) {
                for (int j = 0; j < countArray[i]; j++) {
                    bw.write(i+"\n");
                }
            }
        }
        bw.flush();
        bw.close();
    }
}