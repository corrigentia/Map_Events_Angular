import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup; //= new FormGroup({});

  constructor(
    private readonly authService: AuthServiceService,
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
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
    if (this.registrationForm.invalid) {
      return;
    }
    this.authService.register(this.registrationForm.value).subscribe({
      next: (data) => {
        this.sessionService.start(data);
        this.router.navigate(['']);
      },
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
