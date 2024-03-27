import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StartComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [StartComponent],
})
export class StartModule { }
