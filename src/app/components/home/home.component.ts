import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  catList: any = [];
  catFilterList: any = [];
  searchText: any;
  searchItem;

  constructor() { }

  ngOnInit() {

    this.getCatList();

    this.searchText = {
      name: '',
      price: '',
      body_type: ''
    };

  }

  getCatList() {
    this.catList = [
      {
        cat_name: 'Cars',
        cat_image: '../assets/images/car.jpg',
        cat_url: '/car-list'
      },
      {
        cat_name: 'Properties',
        cat_image: '../assets/images/property.jpg',
        cat_url: '/property-list'
      }
    ];
    this.catFilterList = this.catList;
  }

  resetSearch() {
    this.searchItem = '';
    this.catFilterList = this.catList;
  }

  searchFunc(event) {
    // console.log('event.target.value: ', event.target.value);

    if (event.target.value) {
      this.searchItem = this.searchItem.toLowerCase();

      this.catFilterList = this.catList.filter( x => {
        let catName = x.cat_name.toLowerCase();

        return catName.includes(this.searchItem);
      });

    } else {
      // this.carFilterList = this.carList;
      this.catFilterList = this.catList;
    }

  }

}
