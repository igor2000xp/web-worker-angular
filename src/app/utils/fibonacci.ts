declare var _: any;

// importScripts(
//   'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'
// );


// export function generateFibonacci(n: number): number {
//   return n < 1
//     ? 0
//     : n <= 2
//       ? 1
//       : generateFibonacci(n - 1) + generateFibonacci(n - 2);
// }

export const generateFibonacci = (n: number, arr = new Array(n - 1)) => {
  console.log(_.map((x: any) => x));
  const res = [
    arr,
    _.reduce(
      arr,
      (acc: any, curr: any, index: any) =>
        (arr[index + 1] = index ? acc + arr[index - 1] : 1),
      (arr[0] = 1)
    ),

  ];
  console.log(res);
  return res;
};
