import {
  Component,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  List
} from 'ionic-angular';
import 'rxjs';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit  {

  public listProducts: any;
  public frm: FormGroup;
  public formError = {
    search: ''
  }
  public validatorErrorMsg = {
    search: {
      required: 'Vui lòng nhập mã số sinh viên.',
      pattern: 'Mã số sinh viên không hợp lệ.'

    }
  }
  public formConfig = {
    search: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d*\.?\d+$/)
    ])
  }
  @ViewChild(List) public list: List;

  constructor() {
    this.frm = new FormGroup(this.formConfig);
  }
  logForm() {

  }

  public ionViewDidLoad() {
    this.frm.valueChanges.subscribe(() => this.onValueChanged());
    this.onValueChanged();

  }
  public ngAfterViewInit() {
    let inputSearch = document.querySelector('.searchbar-input');
    // set attribute maxlength = 8
    inputSearch.setAttribute('maxlength', '8');
  }

  public onTap(item: any) {
    console.log(item);
  }

  public onClick() {


  }
  public onInput(e: any) {
    console.log("On input");
  }

  private onValueChanged(submited?: boolean) {

    let self = this;

    if (!self.frm) {
      return;
    }

    const form = self.frm;
    for (const field in self.formError) {
      if (self.formError.hasOwnProperty(field)) {
        self.formError[field] = '';
        const control = form.get(field);
        if (submited) {
          control.markAsDirty();
        }
        if (control && control.dirty && !control.valid) {
          const messages = self.validatorErrorMsg[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              self.formError[field] += messages[key] + ' ';
              break;
            }
          }
        }
      }
    }
  }

}
