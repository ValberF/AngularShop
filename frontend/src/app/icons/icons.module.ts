import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Trash,
  Edit,
  FileMinus,
  TrendingUp,
  User,
  LogOut
} from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Trash,
  Edit,
  FileMinus,
  TrendingUp,
  User,
  LogOut
};

@NgModule({
  imports: [
    FeatherModule.pick(icons),
    CommonModule
  ],
  exports: [FeatherModule]
})
export class IconsModule { }
