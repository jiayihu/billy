import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import DatepickerComponent, { pikadayToken } from './datepicker.component';

@Component({
  selector: 'test-cmp',
  template: ''
})
class TestComponent {
  date: string;

  handleDateChange(date: string) {
    this.date = date;
  }
}

describe('DatepickerComponent', () => {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  const spiedDestroy = jasmine.createSpy('pikadayDestroy');
  const spiedPikaday = jasmine.createSpy('pikaday').and.returnValue({ destroy: spiedDestroy });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent, TestComponent]
    });
    const template = `
      <datepicker format="YYYY/MM/DD" value="2017/01/07" (onChange)="handleDateChange($event)"></datepicker>
    `;
    TestBed.overrideComponent(TestComponent, {
      set: {
        template
      }
    });
    TestBed.overrideComponent(DatepickerComponent, {
      set: {
        providers: [{ provide: pikadayToken, useValue: spiedPikaday }]
      }
    });
    fixture = TestBed.createComponent(TestComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    spiedDestroy.calls.reset();
    spiedPikaday.calls.reset();
  });

  it('should instantiate a datepicker when DOM is ready', () => {
    fixture.detectChanges();
    const pikadayArgs = spiedPikaday.calls.first().args[0];
    expect(pikadayArgs.field instanceof HTMLElement).toBeTruthy();
    expect(pikadayArgs.format).toBe('YYYY/MM/DD');
    expect(typeof pikadayArgs.onSelect).toBe('function');
  });
});
