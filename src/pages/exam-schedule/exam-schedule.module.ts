import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamSchedulePage } from './exam-schedule';
import { RoomModalModule } from '../room-modal'
import { LoadingModule } from '../../components/loading';
import { NotFoundModule } from '../../components/not-found';
import { AlertErrorModule } from '../../components/alert-error';
import { CoreModule } from '../../module/core-module';
import { ScheduleModule } from '../../module/schedule-module';
import { PipesModule } from '../../pipes';

@NgModule({
  declarations: [
    ExamSchedulePage,
  ],
  imports: [
    CoreModule,
    RoomModalModule,
    ScheduleModule,
    LoadingModule,
    NotFoundModule,
    AlertErrorModule,
    PipesModule,
    IonicPageModule.forChild(ExamSchedulePage),
  ],
  entryComponents: [
    ExamSchedulePage
  ]
})
export class ExamSchedulePageModule { }
