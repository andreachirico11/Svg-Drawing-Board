import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  AngularMaterialModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MyCommsModule {}
