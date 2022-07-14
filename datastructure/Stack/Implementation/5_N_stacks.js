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
        this.stack = new Array(size).fill(null);//pop이 일어나도 데이터를 추출하는게 아닌 변경을 하는 것이므로 고정된 크기의 배열을 만든다.
        this.tops = new Array(n).fill(-1);//n개의 스택에 맞춰 배열을 생성하고 인덱스 시작인 0보다 작은 -1로 초기화한다.
        //m번째 스택의 이전 top값들이 stack에서 어디에 위치해 있는지 기록하는 용도이다.
        //또한 현재 스택에서 비어있는 위치를 표시하기 위해 index를 시작점 0으로 다음 인덱스를 가리키기 위해 1부터 size까지의 값으로 채운다.
        this.record = new Array(size).fill().map((_, i) => i+1);
    }
    
    push (m, data) {
        //정해진 스택의 수에 m이 해당되는지 우선 확인한다.
        if (m < 1 || m > this.tops.length) return new Error('check number of stacks');
        //index가 record에 존재하는 가장 큰 수와 교환되면 스택이 가득차게 되므로 size와 동일해지면 오버플로우가 된다.
        if (this.index >= this.size) return new Error('stack overflow');
        //stack 배열에서 비어있는 위치의 인덱스가 할당된 index를 변수 i에 할당한다.
        const i = this.index;
        //index에 stack의 다음 비어있는 위치를 표시하고 있는 record[i]를 할당한다.
        this.index = this.record[i];
        //stack에 데이터를 삽입한다.
        this.stack[i] = data;
        //m번째 top을 데이터가 삽입된 인덱스로 변경하기전 현재 top을 record에 기록하고 변경한다.
        this.record[i] = this.tops[m-1];
        this.tops[m-1] = i;
    }

    pop (m) {
        //우선 m이 존재하는지 확인하고 m번째 top을 확인해 언더플로우 처리를 해준다.
        if (m < 1 || m > this.tops.length) return new Error('check number of stacks');
        if (this.tops[m-1] === -1) return new Error('stack underflow');
        
    }

    top (sNum) {
        //
    }
}
    
//  시간복잡도  //
//  