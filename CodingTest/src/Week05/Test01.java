package Week05;
/*
*   문자열 s가 있을 때, 이 문자열을 재배치하여 만든 문자열을 '애너그램'이라고 한다.
*   예를 들어, "fine"은 "infe"의 애너그램이라고 할 수 있다.
*   s가 영문 소문자로만 이루어져 있다고 할 때, 문자열 t가 문자열 s의 애너그램인지 판단하는 프로그램을 작성하시오.

    입력설명
    0 <= s.length <= 10000
    0 <= t.length <= 10000

    출력설명
    애너그램 여부를 논리값으로 반환

    매개변수 형식
    s = "imfinethankyou"
    t = "atfhinemnoyuki"

    반환값 형식
    true
* */
public class Test01 {

    public static boolean solution (String s, String t) {

        return true;
    }

    public static void main(String[] args) {
        String s = "imfinethankyou";
        String t = "atfhinemnoyuki";

        System.out.println(solution(s, t));
    }
}
