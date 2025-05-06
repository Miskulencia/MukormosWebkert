<<<<<<< HEAD
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safePipe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  transform(value: string): string {
    // Check if the email is provided
    return value && value.includes('@') ? value : 'Email is missing';
  }
}
=======
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safePipe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  transform(value: string): string {
    // Check if the email is provided
    return value && value.includes('@') ? value : 'Email is missing';
  }
}
>>>>>>> master
