import { ExamSchedulePage } from './../exam-schedule/exam-schedule';
import {
  NavController,
  ToastController
} from 'ionic-angular';
import { FormBaseComponent } from './../../components/form-base/form-base';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CoreService } from '../../module/core-module';
import { ScheduleService } from '../../module/schedule-module';



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
    private _scheduleService: ScheduleService,
    private _navCtrl: NavController) {
    super();
  }

  public ngOnInit() {
    super.ngOnInit();
    this.searchStudent();
  }

  // Will enter page
  public ionViewWillEnter() {
    this.getLogs();

  }

  public openExamSchedulePage(idStudent: string) {

    if (this.frm.valid && idStudent.length === 8) { // <-- If idStudent is valid then open Exam Schedule Page
      this._scheduleService.addSchedule(null); // <-- Reset stream
      this._navCtrl.push(ExamSchedulePage, {
        idStudent: idStudent
      }, { duration: 250 }) // <-- time duration: 250ms
    } else { // <-- dirty form
      this.frm.markAsDirty();
    }
  }

  private searchStudent() {
    this.frm.get('search').valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((idStudent: string) => {
        if (idStudent.length === 8 && this.frm.valid) {
          this.openExamSchedulePage(idStudent); // <-- Open Exam schedule Page and send idStudent params
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
        // Show error
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
      // Show toast
      .present()
  }

}
