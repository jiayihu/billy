import { TestBed, ComponentFixture } from '@angular/core/testing';

export default function createTestComponent<T>(
  html: string,
  type: { new (...args: any[]): T }
): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}
