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

    따라서, 배열의 개수를 최소화하기 위해서, 우선 데이터를 직접 순차로 저장할 실질적인 stack배열을 생성한다.
    stack에 삽입할 데이터가 몇 번째 스택에 삽입될지 그리고 삽입된 스택의 top이 어디인지 표시할 장치가 필요하다.
    N만큼의 길이의 배열을 만들어 각 인덱스가 m번째 스택이 되도록 하고 stack[index]가 top이 되도록 한다.
    예를 들어, stack = [0, 1, 2, 3, 4]가 실제로 (0, 2) (1, 4) (3)라면 tops = [2, 4, 3]이 되는 것이다.

    문제는 pop이 이뤄질 때 tops의 각 스택의 top이 이전 top값으로 리턴할 수 있도록 기록해두는 것이다.
    이를 위해 stack과 동일한 크기의 배열 record를 생성해 해당 인덱스의 위치에 m번째 스택의 이전 top을 기록해 두어야 한다.

    마지막으로, stack에 추가하기 위한 index도 스택이 N개가 될 경우 N개가 필요하기 때문에 record 배열을 통해 이전 index를 기록하는데 사용한다.
    왜냐하면, 인덱스 5까지 채웠는데 인덱스 3이 추출되면 다음에 스택공간에 추가하기 위해 인덱스3을 활용할 수 있어야하기 때문이다.
*/

/*  코드  */
class N_stacks {
    constructor (size, n) {
        this.index = 0;
        this.size = size;
        this.stack = new Array(size).fill(null);//실질적인 데이터가 삽입되는 배열로 인덱스가 고정되어 있어야 하므로 size크기에 맞춰 null을 할당한다.
        this.tops = new Array(n).fill(-1);//각각의 스택에 top을 할당할 n길이의 배열을 생성하고 default값을 인덱스의 시작인 0보다 작은 -1로 채운다.
        //각 스택의 이전 top을 기록해 놓을 배열을 생성하고 index값을 기록하기 위해 1부터 size까지 순차로 채운다.
        this.record = new Array(size).fill().map((_, i) => i+1);
    }
    
    push (m, data) {
        //m이 1이상 tops의 길이이하인지 우선 체크를 한다.
        if (m < 1 || m > this.tops.length) return new Error('check number of stacks');
        //index가 record에 존재하는 가장 큰 수와 교환되면 스택이 가득차게 되므로 size와 동일해지면 오버플로우가 된다.
        if (this.index >= this.size) return new Error('stack overflow');
        //오버플로우 체크를 완료하면 우선 현재 사용할 기본 인덱스를 변수에 할당해 놓는다.
        const i = this.index;
        //index는 다음에 추가할 위치를 기록해둔 record[i]로 갱신한다.
        this.index = this.record[i];
        //
        this.stack[this.index] = data;
        //m번째 스택의 top을 변경하기전 이전값을 기록해 두어야 하므로 record배열을 먼저 변경한다.
        //우선, record

        this.record[this.index] = this.tops[m-1];
        //m번째 스택에 삽입되었다는걸 표시하기 위해 tops배열의 m-1에 index를 기록하고 이는 m번재 스택의 현재 top이 된다.
        this.tops[m-1] = this.index;
        this.index++;
    }

    pop (m) {
        //m-1번째 스택의 값이 -1일 경우 해당스택은 비어있다.
        if (!Number.isInteger(m) || m < 1) return new Error('invalid number');
        if (this.tops[m-1] === -1) return new Error('stack underflow');
        //m번째 스택의 top인 tops[m-1]을 추출해 변수 i에 할당해 놓고 추출할 데이터도 data변수에 할당한다.
        const i = this.tops[m-1];
        const data = this.stack[i];
        //tops[m-1]의 이전 top을 기록하고 있는 record[i]를 tops[m-1]에 할당해 이전 top으로 리턴한다.
        this.tops[m-1] = this.record[i];
        //추출할 인덱스에 위치한 값들을 stack과 record에서 null처리 해준다.
        this.stack[i] = this.record[i] = null;


    }

    top (sNum) {
        //
    }
}
    
//  시간복잡도  //
//  