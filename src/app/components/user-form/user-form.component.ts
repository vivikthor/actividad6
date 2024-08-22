import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
   userForm: FormGroup;
  tipo: string = 'Nuevo';
  ExpEmail = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,10}$/;

  constructor() {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl(null, [Validators.required]),
        last_name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.ExpEmail),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        rep_password: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        image: new FormControl(null, [Validators.required]),
      },
      [this.checkPassword]
    );
  }

  checkValidation(control: string, validator: string) {
    return (
      this.userForm.get(control)?.hasError(validator) &&
      this.userForm.get(control)?.touched
    );
  }

  checkPassword(formValue: AbstractControl): any {
    const pass: string = formValue.get('password')?.value;
    const rep_pass: string = formValue.get('rep_password')?.value;
    if (rep_pass !== pass && pass !== null && rep_pass !== null) {
      return { checkpassword: true };
    } else {
      return null;
    }
  }

  getFormData() {}
}
