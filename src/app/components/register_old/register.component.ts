import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordStrengthValidator() {
    return (control: { value: any }) => {
      const password = control.value;
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password);
      const hasMinimumLength = password.length >= 8;
      return hasSpecialChar && hasMinimumLength ? null : { passwordWeak: true };
    };
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        message: 'Are you sure you want to proceed?',
      } as DialogData,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        if (this.registrationForm.valid) {
          console.log(this.registrationForm.value);
        }
      } else if (result === false) {
      }
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Hi</h1>
    <div mat-dialog-content>
      <p>Do you want to Register?</p>
    </div>
    <div mat-dialog-actions>
      <button
        mat-raised-button
        color="primary"
        type="submit"
        (click)="onNoClick(true)"
      >
        YES
      </button>
      <button
        mat-raised-button
        color="Danger"
        type="submit"
        (click)="onNoClick(false)"
      >
        NO
      </button>
    </div>`,
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(res: any): void {
    this.dialogRef.close(res);
  }
}
export interface DialogData {
  message: string;
}
