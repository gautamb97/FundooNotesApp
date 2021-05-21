// const pm = new Promise((resolve, reject) => {
//   var condition = true;
//   if (condition) {
//     let a = 2, b = 3
//     resolve(a + b);
//   } else {
//     reject('error');
//   }
// });

// pm.then((data) => {
//   console.log(data, 'done');
// }).catch((err) => {
//   console.log(err, 'not entered to promise ');
// });







function print(one, two) {
  return new Promise((resolve, reject) => {
    var condition = true;
    if (condition) {
      resolve((one + two) + ' addition');
    } else {
      reject('am rejected');
    }
  });
}

const asyncExample = async () => {
  const result = await print(1, 2);
  console.log(result);
};

asyncExample();

const callbackExample = () => {
  console.log('entering in callback function');
  setTimeout(() => console.log('enters in setTimeOut'), 3000);
};
callbackExample();