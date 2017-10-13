import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModalComponent } from './room-modal';
import { IonicPageModule } from 'ionic-angular';
import { LogItemModule } from '../../components/log-item';
import { LoadingModule } from '../../components/loading';
@NgModule({
	declarations: [
		RoomModalComponent
	],
	imports: [
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
