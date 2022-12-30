package Week07;


import java.util.Map;
import java.util.Map.Entry;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;


public class Test02 {
    static Map<Integer, Integer> voteMap = new HashMap<>();


    static int solution (int[] votes) {
        for (int vote : votes) {
            voteMap.merge(vote, 1, Integer::sum);
        }

        List<Entry<Integer, Integer>> entries = new ArrayList<>(voteMap.entrySet());

        entries.sort(new Comparator<Entry<Integer, Integer>>() {
            public int compare(Entry<Integer, Integer> obj1, Entry<Integer, Integer> obj2) {
                return obj2.getValue().compareTo(obj1.getValue());
            }
        });

        int result = 0;
        for (Entry<Integer, Integer> entry : entries) {
            result = entry.getKey();
            break;
        }

        return result;
    }


    public static void main(String[] args) {
        int[] votes = {4, 3, 2, 3, 3, 3, 3, 1, 2, 2, 3};
        System.out.println(solution(votes));

        votes = new int[]{1, 4, 2, 2, 2, 3, 2, 2, 1};
        System.out.println(solution(votes));
    }
}
