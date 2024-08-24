import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserFormComponent } from "../../components/user-form/user-form.component";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [NavbarComponent, UserFormComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

}
