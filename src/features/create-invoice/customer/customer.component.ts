import { Component, ElementRef, Input, Output, EventEmitter, SimpleChange, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICustomer } from '../../../services/store.service';
import GeoService, { ICountry, IProvince } from '../../../services/geo.service';
import FormBuilderService, { IField, ISelectField, isSelectField } from '../../../services/form-builder.service';

@Component({
  selector: 'customer',
  template: require('./customer.component.html'),
  styles: [require('./customer.component.css')],
})
export default class CustomerComponent {
  private selectedCustomer: ICustomer;

  private mode: 'adding' | 'editing' | '' = '';
  private customer: ICustomer = { id: '', name: '' };
  private fields: Array<IField | ISelectField>;
  private form: FormGroup;

  @Input() customers: ICustomer[];
  @Output() onAddCustomer = new EventEmitter<ICustomer>();
  @Output() onEditCustomer = new EventEmitter<ICustomer>();

  @ViewChild('selectCustomer') htmlSelectCustomer: ElementRef;

  constructor(private geoService: GeoService, private formBuilderService: FormBuilderService) {
    // @NOTE: Field values will be filled later in this.buildForm
    this.fields = [
        {
          name: 'name',
          label: 'Customer name',
          required: true,
        },
        {
          name: 'vat',
          label: 'VAT Number',
          maxLength: 20,
        },
        {
          name: 'zip',
          label: 'Postal / ZIP Code',
          pattern: '[0-9A-Z-]*',
        },
        {
          controlType: 'select',
          name: 'country',
          label: 'Country',
          options: [],
          // Bind this needed, otherwise this will be the instance of FormControl
          onChange: this.handleCountryChange.bind(this),
        },
        {
          controlType: 'select',
          name: 'province',
          label: 'State / Province',
          options: [],
        },
        {
          name: 'city',
          label: 'City',
        },
        {
          name: 'address',
          label: 'Address',
        },
      ];
  }

  ngOnInit() {
    this.geoService.getCountries()
      .subscribe(countries => {
        const options = countries.map(country => ({ label: country.name, value: country.countryCode }));
        this.setFieldOptions('country', options);
      });
  }

  ngOnChanges(changes: {customers: SimpleChange}) {
    if (changes.customers) {
      const currentCustomers = changes.customers.currentValue;

      // If there is only one customer when set it as selected by default
      if (!this.selectedCustomer && currentCustomers.length === 1) {
        const selectedCustomerId = currentCustomers[0].id;
        this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
      } else if (this.selectedCustomer) {
        this.selectedCustomer = this.customers.find(customer => customer.id === this.selectedCustomer.id);
      }
    }
  }

  buildForm(customer: ICustomer): void {
    this.fields.forEach(field => field.value = customer[field.name] || '');

    this.form = this.formBuilderService.buildFormGroup(this.fields);
  }

  closeModal(): void {
    this.mode = '';
  }

  setFieldOptions(fieldName: string, options: any[]): void {
    const foundField = this.fields.find(field => field.name === fieldName);
    if (isSelectField(foundField)) {
      foundField.options = options;
    }
  }

  handleAddCustomerEnd(): void {
    this.onAddCustomer.emit(this.form.value);
    this.mode = '';
  }

  handleCountryChange(countryCode: string): void {
    this.geoService.getProvinces(countryCode)
      .subscribe(provinces => {
        const options = provinces.map(province => ({ label: province.name, value: province.name }));
        this.setFieldOptions('province', options);
      });
  }

  handleEditCustomer(): void {
    this.mode = 'editing';
    this.buildForm(this.selectedCustomer);
    this.geoService.getProvinces(this.selectedCustomer.country)
      .subscribe(provinces => {
        const options = provinces.map(province => ({ label: province.name, value: province.name }));
        this.setFieldOptions('province', options);
      });
  }

  handleEditCustomerEnd(): void {
    this.onEditCustomer.emit(Object.assign({}, this.form.value, {
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
      this.buildForm({ id: '', name: '' });
      return;
    }

    this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
  }
}
