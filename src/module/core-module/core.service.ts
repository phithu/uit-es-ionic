import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
const linkAPI = 'https://uit-es.herokuapp.com';

@Injectable()
export class CoreService {

  constructor(private http: Http) { }
  public getLogs(): Observable<any> {
    return this.http.get(`${linkAPI}/logs`)
      .map((response) => response.json())
      .catch(this.handlerError)
  }
  public getStudent(idStudent: string): Observable<any> {
    return this.http.post(`${linkAPI}/student`, { idStudent: idStudent })
      .map((response) => response.json())
      .catch(this.handlerError)
  }
  public getRoom(idClass: string, room: string): Observable<any> {
    return this.http.post(`${linkAPI}/class`, { idClass: idClass, room: room })
      .map((response) => response.json())
      .catch(this.handlerError);
  }
  private handlerError(error) {
    return Observable.throw(error);
  }

}
