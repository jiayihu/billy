import { Component, Input } from '@angular/core';
import { IInvoice } from '@services/models/invoices.model';

@Component({
  selector: 'default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.css']
})
export class DefaultTemplateComponent {
  @Input() invoice: IInvoice;
}
