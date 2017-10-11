import { ExamSheduleService } from '../../providers/exam-schedule';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExamScheduleModel } from '../../model/exam-schedule';
/**
 * Generated class for the ExamSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'off'
})
@Component({
  selector: 'page-exam-schedule',
  templateUrl: 'exam-schedule.html',
})
export class ExamSchedulePage {

  public idStudent: string;
  public examSchedule: any;
  // public examSchedule: ExamScheduleModel;

  constructor(private _navParams: NavParams, 
    private _examSheduleService: ExamSheduleService) {
  }

  public ionViewDidLoad() {
    this.idStudent = this._navParams.get('idStudent');
    if(this.idStudent) {
      this._examSheduleService.getStudent(this.idStudent)
      .subscribe((response) => {
        if(response.result) {
          this.examSchedule = response.data;
        }
      })
    }
  }

}
