import { FormBaseModule } from './../../components/form-base';
import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { MaxlengthDirectiveModule } from '../../directives/max-length';


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormBaseModule,
    MaxlengthDirectiveModule,
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule {
}
