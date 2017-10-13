import { ExamSheduleService } from '../../providers/exam-schedule';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { RoomModalComponent } from '../room-modal';

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

  constructor(
    private _navParams: NavParams,
    private _examSheduleService: ExamSheduleService,
    private _modalCtrl: ModalController) {
  }

  public ionViewDidLoad() {
    this.getExamShedule();

  }
  public openRoomModal(idClass: string, room: string, idStudent: string) {
    let data = {
      idClass: idClass,
      room: room,
      idStudent: idStudent
    };
    let roomModal = this._modalCtrl.create(RoomModalComponent, data);
    roomModal.present();
  }
  private getExamShedule() {
    this.idStudent = this._navParams.get('idStudent');
    if (this.idStudent) {
      this._examSheduleService.getStudent(this.idStudent)
        .subscribe((response) => {
          console.log(response);
          if (response.result) {
            this.examSchedule = response.data;
          }
        })
    }
  }
}
