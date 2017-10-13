import { NgModule } from '@angular/core';
import { LoadingStudentComponent } from './loading-student';
import { LoadingTextComponent } from './loading-text';
import { LoadingRoomComponent } from './loading-room';

@NgModule({
	declarations: [
		LoadingStudentComponent,
		LoadingTextComponent,
		LoadingRoomComponent
	],
	exports: [
		LoadingStudentComponent,
		LoadingTextComponent,
		LoadingRoomComponent
	]
})
export class LoadingModule { }
