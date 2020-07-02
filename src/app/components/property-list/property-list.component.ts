import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  propertyList: any = [];
  searchText: any;
  searchItem;
  propertyFilterList: any = [];
  defaultPropImg = '../../../assets/images/property.jpg';

  constructor(
    public endpointService: EndpointsService
  ) { }

  ngOnInit() {
    this.getPropertyList();
    this.searchText = {
      name: '',
      price: '',
      email: ''
    };

  }

  resetSearch() {
    this.searchItem = '';
    this.propertyFilterList = this.propertyList;
  }

  searchFunc(event) {
    // console.log('event.target.value: ', event.target.value);

    if (event.target.value) {
      this.searchItem = this.searchItem.toLowerCase();

      this.propertyFilterList = this.propertyList.filter( x => {
        const propertyName = x.name.toLowerCase();
        const propDesc = x.desc_excerpt.toLowerCase();
        const propEmail = x.contact_email.toLowerCase();
        const propPrice = x.price.toString();
        const propPhone = x.contact_phone.toString();
        // let carBody = x.body_type.toLowerCase();

        return propertyName.includes(this.searchItem) ||
          propDesc.includes(this.searchItem) ||
          propEmail.includes(this.searchItem) ||
          propPrice.includes(this.searchItem) ||
          propPhone.includes(this.searchItem);

      });
    } else {
      this.propertyFilterList = this.propertyList;
    }

  }

  getPropertyList() {
    this.endpointService.request('property_list', 'get').subscribe( res => {
      // console.log('Get property list res: ', res);
      if (res) {
        this.propertyList = res;
        if (this.propertyList) {
          this.propertyList = this.propertyList.data;
          this.propertyList = this.propertyList.filter( x => {
            // console.log('x: ', x);
            let today = moment(new Date());
            let dateOl = moment(x.date_online);
            let dateOff = moment(x.date_offline);

            // console.log('dateOl: ', dateOl);
            // console.log('dateOff: ', dateOff);

            return dateOff.isAfter(today) && (dateOl.isBefore(today) || dateOl.isSame(today) );

          });

          this.propertyFilterList = this.propertyList;
          // console.log('Property list online: ', this.propertyList.date_online);
          // console.log('Property list: ', this.propertyList);
        }
      }
    }, error => {
      console.log('Error!! get property list: ', error);
    });
  }

}
