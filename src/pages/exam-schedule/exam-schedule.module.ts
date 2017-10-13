import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamSchedulePage } from './exam-schedule';
import { RoomModalModule } from '../room-modal'
import { LoadingModule } from '../../components/loading';

@NgModule({
  declarations: [
    ExamSchedulePage,
  ],
  imports: [
    RoomModalModule,
    LoadingModule,
    IonicPageModule.forChild(ExamSchedulePage),
  ],
  entryComponents: [
    ExamSchedulePage
  ]
})
export class ExamSchedulePageModule { }
