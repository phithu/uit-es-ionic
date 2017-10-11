import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
const linkAPI = 'https://exam-schedule-api.herokuapp.com';
/*
  Generated class for the MainServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExamSheduleService {

  constructor(private http: Http) {}
  public getLogs(): Observable<any> {
    return this.http.get(`${linkAPI}/logs`)
    .map((response) => response.json())
    .catch(this.handlerError)
  }
  public getStudent(idStudent: string): Observable<any> {
    return this.http.post(`${linkAPI}/student`, {idStudent: idStudent})
    .map((response) => response.json())
    .catch(this.handlerError)
  }
  private handlerError(error) {
    return Observable.throw(error);
  }

}
