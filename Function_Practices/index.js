// // 1. Viết hàm getRandomMark trả về điểm random từ start đến end, bước nhảy step
// // suggest:
// //         	function getRandomMark(start, end, step) {
// //                     	…
// //                     	return …
// //         	}
// //         	getRandomMark(6, 10, 0.5) sẽ trả về điểm ngẫu nhiên từ 6-10, cách nhau 0.5 => 6, 6.5, 7,…10
const randInt = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const getRandomMark = (start, end, step) => {
  if (start > end) {
    const tg = start;
    start = end;
    end = tg;
  }
  step = Math.abs(step);
  return start + randInt(0, Math.floor((end - start) / step)) * step;
};
console.log(getRandomMark(6, 10, 0.5));

// // 2. Tạo hàm generateStudentMark(name) trả về 1 object có dạng:
// //         	{
// //                     	name: string,
// //                     	marks: {
// //                                 	literature: number,
// //                                 	maths: number,
// //                                 	chemistry: number,
// //                                 	history: number,
// //                                 	biology: number
// //                     	}
// //         	}
// // maths, literature, history, chemistry, biology tương ứng với điểm các môn toán, văn, sử, hoá, sinh; giá trị là kết quả của hàm getRandomMark ở trên

const generateStudentMark = (name) => {
  return {
    name,
    marks: {
      literature: getRandomMark(0, 10, 0.25),
      maths: getRandomMark(0, 10, 0.25),
      chemistry: getRandomMark(0, 10, 0.25),
      history: getRandomMark(0, 10, 0.25),
      biology: getRandomMark(0, 10, 0.25),
    },
  };
};
console.log(generateStudentMark("lam"));

// // 3. Tạo 1 mảng markList gồm khoảng 5 - 10 bạn sinh viên

const numberStudent = randInt(5, 10);
const markList = [...Array(numberStudent)].map(
  (item, index) => (item = generateStudentMark(`Student ${index + 1}`))
);
console.log(markList);

// // 4. Viết hàm tính điểm trung bình môn với điểm môn văn và toán nhân đôi ( viết hàm chung để có thể xử dụng nếu có nhiều hơn 5 môn kể trên), kết quả trả về là 1 object có key là tên các bạn sinh viên, giá trị là điểm trung bình môn

// // [1, 3, 4, 5, 6];
// // output: (1*2+3*2+4+5+6)/(length+2)

// create object key la ten mon value la he so nhan

const arraySubject = {
  literature: 2,
  chemistry: 1,
  history: 1,
  biology: 1,
  maths: 2,
};
// ham tinh tb mon
const gpa = (obj1, obj2) => {
  let total = 0;
  let totalFactor = 0;
  for (const key in obj1) {
    for (const key2 in obj2) {
      if (key === key2) {
        total += obj1[key] * obj2[key2];
        totalFactor += obj2[key2];
      }
    }
  }
  return (total / totalFactor).toFixed(3);
};

// // hàm show list student & marksTB từng người

const showListMarkGPA = (itemList, listSub) => {
  return itemList.reduce((itemMap, item) => {
    itemMap[item.name] = Number(gpa(item.marks, listSub));
    return itemMap;
  }, {});
};
console.log(showListMarkGPA(markList, arraySubject));

// // 5. Viết hàm tìm kiếm những bạn có điểm trung bình >= 8, tìm bạn học tốt nhất, kém nhất từng môn

// // vì ramdom ra điểm toàn thấp nên tạo sớm dữ liệu :))

const arrList = [
  {
    name: "lam",
    marks: {
      maths: 10,
      literature: 8,
      history: 7,
    },
  },
  {
    name: "nam",
    marks: {
      maths: 7,
      literature: 6,
      history: 9,
    },
  },
  {
    name: "hoa",
    marks: {
      maths: 10,
      literature: 8.5,
      history: 9,
    },
  },
  {
    name: "tu",
    marks: {
      maths: 9,
      literature: 7.25,
      history: 9,
    },
  },
  {
    name: "dao",
    marks: {
      maths: 8,
      literature: 8,
      history: 9,
    },
  },
];

// // hàm tìm sinh viên điểm TB trên 8

const searchListMarkGPA = (itemList, listSub) => {
  return itemList.reduce((itemMap, item) => {
    let markAvg = Number(gpa(item.marks, listSub));
    if (markAvg >= 8) itemMap[item.name] = Number(markAvg);
    return itemMap;
  }, {});
};
console.log(searchListMarkGPA(arrList, arraySubject));

// hàm tìm sinh viên điểm TB cao nhất nếu nhiều bạn học tốt = nhau in hết

const searchMaxGPA = (itemList, listSub) => {
  const listItem = itemList.reduce((itemMap, item) => {
    let markAvg = Number(gpa(item.marks, listSub));
    itemMap[item.name] = Number(markAvg);
    return itemMap;
  }, {});

  for (const key in listItem) {
    if (listItem[key] === Math.max(...Object.values(listItem))) {
      console.log(`Sinh vien hoc tot nhat la ${key} TB ${listItem[key]}`);
    }
  }
};
searchMaxGPA(arrList, arraySubject);

//kém nhất từng môn

const minMarks = (arr, sub) => {
  return arr.reduce(function (prev, curr) {
    return prev.marks[sub] < curr.marks[sub] ? prev : curr;
  });
};
console.log(minMarks(arrList, "history"));

//6. Với mỗi điểm 8, 9, 10 lần lượt được thưởng 1000000, 2000000, 5000000. Tính số tiền thưởng của từng bạn

const totalBonus = (arr) => {
  return arr.reduce((itemMap, item) => {
    if (item >= 8 && item < 9) itemMap += 1000;
    else if (item >= 9 && item < 10) itemMap += 2000;
    else if (item === 10) itemMap += 5000;
    else itemMap += 0;
    return itemMap;
  }, 0);
};
console.log(totalBonus([1, 8, 9, 10, 8.5]));

// List student give presents

const listBonus = (itemList) => {
  return itemList.reduce((itemMap, item) => {
    itemMap[item.name] = totalBonus(Object.values(item.marks));
    return itemMap;
  }, {});
};
console.log(listBonus(arrList));
