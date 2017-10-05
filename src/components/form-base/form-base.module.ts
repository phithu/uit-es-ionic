import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from './form-base';
@NgModule({
    declarations: [
        FormBaseComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule
    ]
})
export class FormBaseModule { }
