import {
  Component, Input
} from '@angular/core';

@Component({
  selector: 'alert-error',
  templateUrl: 'alert-error.html',

})
export class AlertErrorComponent {
  @Input('message') public message: string;
}
