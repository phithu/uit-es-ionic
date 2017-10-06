import { NgModule } from '@angular/core';
import { MaxlengthDirective } from './max-length';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations:
	[
		MaxlengthDirective
	],
	imports: [
		CommonModule
	],
	exports: [
		MaxlengthDirective
	]
})
export class MaxlengthDirectiveModule { }
