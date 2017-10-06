import { Directive, Input, HostListener } from '@angular/core';

/**
 * Generated class for the MaxlengthDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[maxlength]' // Attribute selector
})
export class MaxlengthDirective {

  @Input('maxlength') public maxLength: string;

  constructor() { }
  @HostListener('keypress', ['$event']) onkeypress(event) {
    let lengthText = +this.maxLength;
    if (event.target.value.length === lengthText) {
      event.preventDefault();
    }
  }

}
