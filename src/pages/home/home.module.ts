import { LogItemModule } from './../../components/log-item';
import { FormBaseModule } from './../../components/form-base';
import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormBaseModule,
    LogItemModule,
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule {
}
