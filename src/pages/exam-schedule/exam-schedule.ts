import { ExamSheduleService } from '../../providers/exam-schedule';
import { Component } from '@angular/core';
import { IonicPage, ItemSliding, NavParams, ModalController, ToastController } from 'ionic-angular';

import { RoomModalComponent } from '../room-modal';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import * as moment from 'moment';


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
  public errorMsg: string;


  constructor(
    private _navParams: NavParams,
    private _examSheduleService: ExamSheduleService,
    private _localNotifications: LocalNotifications,
    private _toastCtrl: ToastController,
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

  public changeDate(e: any, itemSliding: ItemSliding) {
    itemSliding.close();
    console.log(e);
  }

  public dateMax(date: string, hour: string): string {
    let hourFormat = hour.replace('h', '') + ':00';
    let dateFormat = this.convert_MMDDYYYY(date);
    return moment(dateFormat + ' ' + hourFormat).format();
  }
  public dateMin(date: string, hour: string): string {
    return moment(this.dateMax(date, hour)).subtract(7, 'd').toISOString();
  }

  private getExamShedule() {
    this.idStudent = this._navParams.get('idStudent');
    if (this.idStudent) {
      this._examSheduleService.getStudent(this.idStudent)
        .subscribe((response) => {
          if (response.result) {
            this.examSchedule = response.data;
            if (response.msg !== 'success') {
              this.errorMsg = response.msg;
            }
          }
        },
        // errror
        () => {
          let msg = 'Rất tiếc! Hiện tại không thể lấy dữ liệu. Vui lòng kiểm tra lại kết nối Internet và thử lại.';
          this.showToast(msg);
        })
    }
  }
  private showToast(message: string) {
    this._toastCtrl
      .create({
        message: message,
        duration: 20000,
        showCloseButton: true
      })
      .present();
  }
  private convert_MMDDYYYY(date: string): string {
    let days = date.substring(0, 2);
    let month = date.substring(3, 5);
    let year = date.substring(6, 10);
    return `${month}-${days}-${year}`;
  }
}
