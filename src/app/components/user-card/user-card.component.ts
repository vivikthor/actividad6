import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { DeleteBtnComponent } from "../delete-btn/delete-btn.component";
import { UpdateBtnComponent } from "../update-btn/update-btn.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink, DeleteBtnComponent, UpdateBtnComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  userService = inject(UserServiceService);

 
}
