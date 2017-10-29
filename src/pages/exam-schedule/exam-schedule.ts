import { 
  Component, 
  ChangeDetectorRef
} from '@angular/core';

import {
  IonicPage,
  NavParams,
  ModalController,
  ToastController,
  Platform
} from 'ionic-angular';

import { RoomModalComponent } from '../room-modal';

import { CoreService } from '../../module/core-module';

import {
  ScheduleService
} from '../../module/schedule-module';

import { LocalNotifications } from '@ionic-native/local-notifications';

import {
  DatePicker,
  DatePickerOptions
} from '@ionic-native/date-picker';

import { ThemeableBrowser } from '@ionic-native/themeable-browser';

import { PermissionService } from '../../module/permission-module';

import { AppSetting } from '../../config';

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
  public listSchedule: any[];
  public subscribeNotification: any;
  public listInfoUpdate: any[];

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _permissionService: PermissionService,
    private _themeableBrowser: ThemeableBrowser,
    private _navParams: NavParams,
    private _coreService: CoreService,
    private _scheduleService: ScheduleService,
    private _platform: Platform,
    private _localNotifications: LocalNotifications,
    private _toastCtrl: ToastController,
    private _datePicker: DatePicker,
    private _modalCtrl: ModalController) {
  }

  public ionViewDidLoad() {
    this.getExamShedule();
    this.getInfoUpdate();
    this._localNotifications.clearAll().then(() => { // <-- Clear all notifications
      this.scheduleNotification();
    }).catch((err) => { console.log(err) });
    this.removeTimeSchedule();
  }

  // Did leave page
  public ionViewDidLeave() {
    if (this.subscribeNotification) {
      this.subscribeNotification.unsubscribe();
    }
  }

  public openURL(link: string) {

    this._themeableBrowser.create(link, '_blank', AppSetting.themeBrowser);
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

  public openDatePicker(item: any, idSchedule: number) {

    // config DatePicker
    let dateMax = this._scheduleService.dateMax(item.date, item.hours);
    let platformAndroid = this._platform.is('android');
    let option: DatePickerOptions = {
      mode: 'datetime',
      date: new Date(),
      maxDate: platformAndroid ? dateMax.valueOf() : dateMax,
      minDate: platformAndroid ? new Date().valueOf() : new Date(),
      androidTheme: 5
    }
    this._datePicker.show(option).then(
      (date) => {
        let schedule = this._scheduleService.generateSchedule(item, idSchedule, date);
        this._scheduleService.addSchedule(schedule);
      },
      // Log errors
      (err) => console.log('Error occurred while getting date: ', err));
  }

  public toggleChange(checked: boolean, item: any) {
    if (!checked) {
      this._localNotifications.cancel(item['id']); // <-- Cancel push notification by idSchedule
    } else {
      let itemSchedule = this._scheduleService.findScheduleById(item['id'], this.listSchedule);
      if (!this._scheduleService.compareTimeToNow(item.at, 'minute')) {
        this._localNotifications.schedule(itemSchedule); // <-- continue schedule
        this._scheduleService.resetTimeSchedule(this.listSchedule); // <-- Reset time schedule notification;  
      }
    }
  }

  public compareTimeSchedule(item: any): boolean {

    let scheduleTime = this._scheduleService.dateMax(item.date, item.hours); // <-- Date max in exam scheule
    return this._scheduleService.compareTimeToNow(scheduleTime, 'hour');
  }

  private scheduleNotification() {
    this.listSchedule = [];
    this._platform.ready().then(() => {
      if (this._platform.is('android')) {
        this._permissionService.permissionAvailable('WRITE_EXTERNAL_STORAGE',
        () => { // <-- allow permission
          this.pushNotification();
        },
        () => { // <-- not allow permission
          console.log('Please register permission');
        })
      } else if (this._platform.is('ios')) {
        this.pushNotification();
      } else {
        console.log('Local notification not support on your platform');
      }
    })
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
          this.showToast(msg); // <-- Show messages
        })
    }
  }

  private getInfoUpdate() {
    this._coreService.getInfoUpdate()
      .subscribe((response: any) => {
        if (response.result) {
          this.listInfoUpdate = response.data;
        }
      })
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

  private pushNotification() {
    this._scheduleService.streamSchedules
      .subscribe((notication) => {
        if (notication) { // <-- schedule !== undifined
          const noticationMock = notication;
          this.listSchedule.push(noticationMock); // <-- Add schedule item into listSchedule array
          this._scheduleService.updateShedule(this.listSchedule);
          this._localNotifications.schedule(notication); // <-- Push a notification 
          this._scheduleService.resetTimeSchedule(this.listSchedule) // <-- Reset time schedule notification;
        }
      })
  }
  private removeTimeSchedule() {
    this._localNotifications.on('trigger', () => {
      this._localNotifications.getTriggeredIds()
      .then((listTriggeredId) => {
        listTriggeredId.forEach((Id: number) => {
          let result = this.listSchedule.find(item => item.id === Id); // <-- Find schedule by ID
          if(result) {
            this.listSchedule.splice(this.listSchedule.indexOf(result), 1); // <-- Remove schedule item in listSchedule
            this._changeDetector.detectChanges(); // <-- Execute change detection to update view
          }
        })
      })
    })
  }

}
