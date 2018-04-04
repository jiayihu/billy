import { Pipe, PipeTransform } from '@angular/core';

interface IFilterOptions {
  notIn: any[];
  property: string;
}

@Pipe({
  name: 'filter'
})
export default class FilterPipe implements PipeTransform {
  transform(items: any[], options: IFilterOptions): any[] {
    if (!items) return null;
    const property = options.property || 'id';

    return items.filter(item => !options.notIn.find(el => el[property] === item[property]));
  }
}
