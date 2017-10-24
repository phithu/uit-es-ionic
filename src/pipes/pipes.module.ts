import { NgModule } from '@angular/core';
import { FormattimePipe } from './formattime/formattime';
@NgModule({
	declarations: [
		FormattimePipe
	],
	exports: [
		FormattimePipe
	]
})
export class PipesModule {}
