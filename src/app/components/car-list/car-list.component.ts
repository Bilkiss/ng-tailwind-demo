import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  carList: any = [];
  searchText: any;
  searchItem;
  carFilterList: any = [];
  defaultCarImg = '../assets/images/car.jpg';

  constructor(
    public endpointService: EndpointsService
  ) { }

  ngOnInit() {

    this.getCarList();
    this.searchText = {
      name: '',
      price: '',
      body_type: ''
    };
  }


  resetSearch() {
    this.searchItem = '';
    this.carFilterList = this.carList;
  }

  searchFunc(event) {
    // console.log('event.target.value: ', event.target.value);

    if (event.target.value) {
      this.searchItem = this.searchItem.toLowerCase();

      this.carFilterList = this.carList.filter( x => {
        const carName = x.name.toLowerCase();
        const carBody = x.body_type.toLowerCase();
        const carDesc = x.desc_excerpt.toLowerCase();
        const carContactemail = x.contact_email.toLowerCase();
        const carPrice = x.price.toString();
        const carContactPhone = x.contact_phone.toString();


        return carName.includes(this.searchItem) ||
          carBody.includes(this.searchItem) ||
          carDesc.includes(this.searchItem) ||
          carContactemail.includes(this.searchItem) ||
          carPrice.includes(this.searchItem) ||
          carContactPhone.includes(this.searchItem);

      });
    } else {
      this.carFilterList = this.carList;
    }

  }

  getCarList() {
    this.endpointService.request('car_list', 'get').subscribe( res => {
      // console.log('Get car list res: ', res);
      if (res) {
        this.carList = res;
        if (this.carList) {
          this.carList = this.carList.data;
          this.carList = this.carList.filter( x => {
            // console.log('x: ', x);
            let today = moment(new Date());
            let dateOl = moment(x.date_online);
            let dateOff = moment(x.date_offline);

            // console.log('dateOl: ', dateOl);
            // console.log('dateOff: ', dateOff);

            return dateOff.isAfter(today) && (dateOl.isBefore(today) || dateOl.isSame(today) );

          });

          this.carFilterList = this.carList;
          // console.log('Car list online: ', this.carList.date_online);
          // console.log('Car list: ', this.carList);
        }
      }
    }, error => {
      console.log('Error!! get car list: ', error);
    });

  }

}
