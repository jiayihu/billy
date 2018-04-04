import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IconComponent {
  @Input() name = '';
  @Input() size: number;

  classnames() {
    return {
      icon: true,
      lnr: true,
      [`lnr-${this.name}`]: true
    };
  }
}
