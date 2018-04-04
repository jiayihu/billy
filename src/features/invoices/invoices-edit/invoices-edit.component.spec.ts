import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import InvoicesEditComponent from './invoices-edit.component';
import CustomersModel from '@services/models/customers.model';
import InvoicesModel from '@services/models/invoices.model';
import TaxesModel from '@services/models/taxes.model';
import { CustomersModelStub, InvoicesModelStub, TaxesModelStub } from '@test/model-stubs';
import ActivatedRouteStub from '@test/activated-route-stub';

describe('InvoicesEditComponent', () => {
  let comp: InvoicesEditComponent;
  let fixture: ComponentFixture<InvoicesEditComponent>;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [InvoicesEditComponent],
        providers: [
          { provide: CustomersModel, useClass: CustomersModelStub },
          { provide: InvoicesModel, useClass: InvoicesModelStub },
          { provide: TaxesModel, useClass: TaxesModelStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
          { provide: Router, useValue: {} }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(InvoicesEditComponent);
      comp = fixture.componentInstance;

      const activatedRoute: ActivatedRouteStub = fixture.debugElement.injector.get(
        ActivatedRoute
      ) as any;
      activatedRoute.testParams = { invoiceId: 'INVOICE_0' };

      fixture.detectChanges();

      return fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    })
  );

  it('should edit the invoice based on `invoiceId` route param', () => {
    expect(comp.invoice).toEqual(InvoicesModelStub.invoice);
  });

  it('should get customers and available taxes from models', () => {
    expect(comp.customers).toEqual([CustomersModelStub.customer]);
    expect(comp.availableTaxes).toEqual([TaxesModelStub.tax]);
  });
});
