import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModalComponent } from './room-modal';
import { IonicPageModule } from 'ionic-angular';
import { LogItemModule } from '../../components/log-item';
import { LoadingModule } from '../../components/loading';
import { CoreModule } from '../../module/core-module';
@NgModule({
	declarations: [
		RoomModalComponent
	],
	imports: [
		CoreModule,
		CommonModule,
		LogItemModule,
		LoadingModule,
		IonicPageModule.forChild(RoomModalComponent),
	],
	exports: [
		RoomModalComponent
	],
	entryComponents: [
		RoomModalComponent
	]
})
export class RoomModalModule { }
