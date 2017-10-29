import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HomePage } from '../pages/home/home';
import { PermissionService } from '../module/permission-module';
import { AppSetting } from '../config'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any = HomePage;

  constructor(
    private _permissionService: PermissionService,
    private _platform: Platform,
    private _statusBar: StatusBar,
    private _splashScreen: SplashScreen) {

    if (this._platform.is('cordova')) {
      this._platform.ready().then(() => {
        this._statusBar.backgroundColorByHexString(AppSetting.statusBar.color);
        this._splashScreen.hide();
        this.registerPermission();

      });
    } else {
      console.log('browser');
    }
  }
  private registerPermission() {
    this._permissionService.permissionAvailable('WRITE_EXTERNAL_STORAGE',
      () => { // <-- Allow
        console.log('WRITE_EXTERNAL_STORAGE is allowed');
      },
      () => { // <-- Not Allow
        this._permissionService.registerPermission('WRITE_EXTERNAL_STORAGE');
      })
  }
}

