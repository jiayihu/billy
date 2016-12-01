import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../services/store.service';
import GeoService from '../../../services/geo.service';
import FormBuilderService, { IField, ISelectField, isSelectField } from '../../../services/form-builder.service';

@Component({
  selector: 'user-business',
  template: require('./user-business.component.html'),
  styles: [require('./user-business.component.css')],
})
export default class UserBusinessComponent {
  private isEditing: boolean;
  private fields: Array<IField | ISelectField>;
  private form: FormGroup;

  @Input() user: IUser;
  @Output() onBusinessChange = new EventEmitter<IUser>();

  constructor(private geoService: GeoService, private formBuilderService: FormBuilderService) {}

  ngOnInit() {
    this.geoService.getCountries()
      .subscribe(countries => {
        const options = countries.map(country => ({ label: country.name, value: country.countryCode }));
        this.setSelectOptions('country', options);
      });
  }

  ngOnChanges(changes: {user: SimpleChange}) {
    if (changes.user) {
      const currentUser: IUser = changes.user.currentValue;
      this.buildForm(currentUser);

      // If there is province defined in user, but the list of options is not fetched yet
      if (changes.user.isFirstChange && currentUser.country && currentUser.province) {
        this.geoService.getProvinces(currentUser.country)
          .subscribe(provinces => {
            const options = provinces.map(province => ({ label: province.name, value: province.name }));
            this.setSelectOptions('province', options);
          });
      }
    }
  }

  buildForm(user: IUser): void {
    this.fields = [
        {
          name: 'name',
          label: 'Business name',
          required: true,
          value: user.name || '',
        },
        {
          name: 'vat',
          label: 'VAT Number',
          maxLength: 20,
          value: user.vat || '',
        },
        {
          name: 'zip',
          label: 'Postal / ZIP Code',
          pattern: '[0-9A-Z-]*',
          value: user.zip || '',
        },
        {
          controlType: 'select',
          name: 'country',
          label: 'Country',
          value: user.country || '',
          options: [],
          // Bind this needed, otherwise this will be the instance of FormControl
          onChange: this.handleCountryChange.bind(this),
        },
        {
          controlType: 'select',
          name: 'province',
          label: 'State / Province',
          value: user.province || '',
          options: [],
        },
        {
          name: 'city',
          label: 'City',
          value: user.city || '',
        },
        {
          name: 'address',
          label: 'Address',
          value: user.address || '',
        },
      ];

    this.form = this.formBuilderService.buildFormGroup(this.fields);
  }

  closeModal(): void {
    this.isEditing = false;
  }

  setSelectOptions(fieldName: string, options: any[]): void {
    const foundField = this.fields.find(field => field.name === fieldName);
    if (isSelectField(foundField)) {
      foundField.options = options;
    }
  }

  handleEdit(): void {
    this.isEditing = true;
  }

  handleCountryChange(countryCode: string) {
    this.geoService.getProvinces(countryCode)
      .subscribe(provinces => {
        const options = provinces.map(province => ({ label: province.name, value: province.name }));
        this.setSelectOptions('province', options);
      });
  }

  handleEditEnd(): void {
    this.onBusinessChange.emit(this.form.value);
    this.closeModal();
  }
}
