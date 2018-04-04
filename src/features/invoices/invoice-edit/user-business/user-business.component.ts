import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  OnInit,
  OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '@services/models/user.model';
import GeoService from '@services/geo.service';
import FormBuilderService, { IField, ISelectField } from '@services/form-builder.service';

@Component({
  selector: 'user-business',
  templateUrl: './user-business.component.html',
  styleUrls: ['./user-business.component.css']
})
export default class UserBusinessComponent implements OnInit, OnChanges {
  isEditing: boolean;
  fields: Array<IField | ISelectField>;
  form: FormGroup;

  @Input() user: IUser;
  @Output() onBusinessChange = new EventEmitter<IUser>();

  constructor(private geoService: GeoService, private formBuilderService: FormBuilderService) {
    // @NOTE: Field values will be filled later in this.buildForm
    this.fields = [
      {
        name: 'name',
        label: 'Business name',
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

  ngOnChanges(changes: { user: SimpleChange }) {
    if (changes.user) {
      const currentUser: IUser = changes.user.currentValue;
      this.buildForm(currentUser);

      // If there is province defined in user, but the list of options is not fetched yet
      if (changes.user.isFirstChange && currentUser.country && currentUser.province) {
        this.geoService.getProvinces(currentUser.country).subscribe(provinces => {
          const options = provinces.map(province => ({
            label: province.name,
            value: province.name
          }));
          this.setFieldOptions('province', options);
        });
      }
    }
  }

  buildForm(user: IUser): void {
    this.fields = this.fields.map(field => ({ ...field, value: user[field.name] || '' }));

    this.form = this.formBuilderService.buildFormGroup(this.fields);
  }

  closeModal(): void {
    this.isEditing = false;
  }

  setFieldOptions(fieldName: string, options: any[]): void {
    this.fields = this.fields.map(field => {
      if (field.name === fieldName) return { ...field, options };

      return field;
    });
  }

  handleEdit(): void {
    this.isEditing = true;
  }

  handleCountryChange(countryCode: string) {
    this.geoService.getProvinces(countryCode).subscribe(provinces => {
      const options = provinces.map(province => ({ label: province.name, value: province.name }));
      this.setFieldOptions('province', options);
    });
  }

  handleEditEnd(): void {
    this.onBusinessChange.emit(this.form.value);
    this.closeModal();
  }
}
