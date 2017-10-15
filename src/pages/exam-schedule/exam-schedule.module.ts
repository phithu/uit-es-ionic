import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamSchedulePage } from './exam-schedule';
import { RoomModalModule } from '../room-modal'
import { LoadingModule } from '../../components/loading';
import { NotFoundModule } from '../../components/not-found';
import { AlertErrorModule } from '../../components/alert-error';

@NgModule({
  declarations: [
    ExamSchedulePage,
  ],
  imports: [
    RoomModalModule,
    LoadingModule,
    NotFoundModule,
    AlertErrorModule,
    IonicPageModule.forChild(ExamSchedulePage),
  ],
  entryComponents: [
    ExamSchedulePage
  ]
})
export class ExamSchedulePageModule { }
