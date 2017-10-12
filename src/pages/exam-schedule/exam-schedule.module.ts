import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamSchedulePage } from './exam-schedule';
import { RoomModalModule } from '../room-modal'

@NgModule({
  declarations: [
    ExamSchedulePage,
  ],
  imports: [
    RoomModalModule,
    IonicPageModule.forChild(ExamSchedulePage),
  ],
  entryComponents: [
    ExamSchedulePage
  ]
})
export class ExamSchedulePageModule { }
