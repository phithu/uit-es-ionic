import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreService } from './core.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    CoreService
  ]

})
export class CoreModule { }
