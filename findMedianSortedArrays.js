// Constraints:

// nums1.length == m
// nums2.length == n
// 0 <= m <= 1000
// 0 <= n <= 1000
// 1 <= m + n <= 2000
// -106 <= nums1[i], nums2[i] <= 106

// Follow up: The overall run time complexity should be O(log (m+n)).
const checkArr = (nums1, nums2) => {
  const m = nums1.length;
  const n = nums2.length;
  if (m < 0 || m > 1000) throw "Error constraint 1";
  if (n < 0 || n > 1000) throw "Error constraint 2";
  if (m + n < 0 || m + n > 2000) throw "Error constraint 3";
  if ([...nums1, ...nums2].some((i) => i > 1000000)) throw "Error constraint 4";
};

var findMedianSortedArrays = function (nums1, nums2) {
  checkArr(nums1, nums2);

  console.time("Easy");
  const easy = findMedianSortedArraysEasy(nums1, nums2);
  console.timeEnd("Easy");

  console.time("Hard");
  const hard = findMedianSortedArraysHard(nums1, nums2);
  console.timeEnd("Hard");

  return { easy, hard };
};

var findMedianSortedArraysEasy = function (nums1, nums2) {
  const arr = [...nums1, ...nums2].sort((a, b) => a - b);
  const length = arr.length;
  const diviLength = Math.floor(length / 2);

  if (length % 2 == 0) return (arr[diviLength] + arr[diviLength - 1]) / 2;
  return arr[diviLength];
};

// OLog(m+n)
var findMedianSortedArraysHard = function (nums1, nums2) {
  const x = nums1.length;
  const y = nums2.length;

  if (x > y) {
    return findMedianSortedArraysHard(nums2, nums1);
  }

  let low = 0;
  let high = x;
  const totalLength = x + y;

  while (low <= high) {
    const partitionX = Math.round((low + high) / 2);
    const partitionY = Math.floor((totalLength + 1) / 2 - partitionX);

    const maxLeftX = getMin(nums1, partitionX);
    const minRightX = getMax(nums1, partitionX, x);

    const maxLeftY = getMin(nums2, partitionY);
    const minRightY = getMax(nums2, partitionY, y);

    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if (totalLength % 2 == 0)
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );

      return Math.max(maxLeftX, maxLeftY);
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
};

const getMin = (arr, partition) => {
  if (partition === 0) return Number.MIN_VALUE;
  return arr[partition - 1];
};

const getMax = (arr, partition, length) => {
  if (partition === length) return Number.MAX_VALUE;
  return arr[partition];
};

console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
console.log(findMedianSortedArrays([0, 0], [0, 0]));
console.log(findMedianSortedArrays([], [1]));
console.log(findMedianSortedArrays([2], []));
