/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ParentErrorStateMatcher, PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  accountDetailsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    this.accountDetailsForm = new FormGroup({});
    this.matchingPasswordsGroup = new FormGroup<any>({});
  }

  account_validation_messages = {
    email: [
      { type: 'required', message: 'Veuillez entrer un e-mail' },
      { type: 'pattern', message: 'Veuillez entrer un e-mail valide' },
    ],
    confirm_password: [
      { type: 'required', message: 'Veuillez confirmer votre mot de passe' },
      {
        type: 'areEqual',
        message: 'Veuillez confirmer avec un mot de passe identique',
      },
    ],
    password: [
      { type: 'required', message: 'Veuillez entrer un mot de passe' },
      {
        type: 'minlength',
        message: 'Le mot de passe doit être de 5 caractères minimum',
      },
      {
        type: 'pattern',
        message:
          'Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',
      },
    ],
    terms: [{ type: 'pattern', message: 'Vous devez accepter les conditions' }],
  };

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ])
      ),
      confirm_password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          //PasswordValidator.areEqual.bind(this),
        ])
      ),
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      matchingPasswords: this.matchingPasswordsGroup,
      terms: new FormControl(false, Validators.pattern('true')),
    });
  }

  onSubmitAccountDetails(value: any) {
    console.log(value);
  }

  onSubmitUserDetails(value: any) {
    console.log(value);
  }
}
*/
