import { Injectable } from '@angular/core';
import 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ScheduleModel } from './shedule.model';
import * as moment from 'moment';

@Injectable()
export class ScheduleService {

  private _listSchedules: any[] = [];

  public streamSchedules = new BehaviorSubject<any>(null);

  public get listSchedules(): any[] {
    return this._listSchedules;
  }

  public addSchedule(value: any) {
    this.listSchedules.push(value);
    this.streamSchedules.next(value);
  }

  public updateShedule(listSchedule: any[]) {
    if (listSchedule.length > 1) {
      let length = listSchedule.length;
      let itemLast = listSchedule[length - 1]; // <-- item last in array
      let itemUpdate = listSchedule.find((value, index) => (value.title === itemLast.title && index !== (length - 1)));
      if (itemUpdate) {
        itemUpdate.at = itemLast.at; // <-- Update time
        // this._localNotifications.update(itemUpdate) // <-- Update notification
        listSchedule.pop(); // <-- Delete last item
      }
    }
  }

  public resetTimeSchedule(listSchedule: any[]) {
    listSchedule.forEach(item => {
      let length = item.at.toString().length;
      item.at = parseInt(`${item.at.toString()}${this.generateZeroNumber(13 - length)}`);
    })
  }

  public generateSchedule(item: any, idSchedule: number, date: Date) {
    return {
      id: idSchedule,
      data: item.idClass,
      title: `Thi môn: ${item.class}`,
      at: new Date(moment(date).format()).valueOf(),
      text: `Phòng thi: ${item.room} - Giờ thi: ${item.hours} - STT: ${item.orderNumber}`
    }
  }

  public findScheduleById(id: number, listSchedule: any[]) {
    if (listSchedule.length > 0) {
      return listSchedule.find((item) => item.id === id);
    }
  }

  public convert_MMDDYYYY(date: string): string {
    let days = date.substring(0, 2);
    let month = date.substring(3, 5);
    let year = date.substring(6, 10);
    return `${month}-${days}-${year}`;
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

  public compareTimeToNow(time: any, granularity?: any): boolean {
    let currentTime = new Date(); // <-- Current time
    if(moment(time).isBefore(currentTime, granularity)) { // <-- Check scheduleTime < currentTime ?
      return true; // <-- before
    } 
    return false; // <-- after
  }

  private generateZeroNumber(number: number): string {
    let result = '';
    for (let i = 1; i <= number; i++) {
      result += '0';
    }
    return result;
  }

}
