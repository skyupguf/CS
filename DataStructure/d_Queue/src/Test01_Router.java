/**
 * Router
 *  컴퓨터에서는 패킷이라고 하는 형태로 정보를 주고 받는데 패킷은 라우터라는 장비를 여러 번 거친다.
 *  라우터 내부를 들여다보면 처리해야 할 패킷을 임시적으로 보관하기 위한 버퍼가 존재한다.
 *  이 버퍼에는 라우터에 입력으로 들어온 패킷들이 순서대로 위치하고, 먼저 온 패킷부터 하나씩 처리한 후 버퍼에서 제거한다.
 *  만약 라우터가 패킷을 처리하는 속도보다 패킷이 들어오는 속도가 더 빠를경우 버퍼에 공간이 생길 때까지 입력받는 패킷은 모두 버려진다.
 *
 *  하나의 라우터만 존재한다고 가정하며, 입력은 아래와 같이 주어진다.
 *      1. 첫 줄에 버퍼의 크기 N이 주어진다. (1 <= N <= 100,000)
 *      2. 둘째 줄부터 하나씩 처리할 정보가 주어진다.
 *          2-a. 양의 정수 : 해당 번호의 패킷이 버퍼에 들어옴
 *          2-b. 0 : 라우터가 패킷을 처리함, 버퍼가 비어있는 경우 입력으로 들어오지 않음
 *          2-c. -1 : 입력 종료
 *
 *  라우터의 버퍼에 남아있는 패킷을 가장 앞에 있는 순서대로 공백으로 구분해서 출력하고 비어있는 경우 empty 를 출력하라.
 *  문제링크 : https://www.acmicpc.net/problem/15828
 */


import java.util.LinkedList;
import java.util.Scanner;


public class Test01_Router {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // buffer 의 크기를 입력받는다.
        int bufferSize = sc.nextInt();

        // 자료의 삽입/삭제에 유리한 연결리스트를 사용한다.
        LinkedList<Integer> buffer = new LinkedList<>();

        // 입력값에 의해 루프가 종료되므로 true 로 무한으로 루프한다.
        while (true) {
            int input = sc.nextInt();

            // 입력 -1이 오면 입력을 종료한다.
            if (input == -1) {
                break;

            // 0가 오면 가장 먼저 추가된 data 를 추출한다.
            } else if (input == 0) {
                buffer.removeFirst();

            // 버퍼가 가득찼으면 data 를 추가하지 않고 추가할 경우 리스트의 가장 뒤에 추가한다.
            } else if (buffer.size() < bufferSize) {
                buffer.addLast(input);
            }
        }

        if (buffer.size() == 0) {
            System.out.print("empty");
        } else {
            for (int packet : buffer) {
                System.out.print(packet + " ");
            }
        }
    }
}
