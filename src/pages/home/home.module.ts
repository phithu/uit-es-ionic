import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule {
}
