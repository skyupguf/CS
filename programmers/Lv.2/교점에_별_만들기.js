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

//  코드
const findIntersectionPoint = (line) => {
    const coordinates = [];
    let maxR = -100000, minR = 100000, distR = 0, r0Index;
    let maxC = -100000, minC = 100000, distC = 0, c0Index;

    for(let i=0; i<line.length; i++) for(let j=i+1; j<line.length; j++) {
        let denominator = line[i][0]*line[j][1] - line[i][1]*line[j][0];
        if(!denominator) continue;

        let x = (line[i][1]*line[j][2] - line[i][2]*line[j][1]) / denominator;
        let y = (line[i][2]*line[j][0] - line[i][0]*line[j][2]) / denominator;
        if(x - parseInt(x) || y - parseInt(y)) continue;
        
        maxR = Math.max(maxR, y), minR = Math.min(minR, y);
        maxC = Math.max(maxC, x), minC = Math.min(minC, x);
        coordinates.push([x, y]);
    }
    distR = maxR - minR, distC = maxC - minC;
    r0Index = distR - maxR, c0Index = distC - maxC;

    const points = new Array(distR+1).fill('.'.repeat(distC+1));
    coordinates.forEach(([a, b]) => {
        let x = a < 0 ? c0Index + a :  c0Index - a;
        let y = b < 0 ? r0Index + b :  r0Index - b;
        let pointedRow = points[y].split('');
        pointedRow[x] = '*', points[y] = pointedRow.join('');
    });
    return points;
}
/*
풀이
1. 이중루프로 각 교차점의 좌표를 모두 얻는다, 이 때, x 혹은 y값이 정수가 아닌 경우는 저장하지 않아야 한다.
2. 좌표값은 배열로 저장하고 각 배열에서 가장 높은 x, y값과 가장 작은 x, y값을 추출한다.
3. 두 값중 양과 음의 정수로 나뉘었을 경우 x+y+1의 길이만큼 행렬을 만들어야 한다.
4. 만들어진 행렬의 좌표에 *로 대체하고 리턴한다.
5. 음수의 좌표와 양수의 좌표를 어떻게 배열안의 문자열로 넣을 것인가가 관건
6. row[1]이 0보다 작을 경우 어디가

에러핸들링
1. 분모가 0이 올 경우 정의되지 않은 수로 NaN 혹은 -Infinity를 반환하고 배열을 생성하지 못한다.
2. 분모를 먼저 구하고 0인 경우 continue로 다음 수를 루프한다.
3. row와 col값을 바꿔서 할당함, x가 col y가 row다.
*/
