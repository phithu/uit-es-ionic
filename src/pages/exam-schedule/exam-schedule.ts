import { Component } from '@angular/core';
import {
  IonicPage,
  NavParams,
  ModalController,
  ToastController,
  Platform
} from 'ionic-angular';

import { RoomModalComponent } from '../room-modal';

import * as moment from 'moment';
import { CoreService } from '../../module/core-module';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {
  ScheduleNotiService,
  ScheduleNotiModel
} from '../../module/schedule-noti';
import {
  DatePicker,
  DatePickerOptions
} from '@ionic-native/date-picker';


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
  public listScheduleNoti: ScheduleNotiModel[] = [];

  public subscribeNotification: any;
  public idClass: string;

  constructor(
    private _navParams: NavParams,
    private _coreService: CoreService,
    private _scheduleNotiService: ScheduleNotiService,
    private _platform: Platform,
    private _localNotifications: LocalNotifications,
    private _toastCtrl: ToastController,
    private _datePicker: DatePicker,
    private _modalCtrl: ModalController) {
  }

  public ionViewDidLoad() {
    this.getExamShedule();
    this.scheduleNotification();
  }

  // Did leave page
  public ionViewDidLeave() {
    if (this.subscribeNotification) {
      this.subscribeNotification.unsubscribe();
    }

    console.log('ionViewDidLeave');
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

  public openDatePicker(item: any, indexSchedule: number) {

    // config DatePicker
    let dateMax = this.dateMax(item.date, item.hours);
    let dateMin = this.dateMin(item.date, item.hours);
    let platformAndroid = this._platform.is('android');
    let option: DatePickerOptions = {
      mode: 'datetime',
      date: new Date(),
      maxDate: platformAndroid ? dateMax.valueOf() : dateMax,
      minDate: platformAndroid ? dateMin.valueOf() : dateMin,
      androidTheme: 5
    }
    this._datePicker.show(option).then(
      (date) => {
        let shedule: ScheduleNotiModel = {
          id: indexSchedule,
          data: item.idClass,
          title: `Thi môn: ${item.class}`,
          at: new Date(moment(date).format()).valueOf(),
          text: `Phòng thi: ${item.room} - Giờ thi: ${item.hours} - STT: ${item.orderNumber}`
        }
        this._scheduleNotiService.addSchedule(shedule);
      },
      // Log errors
      (err) => console.log('Error occurred while getting date: ', err));
  }

  public dateMax(date: string, hour: string): Date {
    // Replace 'h' by space white and add string is ':00'
    let hourFormat = hour.replace('h', '') + ':00';

    let dateFormat = this.convert_MMDDYYYY(date);

    return moment(dateFormat + ' ' + hourFormat).toDate();
  }

  public dateMin(date: string, hour: string): Date {
    // date min = datemax - 7 days
    return moment(this.dateMax(date, hour)).subtract(7, 'd').toDate();
  }

  private scheduleNotification() {
    this._platform.ready().then(() => {
      // If platform is android or ios will push a notification
      if (this._platform.is('android') || this._platform.is('ios')) {
        this._scheduleNotiService.streamSchedules
          .subscribe((listSchedule) => {
            if (listSchedule.length > 0) {
              if (listSchedule.length > 1) {
                this.updateShedule(listSchedule);
              }
              this.checkScheduleTime(listSchedule); // <-- Compare time's schedule with now
              if(listSchedule.length > 0) {
                this.listScheduleNoti = listSchedule;
                this._localNotifications.schedule(listSchedule);   
              }             
            }
          })
      }
    })
  }

  private checkScheduleTime(listSchedule: ScheduleNotiModel[]) {
    listSchedule.forEach((item) => {
      if(moment(item.at).isBefore(new Date(), 'hour')) {
        let indexRemove = listSchedule.indexOf(item);
        listSchedule.splice(indexRemove, 1); // <-- Remove item have schedule time < Now
      }      
    });
  }

  private updateShedule(listSchedule: ScheduleNotiModel[]) {
    let length = listSchedule.length;
    let itemLast = listSchedule[length - 1]; // <-- item last in array
    let itemUpdate = listSchedule.find((value, index) => (value.title === itemLast.title && index !== (length - 1)));
    if(itemUpdate) {
      itemUpdate.at = itemLast.at; // <-- Update time
      this._localNotifications.update(itemUpdate) // <-- Update notification
      listSchedule.pop(); // <-- Delete last item
    }
  }

  private getExamShedule() {
   
    this.idStudent = this._navParams.get('idStudent'); // <-- Get idStudent from HomePage
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
