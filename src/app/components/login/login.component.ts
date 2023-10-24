import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SessionService } from 'src/app/services/session.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MenuComponent } from 'src/app/menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //@ViewChild(MenuComponent) menu: MenuComponent;
  //@ContentChild(MenuComponent) menu: MenuComponent;


  fg!: FormGroup;

  constructor(
    private readonly authService: AuthServiceService,
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    public menu: MenuComponent

  ) //public menu: MenuComponent
  {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.fg.invalid) {
      return;
    }
    this.authService.login(this.fg.value).subscribe({
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

  onRegister(): void {
    this.dialogRef.close();
    this.menu.openRegister();
  }
}
