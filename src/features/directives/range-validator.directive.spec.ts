import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import createTestComponent from '@test/create-test-component';
import RangeValidatorDirective from './range-validator.directive';

@Component({
  selector: 'test-cmp',
  template: ''
})
class TestComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      number: new FormControl(10)
    });
  }
}

describe('RangeValidatorDirective', () => {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RangeValidatorDirective, TestComponent]
    });
    const template = `
      <form [formGroup]="form">
        <input type="text" [formControlName]="'number'" [validateRange]="'0-100'" />
      </form>
    `;
    fixture = createTestComponent(template, TestComponent);
    comp = fixture.componentInstance;
  });

  it('should validate the FormControl value on init', () => {
    expect(comp.form.controls['number'].valid).toBe(true);
    expect(comp.form.valid).toBe(true);
  });

  it('should validate the FormControl value on change', () => {
    comp.form.controls['number'].setValue('20');
    fixture.detectChanges();
    expect(comp.form.controls['number'].valid).toBe(true);
    expect(comp.form.valid).toBe(true);
  });

  it('should invalidate the FormControl value on change', () => {
    comp.form.controls['number'].setValue('101');
    fixture.detectChanges();
    expect(comp.form.controls['number'].valid).toBe(false);
    expect(comp.form.valid).toBe(false);
  });
});
