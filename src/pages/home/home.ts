import { ExamSchedulePage } from './../exam-schedule/exam-schedule';
import { NavController} from 'ionic-angular';
import { FormBaseComponent } from './../../components/form-base/form-base';
import {
  Component,
  OnInit,
} from '@angular/core';
import 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends FormBaseComponent implements OnInit {

  public frm: FormGroup;
  submited: boolean = false;
  public formErrors = {
    search: ''
  }
  public validationMessages = {
    search: {
      required: 'Student ID is required.',
      pattern: 'Student ID is invalid.'

    }
  }
  public controlConfig = {
    search: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d*\.?\d+$/)
    ])
  }
  constructor(
    private _navCtrl: NavController) {
    super();
  }


  public ngOnInit() {
    super.ngOnInit();
    // this.frm.get('search').valueChanges.subscribe((idStudent: string) => {
    //   if(idStudent.length === 8) {
    //     this.openNewPage(idStudent);
    //   }
    // })
   
  }
  public openNewPage(value: any) {
    this._navCtrl.push(ExamSchedulePage, {
      idStudent: value.search
    }, { duration: 250 })
  }
  formSubmit(value: any) {
    this.openNewPage('hahah')
    // this.submited = true
  }
}
