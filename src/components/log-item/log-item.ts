import { 
  Component,
  Input, 
  ChangeDetectionStrategy
 } from '@angular/core';

@Component({
  selector: 'log-item',
  templateUrl: 'log-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LogItemComponent {

  @Input() public log: any
}
