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

  mode: 'adding' | 'editing' | '' = '';
  customer: ICustomer = { id: '', name: '' };
  selectedCustomer: ICustomer;

  @Input() customers: ICustomer[];
  @Output() onAddCustomer = new EventEmitter<ICustomer>();
  @Output() onEditCustomer = new EventEmitter<ICustomer>();

  @ViewChild('selectCustomer') htmlSelectCustomer: ElementRef;

  constructor(private geoService: GeoService) {}

  ngOnInit() {
    this.geoService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  ngOnChanges(changes: {customers: SimpleChange}) {
    if (changes.customers) {
      if (!this.selectedCustomer && changes.customers.currentValue.length === 1) {
        const selectedCustomerId = changes.customers.currentValue[0].id;
        this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
      } else if (this.selectedCustomer) {
        this.selectedCustomer = this.customers.find(customer => customer.id === this.selectedCustomer.id);
      }

      if (this.selectedCustomer && this.selectedCustomer.country && !this.provinces) {
        this.geoService.getProvinces(this.selectedCustomer.country)
          .subscribe(provinces => this.provinces = provinces);
      }
    }
  }

  closeModal(): void {
    this.mode = '';
  }

  handleAddCustomerEnd(form: FormGroup): void {
    this.onAddCustomer.emit(form.value);
    this.mode = '';
  }

  handleCountryChange(countryCode: string): void {
    this.geoService.getProvinces(countryCode)
      .subscribe(provinces => this.provinces = provinces);
  }

  handleEditCustomer(): void {
    this.customer = this.selectedCustomer;
    this.mode = 'editing';
  }

  handleEditCustomerEnd(form: FormGroup): void {
    this.onEditCustomer.emit(Object.assign({}, form.value, {
      id: this.selectedCustomer.id,
    }));
    this.mode = '';
  }

  handleRemoveCustomer(): void {
    this.selectedCustomer = null;
  }

  handleSelectCustomer(selectedCustomerId: string): void {
    if (selectedCustomerId === 'add') {
      this.mode = 'adding';
      this.htmlSelectCustomer.nativeElement.selectedIndex = 0;
      return;
    }

    this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
  }
}
