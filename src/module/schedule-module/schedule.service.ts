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

  private generateZeroNumber(number: number): string {
    let result = '';
    for (let i = 1; i <= number; i++) {
      result += '0';
    }
    return result;
  }


}
