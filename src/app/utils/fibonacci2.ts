declare var _: any;

export function generateFibonacci2(n: number, arr = new Array(n)) {
  console.log(_.map((x: any) => x));
  console.log('generateFibonacci2: ', n + 1);
  n = n + 1;
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