import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'yyyy-MM-dd'): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('yyyy')) options.year = 'numeric';
    if (format.includes('MM')) options.month = '2-digit';
    if (format.includes('dd')) options.day = '2-digit';

    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }
}
