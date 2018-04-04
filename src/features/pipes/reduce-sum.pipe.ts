import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceSum'
})
export default class ReduceSumPipe implements PipeTransform {
  transform(array: any[], property: string): number {
    return array.reduce((acc, item) => acc + item[property], 0);
  }
}
