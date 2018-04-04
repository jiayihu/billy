import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import IconComponent from './icon.component';

describe('IconComponent template', () => {
  let comp: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent]
    });
    fixture = TestBed.createComponent(IconComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('span'));
    el = de.nativeElement;
  });

  it('should have the correct className based on name input', () => {
    comp.name = 'test';
    fixture.detectChanges();
    expect(el.className).toEqual('icon lnr lnr-test');
  });

  it('should set the correct font size based on size input', () => {
    comp.size = 2;
    fixture.detectChanges();
    expect(el.style.fontSize).toEqual('2rem');
  });
});
