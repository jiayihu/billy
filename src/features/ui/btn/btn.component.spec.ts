import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import createTestComponent from '@test/create-test-component';
import BtnComponent from './btn.component';

@Component({
  selector: 'test-cmp',
  template: ''
})
class TestComponent {
  event: any;

  handleClick(event) {
    this.event = event;
  }
}

describe('BtnComponent', () => {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnComponent, TestComponent]
    });
    const template = '<btn type="primary" (onClick)="handleClick($event)"></btn>';
    fixture = createTestComponent(template, TestComponent);
    comp = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('button'));
    el = debugEl.nativeElement;
    fixture.detectChanges();
  });

  it('should display the correct btn type', () => {
    expect(el.className).toEqual('btn btn-primary');
  });

  it('should pass the Event instance when clicked', () => {
    debugEl.triggerEventHandler('click', { type: 'click' });
    expect(comp.event).toEqual({ type: 'click' });
  });
});
