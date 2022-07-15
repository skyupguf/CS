/*
//  문제요약  //
    하나의 스택공간에 N개의 스택을 사용할 수 있도록 논리적으로 설계하라.

    1. 주어진 인자값 size로 스택의 크기를 설정하고 n으로 N개의 논리스택을 구현해야 한다.

    2. N Stack은 다음 기능을 필수로 지원해야 한다. 
        1-1. push(m, data) : m번째 스택에 data를 삽입한다. m은 0부터 n-1개까지 존재한다.
        1-2. pop(m) : m번째 스택에서 top에 위치한 데이터를 추출한다.

    3. 공간의 낭비없이 효율적으로 설계되어야 한다.


//  접근방법  //
    Two stacks와 마찬가지로 n개로 미리 나눴을 경우 한 쪽으로 데이터가 삽입되면 다른 스택이 남아있어도 오버플로우가 된다.

    사실 객체안의 키값을 활용하면 n개의 배열을 미리 만들어 놓을 필요가 없기 때문에 구현이 쉬울 수 있다.
    문제는 필요한 stack사이즈와 N개의 스택이 커지면 커질 수록 필요한 배열이 O(N)으로 증가한다.

    따라서, 배열의 개수를 최소화하기 위해서, 일련의 논리적인 설계가 필요하다.
    1. 우선 데이터를 직접 순차로 저장할 실질적인 stack배열을 생성한다.

    2. stack에 삽입할 데이터가 몇 번째 스택에 삽입될지 그리고 삽입된 스택의 top이 어디인지 표시할 장치가 필요하다.
        n만큼의 길이의 배열을 만들어 각 인덱스가 m번째 스택이 되도록 하고 stack[index]가 top이 되도록 한다.
        예를 들어, stack = [0, 1, 2, 3, 4]가 실제로 (0, 2) (1, 4) (3)라면 tops = [2, 4, 3]이 되는 것이다.

    3. 스택의 top을 기억하는 배열을 만들면 필연적으로 이전 top을 기억하기 위한 또 다른 저장공간이 필요하다.
        예를 들어, (0, 2) (1, 4) (3) 에서 1번째 스택의 top은 2인데 pop이 되면 이전 top이었던 0으로 변경되어야 한다.
        즉 이전 top값을 기억하고 있어야 하므로 stack배열과 동일한 크기의 배열을 만들어 이전 인덱스를 기록해야 한다.

    4. stack에 삽입하기 위한 index의 갱신도 일반적인 스택과 다르다. 왜냐하면 배열의 전체 공간이 고정되어 있기 때문이다.
        [1, 2, 3, 4, 5]의 스택에서 일반적인 경우 pop을 하면 5가 추출되지만 여기선 3이 추출될 수도 있기 때문에 index는 2가 되어야 한다.
        따라서, 해당 인덱스로 이동하기 위한 장치 또한 필요하다.
*/

/*  코드  */
class N_stacks {
    constructor (size, n) {
        this.index = 0;
        this.size = size;
        this.stack = new Array(size).fill(null);
        this.tops = new Array(n).fill(-1);
        this.record = new Array(size).fill().map((_, i) => i+1);
    }
/*
    1. stack에 삽입하기 위한 index와 size를 설정하는 기본적인 멤버변수를 설정한다.

    2. 스택과, 탑, 이전 탑을 기록을 위한 배열을 생성한다.
        2-1. stack은 pop이 일어나도 데이터를 추출하는게 아닌 변경을 하는 것이므로 고정된 크기의 배열을 만든다.
        2-2. tops는 n개의 스택에 맞춰 배열을 생성하고 인덱스 시작인 0보다 작은 -1로 초기화한다.
        2-3. record는 m번째 스택의 이전 top값들이 stack에서 어디에 위치해 있는지 기록하는 용도이다.
        2-4. record는 또한 현재 스택에서 비어있는 위치를 index와 교환하기 위해 0이 할당된 index의 다음인 1부터 size까지의 값으로 채운다.
*/
    push (m, data) {
        if (this.index >= this.size) return new Error('stack overflow');
        if (m < 1 || m > this.tops.length) return new Error('stack does not exist');
        
        if (Number.isInteger(m)) {
            const i = this.index;
            this.stack[i] = data;
            this.index = this.record[i];
            this.record[i] = this.tops[m-1];
            this.tops[m-1] = i;
        }
    }
/*
    3. 모든 예외처리를 해준다.
        3-1. 정해진 스택의 범위에 m이 해당되는지 우선 확인한다.
        3-2. index가 record에 존재하는 가장 큰 수와 교환되면 스택이 가득차게 되므로 size와 동일해지면 오버플로우가 된다.
    
    4. 이제 각 배열을 수정해서 데이터 삽입과정을 설계한다.
        4-1. stack에 데이터를 삽입하는 위치를 표시한 index를 변수 i에 할당하고 stack[i]에 데이터를 삽입한다.
        4-2. index에는 stack의 다음 비어있는 인덱스가 기록되어 있는 record[i]를 할당한다.
        4-3. record[i]에는 m스택의 이전 top을 기록하기 위해 tops[m-1]을 할당한다.
        4-4. tops[m-1]에는 현재 m번재 스택의 top값이 되는 i를 할당한다.
*/
    pop (m) {
        if (this.tops[m-1] === -1) return new Error('stack underflow');
        if (m < 1 || m > this.tops.length) return new Error('stack does not exist');
        
        let data;
        if (Number.isInteger(m)) {
            const i = this.tops[m-1];
            data = this.stack[i];
            this.stack[i] = null;
            this.tops[m-1] = this.record[i];
            this.record[i] = this.index;
            this.index = i;
        }
        return data;
    }
/*
    5. 우선 m이 존재하는지 확인하고 tops에서 m번째의 top을 확인해 언더플로우 처리를 해준다.
    
    6. 데이터를 추출하는 과정을 설계한다.
        6-1. 추출하려는 데이터가 존재하는 m번째 스택의 top을 변수 i에 할당한다. 
        6-2. 추출하려는 데이터를 stack[i]에서 가져와 data변수에 할당하고 stack[i]는 null을 할당한다.

    7. 이제 m스택의 top을 이전 top으로 갱신하고 index에 할당될 위치를 record와 i로 교환한다.
        7-1. tops[m-1]에 이전 top을 할당하기 위해 record[i]를 할당해 준다.
        7-2. record[i]에는 다다음에 데이터가 삽입될 위치를 가리킬 index를 할당한다.
        7-3. index에는 현재 pop이 일어난 위치인 i를 할당해 다음 번 push때 i의 위치에 데이터가 들어가도록 한다.
*/
    top (m) {
        let data;
        if (Number.isInteger(m)) data = this.stack[this.tops[m-1]];
        return data;
    }
}
    
//  복잡도  //
//  보조공간 O(N)이 추가로 필요하며, 처음 배열을 생성할 때 O(N)의 시간 복잡도가 소요된다.
//  스택의 생성외에 모든 메서드는 O(1)에서 이뤄진다.