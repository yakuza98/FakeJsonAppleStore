import { NgModule } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";

const angularMaterial = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule
]
@NgModule({
  imports: [
    angularMaterial
  ],
  exports: [
    angularMaterial
  ]
})
export class MaterialModule { }
