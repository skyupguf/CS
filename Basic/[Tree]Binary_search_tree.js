//  문제요약
//  1. Binary Search Tree를 구현하라.
//  2. 멤버변수 : 노드에 할당할 원소 value, 노드의 왼쪽 하위트리인 left, 노드의 오른쪽 하위트리인 right
//  3. 메서드
//      3-1. 입력받은 data를 Binary Search에 맞게 Tree에 계층적으로 추가할 수 있어야 합니다.
//      3-2. 트리에 존재하는 원소를 찾을 수 있어야 한다.
//      3-3. 트리에 존재하는 노드를 제거하고 이진탐색이 가능하도록 재배치해야 한다.
//      3-4. 전위 순회를 통해 트리의 모든 요소에 callback을 적용할 수 있어야 한다.
//      3-5. 중위 순회를 통해 트리의 모든 요소에 callback을 적용할 수 있어야 한다.
//      3-6. 후위 순회를 통해 트리의 모든 요소에 callback을 적용할 수 있어야 한다.

//  코드
class BinarySearchTree {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }

    addNode(data) {
        if (!this.value) return new BinarySearchTree(data);

        if (data < this.value) {
            this.left 
            ? this.left.addNode(data)
            : this.left = new BinarySearchTree(data);
        
        } else if (data > this.value) {
            this.right 
            ? this.right.addNode(data) 
            : this.right = new BinarySearchTree(data);
            
        } else return;
    }
    
    checkNode(data) {
        if (data === this.value) return true;
        else if (data < this.value && this.left) return this.left.checkNode(data);
        else if (data > this.value && this.right) return this.right.checkNode(data);
        else return false;
    }

    deleteNode(root, data) {
        if (data < root.value) {
            root.left = this.deleteNode(root.left, data);
        
        } else if (data > root.value) {
            root.right = this.deleteNode(root.right, data);
        
        } else {
            if (!root.left) return root.right;
            else if (!root.right) return root.left;
            else {
                let min = root.right;
                while (min.left) min = min.left;
                [ root.value, min.value ] = [ min.value, root.value ];
                root.right = this.deleteNode(root.right, data);
            }
        }
        return root;
    }
    
    preorder(callback) {
        callback(this.value);
        if (this.left) this.left.preorder(callback);
        if (this.right) this.right.preorder(callback);
    }
  
    inorder(callback) {
        if (this.left) this.left.inorder(callback);
        callback(this.value);
        if (this.right) this.right.inorder(callback);
    }
  
    postorder(callback) {
        if (this.left) this.left.postorder(callback);
        if (this.right) this.right.postorder(callback);
        callback(this.value);
    }
}
/*
    풀이
    1. 노드의 원소를 할당할 value, 왼쪽 하위트리 left, 오른쪽 하위트리 right를 멤버변수로 선언한다.
    
    2. 노드를 추가하는 메서드 addNode를 구현한다.
        2-1. 현재 루트노드인 value와 비교해서 작을 경우 left로 이동한다.
        2-2. left가 null이 아닐 경우, 다시 left, right를 판단해야 하므로 재귀호출한다.
        2-3. left가 null이면 data값을 인자로 전달한 인스턴스를 할당한다.
        2-4. right도 위와 동일한 로직으로 구현한다.
        2-5. 만일 노드와 값이 동일하거나 수가 아닐 경우, undefined를 return한다.
    
    3. 노드를 탐색할 메서드 checkNode를 구현한다.
        3-1. 현재 노드의 value와 data가 같으면 true를 리턴한다.
        3-2. data가 더 작고 left가 존재할 경우 left에서 재귀호출한다.
        3-3. data가 더 크고 right가 존재할 경우 right에서 재귀호출한다.
        3-4. 일치하는 원소가 없을 경우 false를 리턴한다.
    
    4. 노드를 삭제할 메서드 deleteNode를 구현한다.
        4-1. 노드는 자식노드가 left 또는 right 하나만 존재하는 경우, 둘 다 있는 경우, 둘 다 없는 경우로 나뉜다.
        4-2. left만 존재할 경우 삭제할 노드의 포인터에 left를 할당해 메모리에서 제거한다.
        4-3. right만 존재할 경우 삭제할 노드의 포인터에 right를 할당해 메모리에서 제거한다.
        4-4. 둘 다 없는 경우는 단말노드이기 때문에 left, right가 모두 null이라 위 두 조건에서 자동으로 설정된다.
        4-5. 둘 다 존재하는 경우 left에서 가장 큰 값, right에서 가장 작은 값과 삭제할 노드의 value를 교환한다.
        4-6. 이제 삭제할 노드가 단말에 위치하므로 선택한 하위트리로 재귀호출하면 4-4로 처리된다.
    
    5. 전위순회를 구현한다.
        5-1. callback으로 노드를 출력할 함수를 전달 받는다.
        5-2. 전위순회의 경우 루트를 먼저 방문해야 하므로 callback함수에 value를 인자로 호출한다.
        5-3. left가 존재하면 left를 방문하고 이제 left가 루트가 되니 callback으로 출력하기 위해 재귀호출한다.
        5-4. left를 전부 순회하면 right를 방문해야 하므로 right가 존재하면 마찬가지 재귀호출한다.
    
    6. 중위, 후위 순회를 구현한다.
        6-1. 전위순회와 코드는 동일하며 value를 인자로 전달할 callback을 중위는 left와 right 중간에 위치시킨다.
        6-2. 후위순회는 callback을 가장 마지막에 위치시킨다.
        6-3. 중위는 left => root => right 순으로 원소를 callback함수에 전달한다.
        6-4. 후위는 left => right => root 순으로 원소를 callback함수에 전달한다.
    
    에러핸들링
    1. deleteNode()의 재귀호출의 경우 포인터 할당과 리턴위치 설정에 유의해야 한다.
        1-1. 우선 재귀호출로 탐색중인 노드 삭제시 두 개의 if문에서 return되는 root.right와 root.left를 할당시켜야 한다.
        1-2. 그리고 삭제되지 않은 노드의 경우 해당 root를 다시 return으로 할당 받으면 된다.
    
    시간복잡도
    1. 노드의 추가 경우, 탐색의 경우 만일 트리가 편향되어 있다면 최악으로 O(N)의 시간복잡도가 소요될 수 있다.
    2. 노드의 삭제 경우, 최대 단말노드까지 탐색이므로 최악의 경우 계층의 높이인 O(H)까지 탐색된다.
*/