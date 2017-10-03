import { ProductService } from './../../providers/products-service/products.service';
import { ListItemPage } from './../list-item';
import {
  Component,
  ViewChild
} from '@angular/core';
import {
  NavController,
  List
} from 'ionic-angular';
import 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listProducts: any;
  public frm: FormGroup;
  public formError = {
    search: ''
  }
  public validatorErrorMsg = {
    search: {
      minlength: 'Mã số sinh viên không hợp lệ.',
      required: 'Vui lòng nhập mã số sinh viên.',
      pattern: 'Mã số sinh viên không hợp lệ.'

    }
  }
  public formConfig = {
    search: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^\d*\.?\d+$/)
    ])
  }
  @ViewChild(List) public list: List;

  // private frm: FormGroup;

  constructor() {
    // this.frm = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   description: [''],
    // });
    // this.frm = this.formBuilder.group(this.formConfig);
    this.frm = new FormGroup(this.formConfig);
    
  }
  logForm() {
    // console.log(this.todo.value)
  }

  public ionViewDidLoad() {
    this.frm.valueChanges.subscribe(() => this.onValueChanged());
    this.onValueChanged();

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
        // clear previous error message (if any)
        self.formError[field] = '';
        const control = form.get(field);
        if (submited) {
          control.markAsDirty();
        }

        // self.hasError = false;

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
