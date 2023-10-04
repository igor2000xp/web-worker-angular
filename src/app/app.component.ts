import { Component, OnInit } from '@angular/core';
const MESSAGE_NULL_RESULT = `To calculate the Fibonacci result for 42, please click the button`;
const MESSAGE_RESULT = `The the Fibonacci result for 42 is: `;

import { generateFibonacci0 } from './utils/fibonacii-0';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web-worker-angular';
  worker!: Worker;
  resultWorker = MESSAGE_NULL_RESULT;

  ngOnInit(): void {
    this.#initWorker();
    // console.log(generateFibonacci0(40));

  }
  #initWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      console.log(import.meta.url);
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = (evt: MessageEvent) => {
        console.log('Data received from worker ', evt.data[1]);
      };
      this.worker.onerror = (err) => {
        console.error('Error message from worker: ', err);
      };
      // this.worker.postMessage('hello baby');
      this.worker.postMessage({ action: 'generateFibonacci', param: 45 });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  };

  postMsg = () => {
    // this.worker.postMessage({ action: 'generateFibonacci-2', param: 42 });
    this.worker.postMessage({ action: 'generateFibonacci', param: 42 });
    this.worker.onmessage = (evt: MessageEvent) => {
      this.messageWorker((evt.data[1] as number));
    }
  };

  messageWorker = (res: number | null) => {
    this.resultWorker = res ? MESSAGE_RESULT + res : MESSAGE_NULL_RESULT;
  }

  terminateWorker() {
    this.worker.terminate();
  }
}
