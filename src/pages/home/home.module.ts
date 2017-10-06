import { FormBaseModule } from './../../components/form-base';
import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormBaseModule,
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    HomePage
  ],
  providers: [
    Keyboard,
  ]
})
export class HomePageModule {
}
