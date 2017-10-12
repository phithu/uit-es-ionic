import { 
  Component, 
  OnInit, 
  Input, 
  ChangeDetectionStrategy
 } from '@angular/core';
 import { List } from 'ionic-angular';
/**
 * Generated class for the FormBaseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'log-item',
  templateUrl: 'log-item.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LogItemComponent implements OnInit {

  @Input() public log: any

  public ngOnInit() {
    // console.log(this.log);
  }
}
