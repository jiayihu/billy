import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import invariant = require('invariant');
import { IUser } from '../../../services/store.service';
import GeoService, { ICountry, IProvince } from '../../../services/geo.service';

@Component({
  selector: 'user-business',
  template: require('./user-business.component.html'),
})
export default class UserBusinessComponent {
  countries: ICountry[];
  provinces: IProvince[];
  isEditOpen: boolean;
  model: IUser;

  @Input() user: IUser;
  @Output() onBusinessChange = new EventEmitter<IUser>();

  constructor(private geoService: GeoService) {}

  ngOnInit() {
    this.geoService.getCountries()
      .then(countries => this.countries = countries);
  }

  ngOnChanges(changes: {user: SimpleChange}) {
    const user = changes.user;

    if (user) {
      const currentValue: IUser = user.currentValue;
      this.model = Object.assign({}, currentValue);

      if (currentValue.country && currentValue.province && !this.provinces) {
        this.geoService.getProvinces(currentValue.country)
          .then(provinces => this.provinces = provinces);
      }
    }
  }

  handleEdit(): void {
    this.isEditOpen = true;
  }

  closeModal(): void {
    this.isEditOpen = false;
  }

  handleCountryChange(countryCode: string) {
    this.geoService.getProvinces(countryCode)
      .then(provinces => this.provinces = provinces);
  }

  handleEditEnd(form: FormControl): void {
    invariant(form.valid, 'Form must be always valid at this point.');

    this.onBusinessChange.emit(this.model);
    this.closeModal();
  }
}
