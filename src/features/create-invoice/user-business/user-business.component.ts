import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../services/store.service';
import GeoService, { ICountry, IProvince } from '../../../services/geo.service';

@Component({
  selector: 'user-business',
  template: require('./user-business.component.html'),
  styles: [require('./user-business.component.css')],
})
export default class UserBusinessComponent {
  countries: ICountry[];
  provinces: IProvince[];
  isEditing: boolean;

  @Input() user: IUser;
  @Output() onBusinessChange = new EventEmitter<IUser>();

  constructor(private geoService: GeoService) {}

  ngOnInit() {
    this.geoService.getCountries()
      .then(countries => this.countries = countries);
  }

  ngOnChanges(changes: {user: SimpleChange}) {
    if (changes.user) {
      const currentValue: IUser = changes.user.currentValue;

      if (currentValue.country && currentValue.province && !this.provinces) {
        this.geoService.getProvinces(currentValue.country)
          .then(provinces => this.provinces = provinces);
      }
    }
  }

  handleEdit(): void {
    this.isEditing = true;
  }

  closeModal(): void {
    this.isEditing = false;
  }

  handleCountryChange(countryCode: string) {
    this.geoService.getProvinces(countryCode)
      .then(provinces => this.provinces = provinces);
  }

  handleEditEnd(form: FormGroup): void {
    this.onBusinessChange.emit(form.value);
    this.closeModal();
  }
}
