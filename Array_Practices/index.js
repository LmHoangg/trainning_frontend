// Bai 1: Viết hàm random(start, end) trả về kết quả là 1 số nguyên trong khoảng start-end
const randomNumber = (start, end) => {
  // return Math.floor(Math.random(start, end));
  return Math.floor(Math.random() * (end - start + 1)) + start;
};
console.log(randomNumber(0, 30));

// Bai 2: Tạo 1 mảng init gồm 10 phẩn tử ngẫu nhiên lấy từ hàm random
const initArray = [...Array(10)].map((item) => (item = randomNumber(0, 30)));
console.log(initArray);
// Bai 3. Viết hàm getOddNumbers với đầu vào là mảng array, trả về kết quả là mảng con gồm các số lẻ trong mảng array
// input: [1, 2, 3, 4, 5]
// output: [1, 3, 5]
// suggest:
//         	function getOddNumbers(array) {
//                     	return …
//         	}

function checkData(arr) {
  return arr instanceof Array;
}
console.log(checkData([1, 2, 3]));

// function getOddNumbers(arr) {
//   if (!checkData(arr)) return;
//   let arrNew = [];
//   arr.filter((item) => {
//     if (item % 2 != 0 && !arrNew.includes(item)) arrNew.push(item);
//   });
//   return arrNew;
// }
const getOddNumbers = (arr) => arr.filter((item) => item % 2 !== 0);
// console.log(getOddNumbers("string"));
console.log(getOddNumbers([1, 2, 3, 4, 5, 7, 6, 7, 8]));

// Bai 4. Viết hàm double với đầu vào là mảng array, trả về kết quả là mảng mới gồm các phần tử là gấp đôi phần tử của mảng array
// input: [1, 2, 3, 4, 5]
// output: [2, 4, 6, 8, 10]

function getArrayDouble(arr) {
  if (!checkData(arr)) return;
  return arr.map((item) => item * 2);
}
console.log(getArrayDouble("string"));
console.log(getArrayDouble([1, 2, 3, 4, 5]));

// Trước khi vào bài 5 ta nên làm 1 ví dụ về reduce
// Demo convert Array to Object
const itemList = [
  {
    id: "key1",
    value: "HTML",
  },
  {
    id: "key2",
    value: "CSS",
  },
  {
    id: "key3",
    value: "JavaScript",
  },
];
const arrayToObject1 = (itemList) => {
  return itemList.reduce((itemMap, item) => {
    itemMap[item.id] = item.value;
    return itemMap;
  }, {});
};
console.log(arrayToObject1(itemList));

// Bài 5: Dùng hàm reduce để kiểm tra số lượng phần tử có trong mảng
// input: [1, 3, 4, 5, 1, 3, 1]
// output: { 1: 3, 3: 2, 4: 1, 5: 1}

const arrCheck = [1, 3, 4, 5, 1, 3, 1];
const counterItem = (arr, val) => {
  return arr.reduce((counter, item) => {
    if (item === val) {
      counter++;
    }
    return counter;
  }, 0);
};
const arrayToObject = (itemList) => {
  return itemList.reduce((itemMap, item) => {
    itemMap[`${item}`] = counterItem(itemList, item);
    return itemMap;
  }, {});
};
console.log(arrayToObject(arrCheck));
