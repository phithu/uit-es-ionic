import { LogItemModule } from './../../components/log-item';
import { FormBaseModule } from './../../components/form-base';
import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { LoadingModule } from '../../components/loading';
import { AlertErrorModule } from '../../components/alert-error';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormBaseModule,
    LogItemModule,
    LoadingModule,
    AlertErrorModule,
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule {
}
