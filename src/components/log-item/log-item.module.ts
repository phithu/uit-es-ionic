import { LogItemComponent } from './log-item';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [
    LogItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogItemComponent
  ]
})
export class LogItemModule { }
