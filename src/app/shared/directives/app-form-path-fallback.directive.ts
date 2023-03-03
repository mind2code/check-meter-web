import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormPathFallback]'
})
export class AppFormPathFallbackDirective {
  @HostListener('blur', ['$event.target'])
  onBlur(element: any) {
    //console.log('*** blur event', element.className); // TODO: Remove
    let classNames = String(element.className).split(' ');
    if (~classNames.indexOf('ng-invalid')) {
      classNames.push('is-invalid');
      classNames = classNames.filter((className) => className !== 'is-valid');
    } else if (~classNames.indexOf('ng-valid')) {
      classNames.push('is-valid');
      classNames = classNames.filter((className) => className !== 'is-invalid');
    }
    element.className = classNames.join(' ');
  }

  @HostListener('focus', ['$event.target'])
  onFocus(element: any) {
    let classNames = String(element.className).split(' ');
    classNames = classNames.filter((className) => !~['is-valid', 'is-invalid'].indexOf(className));
    element.className = classNames.join(' ');
  }
}
