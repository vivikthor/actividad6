import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UserServiceService } from '../../services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserServiceService);
  router = inject(Router);

  userInProgress!: string;
  tipo: string = 'Nuevo';
  submitBtn: string = 'Enviar';
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

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = 'Actualizar';
        this.submitBtn = 'Actualizar';

        this.userInProgress = params.id;
        const user: IUser = await this.userService.getById(params.id);
        this.userForm = new FormGroup(
          {
            first_name: new FormControl(user.first_name, [Validators.required]),
            last_name: new FormControl(user.last_name, [Validators.required]),
            email: new FormControl(user.email, [
              Validators.required,
              Validators.pattern(this.ExpEmail),
            ]),
            password: new FormControl(user.password, [
              Validators.required,
              Validators.minLength(5),
            ]),
            rep_password: new FormControl(user.password, [Validators.required]),
            username: new FormControl(user.username, [
              Validators.required,
              Validators.minLength(3),
            ]),
            image: new FormControl(user.image, [Validators.required]),
          },
          [this.checkPassword]
        );
      }
    });
  }

  async getFormData() {
    const user = await this.userService.getById(this.userInProgress);
    if (user._id) {
      console.log('existe');
      try {
        const res = await this.userService.update(
          user._id,
          this.userForm.value
        );
        if (res._id) {
          this.formSuccess();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('nuevo');
      const res = await this.userService.insert(this.userForm.value);
      if (res.id) {
        console.log(res);
        this.formSuccess();
      }
    }
  }

  formSuccess() {
    let timerInterval: any;
    Swal.fire({
      title: '¡Hecho!',
      html: 'Redirigiendo a Inicio...',
      timer: 3000,
      timerProgressBar: false,
      showCancelButton: false,
      confirmButtonText: 'Vale',
    }).then((result) => {
      console.log(this.userForm.value);
      if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
        this.router.navigate(['/home']);
      }
    });
  }
}
