import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  tipo :string ="Nuevo";

  constructor() {
    this.userForm = new FormGroup({}, []);
  }


  getFormData(){
    
  }
}
