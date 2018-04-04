import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  OnInit,
  OnChanges
} from '@angular/core';
import GeoService from '@services/geo.service';
import { FormGroup } from '@angular/forms';
import { ICustomer } from '@services/models/customers.model';
import FormBuilderService, { IField, ISelectField } from '@services/form-builder.service';
import get = require('lodash/get');

@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html'
})
export default class CustomerEditComponent implements OnInit, OnChanges {
  fields: Array<IField | ISelectField>;
  form: FormGroup;

  @Input() mode: 'adding' | 'editing' | '';
  @Input() customer: ICustomer;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onEditEnd = new EventEmitter<ICustomer>();

  constructor(private geoService: GeoService, private formBuilderService: FormBuilderService) {
    // @NOTE: Field values will be filled later in this.buildForm
    this.fields = [
      {
        name: 'name',
        label: 'Customer name',
        required: true
      },
      {
        name: 'vat',
        label: 'VAT Number',
        maxLength: 20
      },
      {
        name: 'zip',
        label: 'Postal / ZIP Code',
        pattern: '[0-9A-Z-]*'
      },
      {
        controlType: 'select',
        name: 'country',
        label: 'Country',
        options: [],
        // Bind this needed, otherwise this will be the instance of FormControl
        onChange: this.handleCountryChange.bind(this)
      },
      {
        controlType: 'select',
        name: 'province',
        label: 'State / Province',
        options: []
      },
      {
        name: 'city',
        label: 'City'
      },
      {
        name: 'address',
        label: 'Address'
      }
    ];
  }

  ngOnInit() {
    this.geoService.getCountries().subscribe(countries => {
      const options = countries.map(country => ({
        label: country.name,
        value: country.countryCode
      }));
      this.setFieldOptions('country', options);
    });
  }

  ngOnChanges(changes: { customer: SimpleChange; mode: SimpleChange }) {
    const mode = changes.mode;
    if (mode && mode.currentValue && mode.currentValue !== mode.previousValue) {
      const newCustomer = get(changes, 'customer.currentValue', undefined) || this.customer;
      this.buildForm(newCustomer);

      if (newCustomer.country) {
        this.geoService.getProvinces(newCustomer.country).subscribe(provinces => {
          const options = provinces.map(province => ({
            label: province.name,
            value: province.name
          }));
          this.setFieldOptions('province', options);
        });
      }
    }
  }

  buildForm(customer: ICustomer): void {
    this.fields = this.fields.map(field => ({ ...field, value: customer[field.name] || '' }));

    this.form = this.formBuilderService.buildFormGroup(this.fields);
  }

  setFieldOptions(fieldName: string, options: any[]): void {
    this.fields = this.fields.map(field => {
      if (field.name === fieldName) return { ...field, options };

      return field;
    });
  }

  handleCancel() {
    this.onCancel.emit();
  }

  handleCountryChange(countryCode: string): void {
    this.geoService.getProvinces(countryCode).subscribe(provinces => {
      const options = provinces.map(province => ({ label: province.name, value: province.name }));
      this.setFieldOptions('province', options);
    });
  }

  handleEditEnd() {
    this.onEditEnd.emit(this.form.value);
  }
}
