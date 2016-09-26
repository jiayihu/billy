import { Component, ElementRef, Input, Output, EventEmitter, SimpleChange, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICustomer } from '../../../services/store.service';
import GeoService, { ICountry, IProvince } from '../../../services/geo.service';

@Component({
  selector: 'customer',
  template: require('./customer.component.html'),
  styles: [require('./customer.component.css')],
})
export default class CustomerComponent {
  countries: ICountry[];
  provinces: IProvince[];

  isAddingCustomer = false;
  customer: ICustomer = { id: '', name: '' };
  selectedCustomer: ICustomer;

  @Input() customers: ICustomer[];
  @Output() onAddCustomer = new EventEmitter<ICustomer>();

  @ViewChild('selectCustomer') htmlSelectCustomer: ElementRef;

  constructor(private geoService: GeoService) {}

  ngOnInit() {
    this.geoService.getCountries()
      .then(countries => this.countries = countries);
  }

  ngOnChanges(changes: {customers: SimpleChange}) {
    if (changes.customers && !this.selectedCustomer && changes.customers.currentValue.length === 1) {
      const selectedCustomerId = changes.customers.currentValue[0].id;
      this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
    }
  }

  closeModal(): void {
    this.isAddingCustomer = false;
  }

  handleAddCustomerEnd(form: FormGroup): void {
    this.onAddCustomer.emit(form.value);
    this.isAddingCustomer = false;
  }

  handleCountryChange(countryCode: string) {
    this.geoService.getProvinces(countryCode)
      .then(provinces => this.provinces = provinces);
  }

  handleRemoveCustomer(): void {
    this.selectedCustomer = null;
  }

  handleSelectCustomer(selectedCustomerId: string): void {
    if (selectedCustomerId === 'add') {
      this.isAddingCustomer = true;
      this.htmlSelectCustomer.nativeElement.selectedIndex = 0;
      return;
    }

    this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
  }
}
