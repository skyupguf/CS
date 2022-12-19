package Week05;
/*
*   정수로 이루어진 리스트 arr 피크의 인덱스 peak 다음과 같이 정의한다.
*   0 < peak < arr.length - 1
*   x[peak - 1] < x[peak]
*   x[peak + 1] < x[peak]
*   주어진 리스트 arr 피크가 최대 한 개 존재할 때, 피크의 인덱스를 출력하시오.
*   단, 배열에 피크가 존재하지 않을 경우 -1을 출력하시오.

    입력설명
    3 < arr.length < 1000000
    i <= peak, arr[i - 1] < arr[i]
    i >= peak, arr[i + 1] < arr[i]

    출력 설명
    배열의 유일한 피크값의 인덱스를 정수로 반환

    매개변수 형식
    arr = [-3, 0, 3, 4, 5, 12, 15, 14, 12, 11]

    반환값 형식
    6
* */

public class Test03 {

    static int[] arr;

    public static int solution () {

        return -1;
    }

    public static void main(String[] args) {
        arr = new int[] {-3, 0, 3, 4, 5, 12, 15, 16, 17, 11};
        System.out.println(solution());
    }
}
