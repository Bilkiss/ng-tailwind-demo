import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EndpointsService } from '../../../services/endpoints.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  propertySlug;
  propertyDetails: any = {};
  propertyDetailsForm: FormGroup;
  errorProp = false;
  errorProMsg = '';
  userDetails: any;
  imageItem;
  defaultPropImg = '../../../assets/images/property.jpg';

  constructor(
    public endpointService: EndpointsService,
    public route: ActivatedRoute,
    public router: Router,
    private fBuilder: FormBuilder,
    public storage: StorageService
  ) {

    this.propertyDetailsForm = this.fBuilder.group({
      ref: ['', Validators],
      name: ['', Validators],
      slug: ['', Validators],
      description: ['', Validators],
      desc_excerpt: [''],
      date_online: [''],
      date_offline: [''],
      currency: [''],
      contact_phone: [''],
      contact_email: [''],
      price: [''],
      image_property: ['']
    });
  }

  ngOnInit() {

    this.propertySlug = this.route.snapshot.paramMap.get('slug');
    // this.carID = this.route.snapshot.paramMap.get('id');
    // console.log('propertySlug: ', this.propertySlug);

    this.getPropertyDetails();
    this.getUserCred();
  }

  initPropForm() {
    this.propertyDetails = {
      ref: '',
      name: '',
      slug: '',
      description: '',
      desc_excerpt: '',
      date_online: '',
      date_offline: '',
      currency: '',
      contact_phone: '',
      contact_email: '',
      price: '',
      image_property: ''
    };
  }

  getPropertyDetails() {

    if (this.propertySlug) {
      this.endpointService.requestWithUrlParams('property_by_slug', 'get', this.propertySlug).subscribe( res => {
        // console.log('Get property details res: ', res);
        if (res) {
          this.propertyDetails = res;
        }
      }, error => {
        console.log('Error!! get property details res: ', error);
      });
    }

  }

  getUserCred() {
    this.userDetails = this.storage.get('currentUserCred');
    this.userDetails = JSON.parse(this.userDetails);
    // console.log('userDetials: ', this.userDetails);
    if (this.userDetails) {
      this.propertyDetails.contact_phone = this.userDetails.phone;
      this.propertyDetails.contact_email = this.userDetails.email;
    }
  }

  onFileChanged(event: any) {

    // console.log('onFileChanged event: ', event);

    const formData: FormData = new FormData();

    this.imageItem = event.target.files;

    // console.log('onFileChanged event target files: ', this.imageItem);
    // console.log('imageItem[0]: ', this.imageItem[0]);
    // console.log('imageItem[0]name:   ', this.imageItem[0].name);

    formData.append('image', this.imageItem[0]);

    // console.log('formData: ', formData);

    this.endpointService.request('image_upload', 'post', formData).subscribe( res => {
      // console.log('Res upload image: ', res);
      // console.log('Res upload image secureUrl: ', res.secure_url);
      if (res) {
        let secureUrl = res.secure_url;
        this.propertyDetails.image_property = secureUrl;

        // console.log('propertyDetails: ', this.propertyDetails);
      }
    }, error => {
      console.log('Error!!! upload image: ', error);
    });

  }

  addProperty() {
    const propDesc = this.propertyDetails.description;

    this.propertyDetails.desc_excerpt = propDesc.length > 45 ? propDesc.substr(0, 45) + '...' : propDesc;

    // console.log('addProperty propertyDetails: ', this.propertyDetails);

    this.endpointService.request('add_property', 'post', this.propertyDetails).subscribe( res => {
      // console.log('Res add property: ', res);
      if (res)
        this.goToPropList();
    }, error => {
      console.log('Error!! add property: ', error);
      this.errorProp = true;
      this.errorProMsg = error.error.error.message;
    });

  }

  clearPro() {
    this.initPropForm();
  }

  goToPropList() {
    this.router.navigate(['/property-list']);
  }

}
