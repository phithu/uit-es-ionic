import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
    private _localNotifications: LocalNotifications,
    private _backgroundMode: BackgroundMode,
    private _splashScreen: SplashScreen) {

    if (this._platform.is('cordova')) {
      this._platform.ready().then(() => {
        this._statusBar.backgroundColorByHexString('#006AA9');
        this._splashScreen.hide();
        this._localNotifications.schedule({
          text: 'Delayed ILocalNotification',
          at: new Date(new Date().getTime() + 3600),
          led: 'FF0000',
          sound: null
        });
      });
    } else {
      console.log('browser');
    }
  }
}

