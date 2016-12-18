import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { ITax } from '../../services/store.service';

@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
})
export default class InvoicesComponent implements OnDestroy {
  storeTaxes: ITax[] = [];
  private storeSub: Subscription;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeSub = this.storeService.store$.subscribe(store => {
      this.storeTaxes = store.taxes;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  handleTaxEdit(updatedTax: ITax) {
    this.storeService.editTax(updatedTax);
  }

  handleTaxDelete(taxId: string) {
    this.storeService.deleteTax(taxId);
  }
}
