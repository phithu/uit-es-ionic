import { NgModule } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PermissionService } from './permission.service';

@NgModule({
  providers: [
    AndroidPermissions,
    PermissionService
  ]
})
export class PermissionModule { }
