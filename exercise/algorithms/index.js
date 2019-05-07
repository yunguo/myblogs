const option = [
  {value: '', text: '请选择'},
  {value: 0, text: '冒泡算法'},
  {value: 1, text: '插入算法'}
];

const bubbling = (arr) => {
  arr.map(item => {
    let low = 0;
    let hight = arr.length - 1;
    let temp = null;
    while (low < hight) {
      for (let i = hight; i > low; i--) {
        if (arr[i] < arr[i - 1]) {
          temp = arr[i];
          arr[i] = arr[i - 1];
          arr[i - 1] = temp;
        }
      }
      low++;
      for (let i = low; i < hight; i++) {
        if (arr[i] > arr[i + 1]) {
          temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
      hight--;
    }
  });

  return arr;
};

const insertion = (arrs) => {
  for (let i = 1; i < arrs.length; i++) {
    const key = arrs[i];
    let j = i - 1;
    while (j >= 0 && arrs[j] > key) {
      arrs[j + 1] = arrs[j];
      j--;
    }
    arrs[j + 1] = key;
  }
  return arrs;
};

const type = {0: bubbling, 1: insertion};
const Query = () => ({
  sorting: document.querySelector('#sorting'),
  sortResult: document.querySelector('#sortResult'),
  algorithm: document.querySelector('#algorithm'),
  fibonacciRs: document.querySelector('#fibonacciRs'),
  generate: document.querySelector('#generate')
});
const sort = () => {
  const {sorting, sortResult, algorithm} = Query();
  algorithm.innerHTML = option.map(item => `<option value="${item.value}">${item.text}</option>`);
  sorting.onclick = function(e) {
    let inputDataValue = document.querySelector('#inputData').value;
    inputDataValue = inputDataValue && JSON.parse(inputDataValue);
    if (util.objType(inputDataValue) !== 'Array') {
      alert('请输入数组');
      return;
    }
    const algorithmValue = algorithm.options[algorithm.selectedIndex].value;
    if (!algorithmValue) {
      alert('请选择排序算法');
      return;
    }
    const result = type[algorithmValue](inputDataValue);
    sortResult.value = JSON.stringify(result);
  };
};
const fibonacciWarp = () => {
  let map = {};
  const fibonacci = (n) => {
    if (n <= 1) {
      return n;
    } else {
      if (map[n]) {
        return map[n];
      } else {
        const r = fibonacci(n - 2) + fibonacci(n - 1);
        map[n] = r;
        return r;
      }
    }
  };
  const {generate, fibonacciRs} = Query();
  generate.onclick = function(e) {
    let inputDataValue = document.querySelector('#target').value;
    if (inputDataValue !== '') {
      fibonacciRs.value = fibonacci(inputDataValue);
    }
  };
};

const util = {
  objType(arg) {
    return Object.prototype.toString.call(arg).replace(/^\[object ([a-zA-Z0-9]+)\]$/, '$1');
  }
};
window.onload = () => {
  sort();
  fibonacciWarp();
};
