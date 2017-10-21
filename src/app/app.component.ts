import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any = HomePage;

  constructor(
    private _platform: Platform,
    private _statusBar: StatusBar,
    private _splashScreen: SplashScreen) {

    if (this._platform.is('cordova')) {
      this._platform.ready().then(() => {
        this._statusBar.backgroundColorByHexString('#00675b');
        this._splashScreen.hide();
      });
    } else {
      console.log('browser');
    }
  }
}

