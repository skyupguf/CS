package Implement;

// Practice1
// 해시 테이블 배열로 직접 구현
class MyHashTable {
    Integer[] table;
    int elCnt;

    MyHashTable () {}
    MyHashTable (int size) {
        this.table = new Integer[size];
        this.elCnt = 0;
    }

    int getHash (int key) {
        return key % this.table.length;
    }

    void setValue (int key, int data) {
        int idx = this.getHash(key);
        this.table[idx] = data;
        this.elCnt++;
    }

    int getValue (int key) {
        int idx = this.getHash(key);
        return this.table[idx];
    }

    void removeValue (int key) {
        int idx = this.getHash(key);
        this.table[idx] = null;
        this.elCnt--;
    }

    void printHashTable () {
        System.out.println("=== Hash Table ===");
        for (int i = 0; i < this.table.length; i++) {
            System.out.println(i + ": " + this.table[i]);
        }
    }

}

public class HashTableArray {

    public static void main(String[] args) {
        // Test code
        MyHashTable ht = new MyHashTable(7);
        ht.setValue(1, 1);
        ht.setValue(2, 2);
        ht.setValue(3, 3);
        ht.setValue(4, 4);
        ht.setValue(5, 5);
        ht.printHashTable();
        ht.setValue(8, 6);
        ht.printHashTable();
    }
}
