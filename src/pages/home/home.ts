import { ExamSchedulePage } from './../exam-schedule/exam-schedule';
import { NavController} from 'ionic-angular';
import { FormBaseComponent } from './../../components/form-base/form-base';
import {
  Component,
  OnInit,
} from '@angular/core';
import 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends FormBaseComponent implements OnInit {

  public frm: FormGroup;
  public formErrors = {
    search: ''
  }
  public validationMessages = {
    search: {
      required: 'Vui lòng nhập mã số sinh viên.',
      pattern: 'Mã số sinh viên không hợp lệ.',
      maxlength: 'Mã số sinh viên không hợp lệ'

    }
  }
  public controlConfig = {
    search: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d*\.?\d+$/),
      Validators.maxLength(8)
    ])
  }
  constructor(
    private _navCtrl: NavController) {
    super();
  }


  public ngOnInit() {
    super.ngOnInit();
    this.frm.get('search').valueChanges
    .debounceTime(250)
    .subscribe((idStudent: string) => {
      if(idStudent.length === 8 && this.frm.valid) {
        this.openNewPage(idStudent);
      }
    })
   
  }
  public openNewPage(value: any) {
    this._navCtrl.push(ExamSchedulePage, {
      idStudent: value.search
    }, { duration: 250 })
  }
}
