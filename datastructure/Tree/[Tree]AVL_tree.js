//  문제요약
//  1. AVL Tree를 구현하라.
//  2. 멤버변수 : node클래스(value, right, left), AVL클래스(root)
//  3. 메서드
//      3-1. 노드의 높이를 구할 수 있어야 한다.
//      3-2. 양 서브트리의 균형인수를 구할 수 있어야 한다.
//      3-3. 트리를 오른쪽으로 회전 시킬 수 있어야 한다.
//      3-4. 트리를 왼쪽으로 회전 시킬 수 있어야 한다.
//      3-5. 트리를 서브트리 왼쪽, 전체트리 오른쪽으로 회전 시킬 수 있어야 한다.
//      3-6. 트리를 서브트리 오른쪽, 전체트리 왼쪽으로 회전 시킬 수 있어야 한다.
//      3-7. 균형인수를 확인하고 트리를 재배치할 수 있어야 한다.
//      3-8. 노드를 추가할 수 있어야 한다.
//      3-9. 노드를 삭제할 수 있어야 한다.
//      3-10. 노드의 존재여부를 확인할 수 있어야 한다.
//      3-11. 전위 순회를 통해 트리의 모든 노드를 순회할 수 있어야 한다.
//      3-12. 중위 순회를 통해 트리의 모든 노드를 순회할 수 있어야 한다.
//      3-13. 후위 순회를 통해 트리의 모든 노드를 순회할 수 있어야 한다.

//  코드
class Node {
    constructor(element) {
        this.value = element;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        let height = 0;
        return height = node ? 
        Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1 : -1;
    }

    getBalanceFactor(node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    rotateRight(node) {
        const temp = node.left;
        [ node.left, temp.right ] = [ temp.right, node ];
        return temp;
    }

    rotateLeft(node) {
        const temp = node.right;
        [ node.right, temp.left ] = [ temp.left, node ];
        return temp;
    }

    rotateLR(node) {
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
    }

    rotateRL(node) {
        node.right = this.rotateRight(node.right);
        return this.rotateLeft(node);
    }

    reBalance(node) {
        const bf = this.getBalanceFactor(node);

        if (bf > 1) {
            node = this.getBalanceFactor(node.left) >= 0 ? 
            this.rotateRight(node) : this.rotateLR(node);

        } else if (bf < -1) {
            node = this.getBalanceFactor(node.right) <= 0 ?
            this.rotateLeft(node) : this.rotateRL(node);
        }
        return node;
    }

    checkNode(node, element) {
        if (element === node.value) return true;
        else if (element < node.value) return this.checkNode(node.left, element);
        else if (element > node.value) return this.checkNode(node.right, element);
        return false;
    }

    addNode(root, element) {
        if (!root) {
            return root = new Node(element);
        
        } else if (element < root.value) {
            root.left = this.addNode(root.left, element);
            root = this.reBalance(root);

        } else if (element > root.value) {
            root.right = this.addNode(root.right, element);
            root = this.reBalance(root);

        } else return root;
    }

    deleteNode(root, element) {
        if (element < root.value) {
            root.left = this.deleteNode(root.left, element);
            root = this.reBalance(root);
        
        } else if (element > root.value) {
            root.right = this.deleteNode(root.right, element);
            root = this.reBalance(root);

        } else if (element === root.value) {

            if (!root.left) return root.right;
            else if (!root.right) return root.left;
            else {
                let min = root.right;
                while (min.left) min = min.left;
                [ root.value, min.value ] = [ min.value, root.value ];
                root.right = this.deleteNode(root.right, element);
            }
        }
        return root;
    }

    preorder(root) {
        console.log(root.value);
        if (root.left) this.preorder(root.left);
        if (root.right) this.preorder(root.right);
    }
  
    inorder(root) {
        if (root.left) this.inorder(root.left);
        console.log(root.value);
        if (root.right) this.inorder(root.right);
    }
  
    postorder(root) {
        if (root.left) this.postorder(root.left);
        if (root.right) this.postorder(root.right);
        console.log(root.value);
    }
}
/*
    풀이
    1. Node와 AVLTree 클래스를 선언하고 각 멤버변수를 선언 및 할당한다.
    2. 입력받은 서브트리의 root를 기준으로 현재 트리의 높이를 구해야 한다.
        2-1. 트리에 존재하는 단말 모두를 탐색해야 하므로 재귀로 탐색하며 단말 부터 높이를 1씩 리턴해 누적해야 한다.
        2-2. 우선 높이를 누적할 변수 height를 선언하고 0을 할당한 후 left와 right를 재귀호출로 탐색해야 한다.
        2-3. 탈출조건은 노드가 없는 경우이며 노드가 root만 있을 경우가 0이므로 height에 -1을 할당해 리턴한다.
        2-4. 결국 노드가 존재하지 않을 때 까지 탐색하므로 최초의 리턴 값은 -1이며 노드가 존재하면 height에 +1을 누적해 리턴한다.
        2-5. 그리고 left와 right 양 쪽에서 리턴된 높이를 리턴받은 노드에서 통합해야 하므로 max연산을 이용한다.
    
    3. 균형인수를 리턴하는 메서드에서 입력받은 노드를 기준으로 left와 right의 높이를 구해 두 값의 차를 연산해 리턴한다.
    4. 트리의 불균형이 발생하는 유형에 따라 right, left, left-right, right-left 메서드를 구현한다.
        4-1. LL형이면 right회전을 한다. node.left가 node로 node가 node.right로 node.left.right가 node.right.left로 이동한다.
        4-2. RR형이면 left회전을 한다. node.right가 node로 node가 node.left로 node.right.left가 node.left.right로 이동한다.
        4-3. LR형이면 left-right회전을 한다. 우선 왼쪽 서브트리를 rotateLeft를 한 후 전체 트리를 rotateRight한다.
        4-3. RL형이면 right-left회전을 한다. 우선 오른쪽 서브트리를 rotateRight를 한 후 전체 트리를 rotateLeft한다.
    
    5. 균형인수를 확인해 4가지의 불균형 유형을 판별해서 rotation 메서드로 재배치해야 한다.
        5-1. 우선 입력받은 node의 균형인수를 균형인수메서드로 구해 bf변수에 할당한다.
        5-2. bf > 1이면 왼쪽 서브트리가 초과인 상태, node.left로 다시 균형인수를 구해 0이상이면 LL형, 0미만이면 LR형이다.
        5-3. bf < 1이면 오른쪽 서브트리가 초과인 상태, node.right로 다시 균형인수를 구해 0이하이면 RR형, 0미만이 RL형이다.
    
    6. 노드의 존재여부를 확인해 boolean으로 리턴한다.
        6-1. root와 원소를 입력받아 root.value와 element가 동일하면 true를 리턴한다.
        6-2. element가 root.value보다 작으면 left를 재귀호출을, 크면 right를 재귀호출을 리턴한다.
        6-3. 존재하지 않는 경우 false를 리턴한다.
    
    7. 노드를 추가하고 추가될 때 균형을 판단해 트리를 재배치한다.
        7-1. 현재 탐색하는 위치에 노드가 존재하지 않을 경우 입력받은 root에 노드를 생성해 할당하고 리턴한다.
        7-2. root에 현재 노드가 존재하고 element < root.value면 root.left에 root.left를 재귀호출한 값을 할당한다.
        7-3. root에 현재 노드가 존재하고 element > root.value면 root.right에 root.right를 재귀호출한 값을 할당한다.
        7-4. element가 이미 존재하면 root를 그대로 리턴한다.
        7-5. 노드가 left 또는 right에 추가되는 경우 5번의 메서드를 root를 인자로 호출한 결과를 root에 할당한다.

    8. 노드를 삭제하고 삭제된 후 균형을 판단해 트리를 재배치한다.
        8-1. 특정 위치의 삭제할 노드의 left 또는 right로 현재 위치를 대체한다.
        8-2. 대체하는 경우의 수는 단말노드, left만 존재, right만 존재, 둘 다 존재할 때 이다.
        8-3. 일단 삭제할 노드를 발견할 때 까지 트리를 탐색해야 하므로 element와 root.value를 비교해 추가처럼 재귀호출을 한다.
        8-4. element와 root.value가 동일할 경우 해당 노드를 삭제하는 4가지 경우를 조건으로 구현한다.
        8-5. root.left가 존재하지 않을 경우 root.right를 반대면 root.left를 리턴, 둘다 없을 경우는 두 조건과 같이 처리된다.
        8-6. 둘 다 존재할 경우 삭제할 노드의 자식 중 left에서 가장 큰 값 또는 right에서 가장 작은 값과 위치를 변경시킨다.
        8-7. min변수를 선언하고 root.right를 할당한 후 min.left가 존재하지 않을 때 까지 min을 갱신한다.
        8-8. 이제 삭제할 노드의 value의 위치와 min이 위치한 단말의 value를 교환하면 삭제할 value는 min이 위치한 단말노드가 된다.
        8-9. 그럼 이제 바뀐 노드가 위치한 root의 right부터 다시 재귀호출해 자식이 둘다 없을 경우의 조건으로 제거한다.
        8-10. 이제 제거한 노드외 정상노드들을 조건문 밖에서 호출한 값 그대로 리턴하기 위해 root를 리턴 해준다.
        8-11. 노드가 삭제되고 정상 노드들이 return될 때 7-5와 동일하다.
    
    9. 전위, 중위, 후위 순회를 구현한다.

    시간복잡도
    노드의 재배치가 일어날 경우 두 서브트리가 각각 높이 연산을 하지만 트리의 높이인 logN을 여러번 수행하기 때문에 O(logN)이다.
*/
