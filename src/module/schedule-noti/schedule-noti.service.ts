import { Injectable } from '@angular/core';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { ScheduleNotiModel } from './shedule-noti.model';


@Injectable()
export class ScheduleNotiService {

    public streamSchedules = new BehaviorSubject<ScheduleNotiModel[]>([]);

    // public $streamSchedules = this.streamSchedules.asObservable();

    public get listSchedules(): ScheduleNotiModel[] {
        return this.streamSchedules.value;
    }
    public addSchedule(value: ScheduleNotiModel) {
        let listSchedulesCopied = this.listSchedules.slice();
        listSchedulesCopied.push(value);
        this.streamSchedules.next(listSchedulesCopied);
    }


}
