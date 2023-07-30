import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit{
  gialogForm!: FormGroup;
  isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     if(this.data) {
       this.isNew = false;
     }
  }

  ngOnInit():void  {
    this.initDialogForm();
  }

  initDialogForm(): void {
    this.gialogForm = new FormGroup({
      // якщо є id тоді цей id буде присвоєний. ?? - якщо значення зліва є - то присваються це значення. інакше null
      id: new FormControl(this.data?.id ?? null),
      title: new FormControl( this.data?.title ?? ''),
      price: new FormControl(this.data?.price ?? ''),
      year: new FormControl(this.data?.year ?? ''),
      chip: new FormControl(this.data?.chip ?? ''),
      SSD: new FormControl(this.data?.SSD ?? ''),
      memory: new FormControl(this.data?.memory ?? ''),
      display: new FormControl(this.data?.display ?? ''),
    })
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit(): void {
      this.data = {
        id: this.gialogForm.value.id,
        title: this.gialogForm.value.title,
        price: this.gialogForm.value.price,
        year: this.gialogForm.value.year,
        image: "https://www.freepnglogos.com/uploads/macbook-png/macbook-cleanmymac-the-best-mac-cleanup-app-for-macos-get-32.png",
        configuration: {
          chip: this.gialogForm.value.chip,
          SSD: this.gialogForm.value.SSD,
          memory: this.gialogForm.value.memory,
          display: this.gialogForm.value.display,
        }
      }
      this.dialogRef.close(this.data)
    }
}
