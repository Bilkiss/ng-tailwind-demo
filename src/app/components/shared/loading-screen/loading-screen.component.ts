import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { LoadingScreenService } from '../../../services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {

  public loading: any = false;
  loadingSubscription: Subscription;

  constructor(private loadService: LoadingScreenService) { }

  ngOnInit() {

    this.loadingSubscription = this.loadService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      // console.log('loading component saw loading change to: ', value);
      this.loading = value;
    });

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
