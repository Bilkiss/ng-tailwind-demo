import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private _loading = false;
  loadingStatus = new Subject();

  constructor() { }


  get loading(): boolean {
    return this._loading;
  }

  set loading(value) {
    // console.log("loading service setting value to", value);
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

}
