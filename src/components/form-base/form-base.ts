import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Generated class for the FormBaseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-base',
  template: ''
})
export class FormBaseComponent implements OnInit {

  public frm: FormGroup;
  public formErrors: { [key: string]: string };
  public validationMessages: { [key: string]: { [key: string]: string } };
  public controlConfig: { [key: string]: FormControl };
  public ngOnInit() {
    this.createForm();
  }
  public createForm() {

    this.frm = new FormGroup(this.controlConfig);
    this.frm.valueChanges.subscribe(() => this.onValueChanged());
    this.onValueChanged();
  }
  public onValueChanged(submited?: boolean) {
    let self = this;

    if (!self.frm) {
      return;
    }

    const form = self.frm;
    for (const field in self.formErrors) {
      if (self.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        self.formErrors[field] = '';
        const control = form.get(field);
        if (submited) {
          control.markAsDirty();
        }

        if (control && control.dirty && !control.valid) {
          const messages = self.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              self.formErrors[field] += messages[key] + ' ';
              break;
            }
          }
        }
      }
    }
  }
}
