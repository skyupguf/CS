/*
//  문제요약  //
    하나의 스택공간에 두 개의 스택을 사용할 수 있도록 논리적으로 설계하라.
    
    1. 어느 쪽 스택에 데이터를 추가하든 공간의 낭비없이 효율적으로 사용하도록 설계해야 한다.
*/

/*  코드  */
class Two_stack { 
    constructor (size) {
        this.stack = {};
        this.size = size || Number.MAX_SAFE_INTEGER;
        this.top1 = 0;
        this.top2 = this.size - 1;
    }
    
    push1 (data) {
        if (this.top1 > this.top2) return new Error('stack overflow');
        this.stack[this.top1] = data;
        this.top1++;
    }

    push2 (data) {
        if (this.top2 < this.top1) return new Error('stack overflow');
        this.stack[this.top2] = data;
        this.top2--;
    }
    
    pop1 () {
        if (this.top1 <= 0) return new Error('stack underflow');
        this.top1--;

        const temp = this.stack[this.top1];
        delete this.stack[this.top1];
        return temp;
    }

    pop2 () {
        if (this.top2 >= this.size-1) return new Error('stack underflow');
        this.top2++;

        const temp = this.stack[this.top2];
        delete this.stack[this.top2];
        return temp;
    }
    
    last1 () {
        return this.stack[this.top1-1];
    }

    last2 () {
        return this.stack[this.top2+1];
    }
}
/*
//  접근방법  //
    하나의 스택을 두 개의 공간으로 활용하도록 나눠야 한다.
    여기서 중요한 점은 어느 쪽 스택에 데이터를 추가하든 스택에 정해진 사이즈 안에서 공간 낭비없이 삽입되어야 한다.

    예를 들어, 스택의 크기가 10인 공간을 절반으로 나누면 한 쪽 스택이 가득찰 경우 오버플로우가 되는지 확인하는 이중작업이 필요하다.
    또한, 크기가 정해져 있기 때문에 두 스택공간을 정확히 절반씩만 이용해야 하므로 효율적이지 못하다.

    따라서, 크기를 정해서 나누지 않고 스택이 추출되는 top의 위치를 각각 다르게 두면 이 문제를 해결할 수 있다.
    첫 번째 스택의 top1은 스택과 동일하게 마지막 데이터가 삽입된 후미로 하고 두 번째 스택의 top2는 반대로 뒤집은 형태로 하는 것이다.
    [0, 1, 2, 3, 4 // 8, 7, 6, 5]
                top1 top2 


//  수도코드  //
    1. 하나의 스택에 두 가지 논리스택을 구현할 멤버 변수들을 설정한다.
        1-1. 저장공간을 선언한 뒤 두 번째 스택의 시작점을 위해 사이즈를 먼저 선언한다.
        1-2. 첫 번째 스택인 top1은 0부터 시작한다.
        1-3. 두 번째 스택인 top2는 정해진 사이즈의 마지막 인덱스인 size - 1부터 시작한다.

    2. 각 스택에 데이터를 삽입할 메서드 두 개를 생성한다.
        2-1. push1 메서드를 생성한다.
            a. 1번 스택의 오버플로우 체크는 top1은 점점 커지고 top2는 점점 작아지므로 top1이 top2보다 커질 경우 스택은 가득찬다.
            b. 오버플로우 체크 후 top1의 위치에 데이터를 삽입하고 top1을 1누적한다.
        2-2. push2 메서드를 생성한다.
            a. push1과 반대로 top2가 점점 차감되므로 top1보다 작아지면 스택이 가득찬다.
            b. top2의 위치에 data를 삽입하고 top2를 1차감한다.
    
    3. 각 스택에 데이터를 추출할 메서드 두 개를 생성한다.
        3-1. pop1 메서드를 생성한다.
            a. 언더플로우 체크를 한다. 스택 1번의 경우 top1이 0이하일 경우 스택이 비게 된다.
            b. 언더플로우 체크를 완료했으면 추출할 데이터가 존재하므로 top1을 1차감한다.
            c. temp변수를 선언하고 top1의 스택 데이터를 할당한 후 제거하고 temp를 리턴한다.
        3-2. pop2 메서드를 생성한다.
            a. 스택 2번의 경우 top2는 size-1 이상일 경우 스택이 비게 된다.
            b. 언더플로우 체크를 완료했으면 추출할 데이터가 존재하므로 top2를 1누적한다.
            c. temp변수를 선언하고 top2의 스택 데이터를 할당한 후 제거하고 temp를 리턴한다.
    
    4. last1과 last2로 각각의 스택의 top에 위치한 데이터를 리턴한다.


//  시간복잡도  //
    모든 메서드는 O(1)의 시간복잡도에서 작동한다.
*/

