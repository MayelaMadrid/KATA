// let alienWave = [[3, 1, 2, -2, 2, 3, 6, -3, 7, 1]];
// let position = [6, 4];
// [0,2,3,4,5,9,10,13,19,22]
// [0,2,3,4,5,9,10,13,19,22]

let alienWave = [
  [5, 2, -2, 3, 1, 0, 4, 8, 3, -2, 5],
  [1, 4, -1, 0, 3, 6, 1, -3, 1, 2, -4],
];
// [1,4,5,6,8,9,10,12,14,15,16,18,19,20,21,26,27,30,32,36]
// [1,4,5,6,8,9,10,12,13,14,15,16,17,19,20,21,27,30,32,36]
let position = [10, 2];

// // let alienWave = [
// //   [4, 1, -7, -5, 1, 6, 3, -2, 1, 0, 2, 6, 5],
// //   [2, 0, 3, -4, 0, 2, -1, 5, -8, -3, -2, -5, 1],
// //   [1, 2, 0, -6, 4, 7, -2, 4, -4, 2, -5, 0, 4],
// // ];
// // let position = [15, 6];
// // [0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,17,18,19,21,22,23,25,27,30,31,32,35,36,38,40,43,45,56,58]
// // [0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,17,18,19,21,22,23,25,27,30,31,32,35,36,38,40,43,45,56,58]

let turn = 0;
let blastSqc = [];

const getValue = (value) => {
  if (Array.isArray(value)) {
    return !isNaN(value[0]) ? { value: value[0], turn: 0 } : value[0];
  }
  return { value, turn: 0 };
};
const minusNextArr = (index, value) =>
  alienWave[0].length - (value - (alienWave[0].length - (index + 1)));

const checkIndex = (waveTmp, i, index, value, newIndex) => {
  if (Array.isArray(waveTmp[i][newIndex])) {
    return [...waveTmp[i][newIndex], { value, turn }];
  }
  if (waveTmp[i][newIndex] != 0) {
    return [waveTmp[i][newIndex], { value, turn }];
  }
  return [{ value, turn }];
};

const setValue = (val) => {
  if (Array.isArray(val)) {
    return val.slice(1).length ? val.slice(1) : 0;
  }
  return 0;
};

const changePositionInvasor = (waveTmp, pst, elementstoCheck) => {
  let elements = 0,
    i = 0,
    k = 0;

  while (elements < elementstoCheck && i < pst[0] - 1) {
    const { value, turn: currently } = getValue(waveTmp[i][k]);
    if (k == waveTmp[0].length) {
      i++;
      k = 0;
      continue;
    }
    if (value === 0 || currently == turn) {
      k++;
      continue;
    }
    if (value > 0) {
      if (waveTmp[0].length <= k + value) {
        waveTmp[i + 1][minusNextArr(k, value)] = checkIndex(
          waveTmp,
          i + 1,
          k,
          -value,
          minusNextArr(k, value)
        );
      } else {
        waveTmp[i][k + value] = checkIndex(waveTmp, i, k, value, k + value);
      }
    } else {
      if (k - Math.abs(value) < 0) {
        waveTmp[i + 1][Math.abs(value + k) - 1] = checkIndex(
          waveTmp,
          i + 1,
          k,
          Math.abs(value),
          Math.abs(value + k) - 1
        );
      } else {
        waveTmp[i][k - Math.abs(value)] = checkIndex(
          waveTmp,
          i,
          k,
          value,
          k - Math.abs(value)
        );
      }
    }
    elements++;

    waveTmp[i][k] = setValue(waveTmp[i][k]);
    if (Array.isArray(waveTmp[i][k]) && waveTmp[i][k][0].turn != turn) {
      k--;
      continue;
    }
    k++;
  }
  console.log(JSON.stringify(waveTmp));
  const checkedShot = checkShot(waveTmp, position);
  console.log(JSON.stringify(checkedShot));

  return checkedShot;
};

function concatArray(newArr, length, pst) {
  while (pst[0] > newArr.length) {
    newArr.push(new Array(length).fill(0));
  }
  return newArr;
}

function checkShot(waveTmp, pst) {
  let newArray = [],
    flag = false;
  for (let i = pst[0] - 1; i >= 0; i--) {
    for (let j = 0; j < waveTmp[0].length; j++) {
      if (j == pst[1] && waveTmp[i][j] != 0 && !flag) {
        console.log(waveTmp[i][j]);
        blastSqc.push(turn - 1);
        flag = true;
        const sorted = waveTmp[i][j].sort((a, b) => a.value - b.value);
        if (sorted.length > 1) {
          let cut;
          if (sorted[0].value > sorted[sorted.length - 1].value) {
            cut = sorted.slice(1);
          } else {
            cut = sorted.slice(0, sorted.length - 1);
          }

          waveTmp[i][j] = cut;
        } else {
          waveTmp[i][j] = 0;
        }
      }
    }
    newArray.unshift(waveTmp[i]);
  }
  return newArray;
}

const blastSequence = (alienW, pst) => {
  let intervalShot;
  let waveTmp = concatArray(alienW, alienW[0].length, pst);
  const elementstoCheck = alienW.flat().length;
  const shotSqc = () => {
    turn++;
    console.log("TURNO", turn);
    waveTmp = changePositionInvasor(waveTmp, pst, elementstoCheck);
    console.log(blastSqc);
    if (
      waveTmp.flat().every((idx) => idx == 0) ||
      waveTmp[pst[0] - 2].flat().every((idx) => idx != 0).length
    )
      clearInterval(intervalShot);
  };
  intervalShot = setInterval(shotSqc, 1000);
};

blastSequence(alienWave, position);
