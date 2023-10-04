/// <reference lib="webworker" />

import { generateFibonacci } from "./utils/fibonacci";
import { generateFibonacci2 } from "./utils/fibonacci2";


declare var _: any;
importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'
);

addEventListener('message', (evt) => {
  console.log(`Worker action is: `, evt.data.action, ', param =', evt.data.param);

  if (evt.data.action === 'generateFibonacci') {
    const response = generateFibonacci(evt.data.param);
    postMessage(response);
  }
  // Add another action here
  else if (evt.data.action === 'generateFibonacci-2') {
    console.log(`Action is: `, evt.data.action);
    const response = generateFibonacci2(evt.data.param);
    postMessage(response);
  }
});
