import { ExamSchedulePage } from './../exam-schedule/exam-schedule';
import { NavController, ToastController } from 'ionic-angular';
import { FormBaseComponent } from './../../components/form-base/form-base';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoreService } from '../../module/core-module';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends FormBaseComponent implements OnInit {

  public listLogs: any[];
  public path: any;
  public frm: FormGroup;
  public formErrors = {
    search: ''
  }
  public validationMessages = {
    search: {
      required: 'Vui lòng nhập mã số sinh viên.',
      pattern: 'Mã số sinh viên không hợp lệ.',
      maxlength: 'Mã số sinh viên không hợp lệ.',
      minlength: 'Mã số sinh viên không hợp lệ.'
    }
  }
  public controlConfig = {
    search: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d*\.?\d+$/),
      Validators.maxLength(8),
      Validators.minLength(8)
    ])
  }
  constructor(
    private _coreService: CoreService,
    private _toastCtrl: ToastController,
    private _navCtrl: NavController) {
    super();
  }
  public ngOnInit() {
    super.ngOnInit();
    this.searchStudent();
    this.getLogs();

  }
  public openExamSchedulePage(idStudent: string) {
    if (this.frm.valid && idStudent.length === 8) {
      this._navCtrl.push(ExamSchedulePage, {
        idStudent: idStudent
      }, { duration: 250 })
    } else {
      this.frm.markAsDirty();
    }
  }
  private searchStudent() {
    this.frm.get('search').valueChanges
      .debounceTime(250)
      .distinctUntilChanged()
      .subscribe((idStudent: string) => {
        if (idStudent.length === 8 && this.frm.valid) {
          this.openExamSchedulePage(idStudent);
        }
      });
  }
  private getLogs() {
    this._coreService.getLogs()
      .subscribe((response) => {
        if (response.result) {
          this.listLogs = response.data;
        }
      }, (err) => {
        let msg = 'Rất tiếc! Hiện tại không thể lấy dữ liệu. Vui lòng kiểm tra lại kết nối Internet và thử lại.';
        this.showToast(msg);
      });
  }
  private showToast(message: string) {
    this._toastCtrl
      .create({
        message: message,
        duration: 20000,
        showCloseButton: true
      })
      .present()
  }

}
