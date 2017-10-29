import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Injectable()
export class PermissionService {

  constructor(private _androidPermissions: AndroidPermissions) { }

  public permissionAvailable(permission: any, allow: Function, notAllow: Function) {
    this._androidPermissions.checkPermission(this._androidPermissions.PERMISSION[`${permission}`])
      .then((result) => {
        let hasPermission = result.hasPermission;
        if (!hasPermission) { // <-- Not Allow permission
          if (notAllow) {
            notAllow(); // <-- execute notAllow()
          }
        } else { // <-- Alow permission
          if (allow) {
            allow(); // <-- execute allow()
          }
        }
      }, (err) => {
        console.log('err: ', err);
      })
  }
  public registerPermission(permission: any) {
    this._androidPermissions.
    requestPermission(this._androidPermissions.PERMISSION[`${permission}`]);
  }
}
