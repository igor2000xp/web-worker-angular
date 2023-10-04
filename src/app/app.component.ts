import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { generateFibonacci0 } from './utils/fibonacii-0';

const MESSAGE_NULL_RESULT = `To calculate the Fibonacci result for 42, please click the button`;
const MESSAGE_RESULT = `The the Fibonacci result for 42 is: `;
const MESSAGE_NULL_RESULT_SHARED = `To calculate the Fibonacci result for 44, please click the button TWICE`;
const MESSAGE_RESULT_SHARED = `The the Fibonacci result for 44 is: `;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  title = 'web-worker-angular';
  worker!: Worker;
  resultWorker = MESSAGE_NULL_RESULT;
  sharedWorker!: SharedWorker;
  resultSharedWorker: string | undefined = MESSAGE_NULL_RESULT_SHARED;
  changedSharedWorker = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initWorker();
    this.initSharedWorker();
    // generateFibonacci0(45);
  }

  private initWorker() {
    if (typeof Worker !== 'undefined') {
      console.log(import.meta.url);
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = (evt: MessageEvent) => {
        console.log('Data received from worker ', evt.data[1]);
      };
      this.worker.onerror = (err) => {
        console.error('Error message from worker: ', err);
      };
      this.worker.postMessage({ action: 'generateFibonacci', param: 45 });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  postMsg = () => {
    this.worker.postMessage({ action: 'generateFibonacci', param: 42 });
    this.worker.onmessage = (evt: MessageEvent) => {
      console.log('Data received from worker ', evt.data[1]);
      this.messageWorker((evt.data[1] as number));
    }
  }

  messageWorker = (res: number | null) => {
    this.resultWorker = res ? MESSAGE_RESULT + res : MESSAGE_NULL_RESULT;
  }

  terminateWorker() {
    this.worker.terminate();
  }

  private initSharedWorker() {
    if (typeof SharedWorker !== 'undefined') {
      this.sharedWorker = new SharedWorker(
        new URL('./app.shared.worker', import.meta.url)
      );
      this.sharedWorker.port.onmessage = ({ data }) => {
        console.log('Data received from shared worker ', data[1]);
      };
      this.sharedWorker.port.onmessageerror = (error) => {
        console.error('Error message received from shared worker:', error);
      };
    } else {
      // Shared Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  postSharedMsg() {
    this.sharedWorker.port.postMessage({ action: 'generateFibonacci', param: 40 });
    this.sharedWorker.port.onmessage = async ({ data }) => {
      const result = await data[1];
      console.log('Data received from shared worker', result);
      this.messageSharedWorker(result);
    }
  }

  terminateSharedWorker() {
    this.sharedWorker.port.postMessage({ action: 'terminate' });
  }

  messageSharedWorker = async (res: number | undefined) => {
    this.resultSharedWorker = res !== undefined ? MESSAGE_RESULT_SHARED + res : MESSAGE_NULL_RESULT_SHARED;
    this.resultSharedWorker = res !== undefined ? MESSAGE_RESULT_SHARED + res : MESSAGE_NULL_RESULT_SHARED;
    console.log('messageSharedWorker', res);
    this.cdr.detectChanges();
  }
}
