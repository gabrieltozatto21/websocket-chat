import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [StartComponent],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [StartComponent],
})
export class StartModule { }
