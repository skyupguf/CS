//  문제요약
//  1. Tree를 구현하라.
//  2. 맴버 변수 : 입력값을 저장할 데이터 value, 하위 노드를 저장할 children배열
//  3. 메서드
//      3-1. 입력받은 value를 Tree에 계층적으로 추가할 수 있어야 한다.
//      3-2. 트리에 포함된 데이터를 찾을 수 있어야 한다.

//  코드
class Tree {
    constructor(data) {
        this.value = data;
        this.child = [];
    }

    addChildNode(data) {
        const childNode = new Tree(data);
        this.child.push(childNode);
    }

    checkNode(data) {
        if (this.value === data) return true;
        for (let i=0; i<this.child.length; i++) {
            if (this.child[i].checkNode(data)) return true;
        }
        return false;
    }
}
/*
    풀이
    1. 멤버변수로 현재 노드의 값을 가리킬 value와 자식노드를 추가할 배열 child를 빈배열로 초기화 한다.
    
    2. addChildNode(data)로 데이터를 계층적으로 추가할 수 있어야 한다.
        2-1. 계층적으로 노드가 추가되어야 하는 이유는 자식노드가 부모노드가 될 수 있기 때문이다.
        2-2. 루트가 0계층일 경우 루트의 child에 추가된 자식노드는 1계층이 된다. 
        2-3. 2계층에 노드를 추가하기 위해 1계층도 루트와 같이 addNode메서드에 접근할 수 있어야 한다.
        2-4. 따라서, 처음 루트의 인스턴스를 생성한것 처럼 new Tree로 자식노드를 생성해 child에 push해야한다.
    
    3. checkNode(data)로 트리의 모든 노드를 확인할 수 있어야 한다.
        3-1. 루트노드의 경우 child배열이 아닌 키-값으로 최상위에 존재해 data와 같으면 바로 true를 리턴한다.
        3-2. 첫 계층인 child배열을 루프하면서 data와 일치하는 노드가 있는지 찾고 true를 리턴한다.
        3-3. 그런데 두 번째 계층으로 들어가면 각 노드마다 child가 존재하므로 일일히 루프를 할 수 없다.
        3-4. 따라서, child배열에 노드가 존재할 경우 checkNode(data)메서드로 재귀호출을 한다.
        3-5. addChildNode로 추가된 자식노드는 tree의 인스턴스로 모두 checkNode메서드를 가지고 있기 때문이다.
        3-6. checkNode로 child의 노드를 재귀호출 하면 value와 데이터가 동일하면 if탈출조건에서 true를 리턴한다.
        3-7. 이 때 자식노드가 child배열안에 자식을 또 가지고 있으면 존재하는 높이까지 타고 들어가 탐색한다.
        3-8. child배열을 전부 루프해도 value가 data와 일치하지 않으면 false를 리턴한다.
*/
