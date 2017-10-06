import { ExamSchedulePageModule } from './../pages/exam-schedule/exam-schedule.module';
import { ProductService } from './../providers/products-service/products.service';
import { HttpModule } from '@angular/http';
// Core Angular - Ionic
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Module
import { BrowserModule } from '@angular/platform-browser';
import { HomePageModule } from '../pages/home';

// Page
import { MyApp } from './app.component';
import { Keyboard } from '@ionic-native/keyboard';

//Service


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HomePageModule,
    ExamSchedulePageModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    ProductService,
    StatusBar,
    Keyboard,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
