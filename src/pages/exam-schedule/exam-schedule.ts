import { Component } from '@angular/core';
import { IonicPage, ItemSliding, NavParams, ModalController, ToastController, Platform } from 'ionic-angular';

import { RoomModalComponent } from '../room-modal';

import * as moment from 'moment';
import { CoreService } from '../../module/core-module';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScheduleNotiService, ScheduleNotiModel } from '../../module/schedule-noti';


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
  public listScheduleNoti: ScheduleNotiModel[];


  constructor(
    private _navParams: NavParams,
    private _coreService: CoreService,
    private _scheduleNotiService: ScheduleNotiService,
    private _platform: Platform,
    private _localNotifications: LocalNotifications,
    private _toastCtrl: ToastController,
    private _modalCtrl: ModalController) {
  }


  public ionViewDidLoad() {
    this.getExamShedule();
    this.scheduleNotification();

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

  public changeDate(time: any, item: any) {
    // itemSliding.close();
    // let shedule: ScheduleNotiModel = {
    //   id: item.idClass,
    //   title: `Thi môn: ${item.class}`,
    //   at: new Date(moment(time).subtract(1, 'months').format()),
    //   text: `Phòng thi: ${item.room} - Giờ thi: ${item.hours} - STT: ${item.orderNumber}`,
    //   data: item,
    // }
    // console.log(shedule);
    console.log(time)
    // this._scheduleNotiService.addSchedule(shedule);
  }

  public dateMax(date: string, hour: string): string {
    let hourFormat = hour.replace('h', '') + ':00';
    let dateFormat = this.convert_MMDDYYYY(date);
    return moment(dateFormat + ' ' + hourFormat).format();
  }

  public dateMin(date: string, hour: string): string {
    return moment(this.dateMax(date, hour)).subtract(7, 'd').toISOString();
  }

  private scheduleNotification() {
    // this._scheduleNotiService.streamSchedules
    //   .subscribe((listSchedule: any[]) => {
    //     if (listSchedule.length > 0) {
    //       this.listScheduleNoti = listSchedule;
    //       console.log(this.listScheduleNoti);
    //     }
    //   })
    this._platform.ready().then(() => {
      if (this._platform.is('android') || this._platform.is('ios')) {
        this._scheduleNotiService.streamSchedules
          .subscribe((listSchedule: any[]) => {
            if (listSchedule.length > 0) {
              console.log(listSchedule);
              // listSchedule.forEach(item => {
              //   if(moment(item.at).isSame(new Date(new Date().getTime()))) {
              //     console.log('ok');
              //   } else {
              //     console.log('failed');
              //   }
              // })
              
              // this.listScheduleNoti = listSchedule;
              // console.log(listSchedule);

              // alert(this.listScheduleNoti.length);
              this._localNotifications.schedule(listSchedule)
            }
          })
      }
    })
    // console.log(new Date(new Date().getTime()));
    // this._scheduleNotiService.streamSchedules
    //   .subscribe((listSchedule: ScheduleNotiModel[]) => {
    //     if(listSchedule.length > 0) {
    //       this._platform.ready().then(() => {
    //         console.log(new Date(new Date().getTime()));
    //       })
    //     }
    //     // console.log(value);
    //   })
    // this._platform.ready()
    // .then(() => {
    //   if (this._platform.is('android') || this._platform.is('ios')) {
    //     this._localNotifications.schedule({
    //       id: 1,
    //       title: 'HAHA',
    //       text: 'Thi môn Cơ sở dữ liệu - phòng C113 - lúc 13h:30',
    //       at: new Date(new Date().getTime() + 3600),
    //       data: { secret: 'hellloo' }
    //     });
    //   }
    // })
  }

  private getExamShedule() {
    this.idStudent = this._navParams.get('idStudent');
    if (this.idStudent) {
      this._coreService.getStudent(this.idStudent)
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
