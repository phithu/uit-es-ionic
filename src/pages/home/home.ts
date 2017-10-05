import { ExamSchedulePage } from './../exam-schedule/exam-schedule';
import { NavController } from 'ionic-angular';
import { FormBaseComponent } from './../../components/form-base/form-base';
import {
  Component,
  AfterViewInit,
  OnInit
} from '@angular/core';
import 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends FormBaseComponent implements OnInit, AfterViewInit {

  public listProducts: any;
  public frm: FormGroup;
  public formErrors = {
    search: ''
  }
  public validationMessages = {
    search: {
      required: 'Vui lòng nhập mã số sinh viên.',
      pattern: 'Mã số sinh viên không hợp lệ.'

    }
  }
  public controlConfig = {
    search: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d*\.?\d+$/)
    ])
  }
  constructor(private _navCtrl: NavController) {
    super();
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public ionViewDidLoad() {

  }
  public ngAfterViewInit() {
    let inputSearch = document.querySelector('.searchbar-input');
    // set attribute maxlength = 8
    inputSearch.setAttribute('maxlength', '8');
  }

  public onInput(idStudent: string) {
    if(idStudent.length === 8 && this.frm.valid) {
      this._navCtrl.push(ExamSchedulePage, {
        idStudent: idStudent
      }, {duration: 250})
    }
  }
}
