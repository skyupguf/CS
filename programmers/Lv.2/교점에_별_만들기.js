//  문제요약
//  1. Ax + By + C = 0으로 표현할 수 있는 n개의 직선이 주어질 때, 이 직선의 교점 중 정수 좌표에 별을 그린다.
//  2. 길이가 2 ~ 1,000 사이인 2차원 배열인 line의 원소는 [A, B, C] 형태로 존재한다.
//  3. A, B, C는 -100,000 이상 100,000 이하인 정수로 무수히 많은 교점이 생기는 직선 쌍은 주어지지 않는다. ex) A=0, B=0
//  4. 직선의 교점을 구하는 방법은 아래와 같다.
//      - i0x + i1y + i2 = 0, j0x + j1y + j2 = 0 일 경우가 교점좌표이며 i0j1 - i1j0 = 0인 경우 두 직선은 평행 또는 일치한다.
//      - x = (i1j2-i2j1) / (i0j1-i1j0), y = (i2j0-i0j2) / (i0j1-i1j0) (x, y)의 좌표다. i0j1-i1j0면 NaN, -infinity
//      - line = [[2, -1, 4], [-2, -1, 4], [0, -1, 1], [5, -8, -12], [5, 8, 12]] 일 경우
//      - [2, -1, 4], [-2, -1, 4] => a0b1 - a1b0 = line[i][0]*line[j][1] - line[i][1]*line[j][0]
//      - x = (line[i][1]*line[j][2] - line[i][2]*line[j][1]) / a0b1 - a1b0
//      - y = (line[i][2]*line[j][0] - line[i][0]*line[j][2]) / a0b1 - a1b0
//      - 정수 좌표들만 계산하면 (4, 1), (4, -4), (-4, -4), (-4, 1), (0, 4) (-1, -2)  4 -4  9  /  4 -4  9
//  5. 교점이 되는 부분을 *, 빈 공간을 . 이라 하면 위 좌표의 결과는 아래와 같다.
//        [                     [
//          "..........."           "....*....",  
//          ".....*....."           ".........", 
//          "..........."           ".........", 
//          "..........."           "*.......*", 
//          ".*.......*."           ".........",               
//          "..........."           ".........", 
//          "..........."           ".........",       
//          "..........."           ".........",                
//          "..........."           "*.......*"    
//          ".*.......*."                        ]
//          "..........."              
//                        ]
//  6. 교점외의 비는 공간을 제거하여 오른쪽과 같이 결과를 리턴해야 한다.
//  7. 교점은 1,000 * 1,000 크기 이내에서 표현되며, 별이 한 개 이상 그려지는 입력만 주어진다.
//  8. line = [[0, 1, -1], [1, 0, -1], [1, 0, 1]], return ["*.*"] / line = [[1, -1, 0], [2, -1, 0]], return ["*"]

//  코드#1
const findIntersectionPoint = (line) => {
    const points = [], infinity = Number.MAX_SAFE_INTEGER;

    let [ maxX, minX, distX ] = [ -infinity, infinity ];
    let [ maxY, minY, distY ] = [ -infinity, infinity ];

    for(let i=0; i<line.length; i++) for(let j=i+1; j<line.length; j++) {
        let [A, B, E] = line[i], [C, D, F] = line[j];

        let denominator = A*D - B*C;
        if(!denominator) continue;

        let x = (B*F - E*D) / denominator;
        let y = (E*C - A*F) / denominator;
        if(x - parseInt(x) || y - parseInt(y)) continue;
        
        maxX = Math.max(maxX, x), minX = Math.min(minX, x);
        maxY = Math.max(maxY, y), minY = Math.min(minY, y);
        points.push([x, y]);
    }

    distX = maxX - minX, distY = maxY - minY;
    const CP = Array.from({length: distY+1}, () => new Array(distX+1).fill('.'));

    points.forEach(([x, y]) => {CP[maxY-y][x-minX] = '*'});
    return CP.map(arr => arr.join(''));
}
/*
    풀이#1
    1. 이중루프로 각 교차점의 좌표를 모두 얻는다, 이 때, x 혹은 y값이 정수가 아닌 경우는 저장하지 않아야 한다.
    2. 좌표값은 배열로 저장하고 교차점간의 거리를 구하기 위해 가장 높은 x, y값과 가장 작은 x, y값을 저장해야한다.
    3. 교점의 좌표는 -값이 올 수 있기 때문에 x가 3일 경우 -4와 4사이의 좌표에 있다면, 인덱스 7에 점이 찍혀야 한다.
    4. 이중루프로 교점의 좌표 공식을 통해 값을 구하고 정수가 아닌 경우를 parseInt로 체크해 예외사항을 건너뛴다.
    5. max와 min 값을 교점좌표를 찾을 경우 비교해서 저장하고 해당 교점 좌표는 points배열에 push한다.
    6. 루프가 종료되면 x와 y를 각 최대, 최소 값으로 구하고 이차원 배열을 x의 길이만큼 '.'을 채워 생성한다.
    7. 3번에서와 같이 좌표를 구해 이차원 배열의 교점위치에 '*'로 변경하고 이차원 배열의 원소를 루프하면서 join으로 문자열화 한다.

    에러핸들링
    1. 분모가 0이 올 경우 정의되지 않은 수로 NaN 혹은 -Infinity를 반환하고 배열을 생성하지 못하므로 예외처리 해줘야 한다.
    2. 배열의 길이는 0을 포함하므로 x와 y의 길이에서 모두 +1을 해줘야 한다.
    3. row값인 y의 경우 수가 수가 클 수록 0번째 인덱스에 가까워야 좌표평면에서 큰 수가 되므로 max값에서 현재 y를 -해준다.

    시간복잡도
    주어진 전체 좌표를 이중루프하면서 각 원소끼리 곱을 구하므로 O(N^2)
*/

//  코드#2
const getPoints = (l) => {
    const num = Number.MAX_SAFE_INTEGER;
    let [ maxX, maxY, minX, minY ] = [ -num, -num, num, num ];

    const arr = l.reduce((a, [A, B, E], i, arr) => arr.slice(i+1).reduce((b, [C, D, F]) => {
        const [x, y] = [(B*F - E*D) / (A*D - B*C), (E*C - A*F) / (A*D - B*C)];
        if(Number.isInteger(x) && Number.isInteger(y)) {
            maxX = Math.max(maxX, x), minX = Math.min(minX, x);
            maxY = Math.max(maxY, y), minY = Math.min(minY, y);
            b.push([x, y]);
        } 
        return b;
    }, a), []);

    arr.push([minX, maxY, maxX-minX, maxY-minY]);
    return arr;
}

const drawPoints = (line) => {
    const points = getPoints(line);
    const [X, Y, xl, yl] = points.pop();
    const CP = Array.from({length: yl+1}, () => new Array(xl+1).fill('.'));

    points.forEach(([x, y]) => {CP[Y-y][x-X] = '*'});
    return CP.map(coordinate => coordinate.join(''));
}
/*
    리팩토링
    1. 교점의 좌표와 좌표길이를 구하기 위한 함수를 모듈로 분리해 가독성을 높인다.
    2. reduce 메소드를 활용해 이중루프를 하는 배열을 arr[i+1] 인덱스부터 복사해 루프해 연산을 줄인다.
*/